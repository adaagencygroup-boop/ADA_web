package com.ada.app.security;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.security.JWTService;
import com.ada.app.common.security.RedisRateLimiter;
import com.ada.app.modules.auth.dto.RefreshTokenRequest;
import com.ada.app.modules.auth.entity.UserSession;
import com.ada.app.modules.auth.enums.RevokedReason;
import com.ada.app.modules.auth.enums.SessionStatus;
import com.ada.app.modules.auth.repository.UserOTPRepository;
import com.ada.app.modules.auth.repository.UserSessionRepository;
import com.ada.app.modules.auth.service.AuthService;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.enums.UserRole;
import com.ada.app.modules.user.repository.LoginHistoryRepository;
import com.ada.app.modules.user.repository.UserDeviceRepository;
import com.ada.app.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.HexFormat;
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
public class TokenReuseSecurityTest {
  private UserSessionRepository userSessionRepository;
  private StringRedisTemplate redisTemplate;
  private ValueOperations<String, String> valueOperations;
  private AuthService authService;
  @BeforeEach
  @SuppressWarnings("unchecked")
  public void setUp() {
    UserRepository userRepository = Mockito.mock(UserRepository.class);
    UserDeviceRepository userDeviceRepository = Mockito.mock(UserDeviceRepository.class);
    userSessionRepository = Mockito.mock(UserSessionRepository.class);
    UserOTPRepository userOTPRepository = Mockito.mock(UserOTPRepository.class);
    LoginHistoryRepository loginHistoryRepository = Mockito.mock(LoginHistoryRepository.class);
    PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);
    JWTService jwtService = Mockito.mock(JWTService.class);
    RedisRateLimiter redisRateLimiter = Mockito.mock(RedisRateLimiter.class);
    redisTemplate = Mockito.mock(StringRedisTemplate.class);
    valueOperations = Mockito.mock(ValueOperations.class);
    JavaMailSender mailSender = Mockito.mock(JavaMailSender.class);
    Mockito.when(redisTemplate.opsForValue()).thenReturn(valueOperations);
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
  public void testTokenReuseDetectionRevokesEntireTokenFamily() throws Exception {
    String replayedRefreshToken = UUID.randomUUID().toString();
    MessageDigest digest = MessageDigest.getInstance("SHA-256");
    String tokenHash = HexFormat.of().formatHex(digest.digest(replayedRefreshToken.getBytes()));
    String tokenFamilyId = UUID.randomUUID().toString();
    String siblingAccessTokenJTI = UUID.randomUUID().toString();
    User user = User.builder().username("vak1412").email("contact@ada.com.vn").role(UserRole.staff).build();
    user.setId(UUID.randomUUID());
    UserSession compromisedSession = UserSession.builder()
      .id(UUID.randomUUID())
      .user(user)
      .tokenFamilyId(tokenFamilyId)
      .refreshTokenHash(tokenHash)
      .accessTokenJTI(UUID.randomUUID().toString())
      .status(SessionStatus.revoked)
      .revokedReason(RevokedReason.userLogout)
      .expiresAt(Instant.now().plusSeconds(3600))
      .build();
    UserSession siblingSession = UserSession.builder()
      .id(UUID.randomUUID())
      .user(user)
      .tokenFamilyId(tokenFamilyId)
      .refreshTokenHash(HexFormat.of().formatHex(digest.digest(UUID.randomUUID().toString().getBytes())))
      .accessTokenJTI(siblingAccessTokenJTI)
      .status(SessionStatus.active)
      .expiresAt(Instant.now().plusSeconds(3600))
      .build();
    Mockito.when(userSessionRepository.findByRefreshTokenHash(tokenHash)).thenReturn(Optional.of(compromisedSession));
    Mockito.when(userSessionRepository.findByTokenFamilyIdAndStatus(tokenFamilyId, SessionStatus.active)).thenReturn(List.of(siblingSession));
    HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
    Mockito.when(request.getHeader(ArgumentMatchers.anyString())).thenReturn("127.0.0.1");
    AppException exception = Assertions.assertThrows(AppException.class, () -> authService.refreshToken(replayedRefreshToken, request));
    Assertions.assertEquals(401, exception.getStatus().value());
    Assertions.assertEquals("Compromised Refresh Token Family Detected, All Sessions Revoked", exception.getMessage());
    Assertions.assertEquals(SessionStatus.revoked, siblingSession.getStatus());
    Assertions.assertEquals(RevokedReason.tokenReuseDetected, siblingSession.getRevokedReason());
    Mockito.verify(userSessionRepository).save(siblingSession);
    Mockito.verify(valueOperations).set(ArgumentMatchers.eq("blacklist:" + siblingAccessTokenJTI), ArgumentMatchers.eq("revoked"), ArgumentMatchers.eq(900L), ArgumentMatchers.any());
  }
}