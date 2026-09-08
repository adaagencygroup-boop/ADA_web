package com.ada.app.security;
import com.ada.app.common.security.JWTService;
import com.ada.app.common.security.RedisRateLimiter;
import com.ada.app.modules.auth.dto.LoginRequest;
import com.ada.app.modules.auth.entity.UserSession;
import com.ada.app.modules.auth.enums.RevokedReason;
import com.ada.app.modules.auth.enums.SessionStatus;
import com.ada.app.modules.auth.repository.UserOTPRepository;
import com.ada.app.modules.auth.repository.UserSessionRepository;
import com.ada.app.modules.auth.service.AuthService;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.entity.UserDevice;
import com.ada.app.modules.user.enums.DeviceType;
import com.ada.app.modules.user.enums.UserRole;
import com.ada.app.modules.user.repository.LoginHistoryRepository;
import com.ada.app.modules.user.repository.UserDeviceRepository;
import com.ada.app.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
public class SessionEvictionSecurityTest {
  private UserRepository userRepository;
  private UserDeviceRepository userDeviceRepository;
  private UserSessionRepository userSessionRepository;
  private PasswordEncoder passwordEncoder;
  private StringRedisTemplate redisTemplate;
  private ValueOperations<String, String> valueOperations;
  private AuthService authService;
  @BeforeEach
  @SuppressWarnings("unchecked")
  public void setUp() {
    userRepository = Mockito.mock(UserRepository.class);
    userDeviceRepository = Mockito.mock(UserDeviceRepository.class);
    userSessionRepository = Mockito.mock(UserSessionRepository.class);
    UserOTPRepository userOTPRepository = Mockito.mock(UserOTPRepository.class);
    LoginHistoryRepository loginHistoryRepository = Mockito.mock(LoginHistoryRepository.class);
    passwordEncoder = Mockito.mock(PasswordEncoder.class);
    JWTService jwtService = Mockito.mock(JWTService.class);
    RedisRateLimiter redisRateLimiter = Mockito.mock(RedisRateLimiter.class);
    redisTemplate = Mockito.mock(StringRedisTemplate.class);
    valueOperations = Mockito.mock(ValueOperations.class);
    JavaMailSender mailSender = Mockito.mock(JavaMailSender.class);
    Mockito.when(redisRateLimiter.tryAcquire(ArgumentMatchers.anyString(), ArgumentMatchers.anyInt(), ArgumentMatchers.anyLong())).thenReturn(true);
    Mockito.when(redisTemplate.opsForValue()).thenReturn(valueOperations);
    Mockito.when(jwtService.generateAccessToken(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn("accessTokenString");
    Mockito.when(jwtService.generateRefreshToken(ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn("refreshTokenString");
    authService = new AuthService(
      userRepository,
      userDeviceRepository,
      userSessionRepository,
      userOTPRepository,
      loginHistoryRepository,
      passwordEncoder,
      jwtService,
      redisRateLimiter,
      redisTemplate,
      mailSender
    );
  }
  @Test
  public void testFifoSessionEvictionWhenExceedingMaxActiveSessions() {
    UUID userId = UUID.randomUUID();
    User user = User.builder().username("vak1412").email("contact@ada.com.vn").passwordHash("encodedPascalCase18").role(UserRole.staff).build();
    user.setId(userId);
    Mockito.when(userRepository.findByUsername("vak1412")).thenReturn(Optional.of(user));
    Mockito.when(passwordEncoder.matches("PascalCase18", "encodedPascalCase18")).thenReturn(true);
    UserDevice device = UserDevice.builder().id(UUID.randomUUID()).user(user).deviceFingerprint("c8f1e6b7d2a34901").deviceType(DeviceType.desktop).build();
    Mockito.when(userDeviceRepository.findByUserIdAndDeviceFingerprint(ArgumentMatchers.eq(userId), ArgumentMatchers.anyString())).thenReturn(Optional.of(device));
    Mockito.when(userDeviceRepository.save(ArgumentMatchers.any(UserDevice.class))).thenReturn(device);
    List<UserSession> activeSessions = new ArrayList<>();
    String oldestJTI = UUID.randomUUID().toString();
    for (int i = 0; i < 5; i++) {
      UserSession s = UserSession.builder()
        .id(UUID.randomUUID())
        .user(user)
        .accessTokenJTI(i == 0 ? oldestJTI : UUID.randomUUID().toString())
        .status(SessionStatus.active)
        .issuedAt(Instant.now().minusSeconds(1000 - i * 100))
        .expiresAt(Instant.now().plusSeconds(604800))
        .build();
      activeSessions.add(s);
    }
    Mockito.when(userSessionRepository.findByUserIdAndStatusOrderByIssuedAtAsc(userId, SessionStatus.active)).thenReturn(activeSessions);
    Mockito.when(userSessionRepository.save(ArgumentMatchers.any(UserSession.class))).thenAnswer(invocation -> invocation.getArgument(0));
    HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
    Mockito.when(request.getHeader(ArgumentMatchers.anyString())).thenReturn("127.0.0.1");
    LoginRequest loginRequest = new LoginRequest("vak1412", "PascalCase18", "a1b2c3d4e5f67890", "MacBook Pro", "desktop", false);
    authService.login(loginRequest, request);
    UserSession oldestSession = activeSessions.get(0);
    Assertions.assertEquals(SessionStatus.expired, oldestSession.getStatus());
    Assertions.assertEquals(RevokedReason.expired, oldestSession.getRevokedReason());
    Assertions.assertNotNull(oldestSession.getRevokedAt());
    Mockito.verify(userSessionRepository, Mockito.atLeastOnce()).save(oldestSession);
    Mockito.verify(valueOperations).set(ArgumentMatchers.eq("blacklist:" + oldestJTI), ArgumentMatchers.eq("revoked"), ArgumentMatchers.eq(900L), ArgumentMatchers.any());
  }
}