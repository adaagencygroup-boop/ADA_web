package com.ada.app.modules.auth.service;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.security.JWTService;
import com.ada.app.common.security.RedisRateLimiter;
import com.ada.app.common.security.SecurityUtils;
import com.ada.app.common.util.DeviceFingerprintUtils;
import com.ada.app.common.util.GeoIPUtils;
import com.ada.app.common.util.IPUtils;
import com.ada.app.common.util.ValidationUtils;
import com.ada.app.modules.auth.dto.AuthResult;
import com.ada.app.modules.auth.dto.ForgotPasswordRequest;
import com.ada.app.modules.auth.dto.LoginRequest;
import com.ada.app.modules.auth.dto.LoginResponse;
import com.ada.app.modules.auth.dto.RefreshTokenRequest;
import com.ada.app.modules.auth.dto.ResetPasswordRequest;
import com.ada.app.modules.auth.dto.TokenResponse;
import com.ada.app.modules.auth.dto.TokenResult;
import com.ada.app.modules.auth.dto.VerifyOTPRequest;
import com.ada.app.modules.auth.entity.UserOTP;
import com.ada.app.modules.auth.entity.UserSession;
import com.ada.app.modules.auth.enums.OTPPurpose;
import com.ada.app.modules.auth.enums.RevokedReason;
import com.ada.app.modules.auth.enums.SessionStatus;
import com.ada.app.modules.auth.repository.UserOTPRepository;
import com.ada.app.modules.auth.repository.UserSessionRepository;
import com.ada.app.modules.user.dto.UserProfileResponse;
import com.ada.app.modules.user.entity.LoginHistory;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.entity.UserDevice;
import com.ada.app.modules.user.enums.DeviceType;
import com.ada.app.modules.user.enums.LoginStatus;
import com.ada.app.modules.user.repository.LoginHistoryRepository;
import com.ada.app.modules.user.repository.UserDeviceRepository;
import com.ada.app.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.HexFormat;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final UserDeviceRepository userDeviceRepository;
  private final UserSessionRepository userSessionRepository;
  private final UserOTPRepository userOTPRepository;
  private final LoginHistoryRepository loginHistoryRepository;
  private final PasswordEncoder passwordEncoder;
  private final JWTService jwtService;
  private final RedisRateLimiter redisRateLimiter;
  private final StringRedisTemplate redisTemplate;
  private final JavaMailSender mailSender;
  @Transactional
  public AuthResult login(LoginRequest request, HttpServletRequest httpRequest) {
    String clientIP = IPUtils.getClientIP(httpRequest);
    boolean allowed = redisRateLimiter.tryAcquire("RateLimit:Login:" + clientIP, 10, 60000);
    if (!allowed) {
      throw AppException.tooManyRequests("Too Many Login Requests - Please Try Again Later");
    }
    User user = userRepository.findByUsername(request.identifier())
      .or(() -> userRepository.findByEmail(request.identifier()))
      .orElse(null);
    if (user == null || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      recordLoginHistory(user, null, null, clientIP, httpRequest, LoginStatus.failed, "Invalid Username Or Password");
      throw AppException.unauthorized("Invalid Username Or Password");
    }
    DeviceType parsedType = DeviceFingerprintUtils.getDeviceType(httpRequest);
    if (request.deviceType() != null && !request.deviceType().isBlank()) {
      try {
        parsedType = DeviceType.valueOf(request.deviceType().trim().toLowerCase());
      } catch (IllegalArgumentException e) {
        throw AppException.badRequest("Invalid Device Type: " + request.deviceType() + " (Must Be Mobile, Desktop Or Tablet)");
      }
    }
    final DeviceType finalDeviceType = parsedType;
    Instant now = Instant.now();
    UserDevice device = userDeviceRepository.findByUserIdAndDeviceFingerprint(user.getId(), request.deviceFingerprint())
      .orElseGet(() -> UserDevice.builder()
        .user(user)
        .deviceFingerprint(request.deviceFingerprint())
        .deviceName(request.deviceName() != null && !request.deviceName().isBlank() ? request.deviceName().trim() : DeviceFingerprintUtils.getBrowser(httpRequest))
        .deviceType(finalDeviceType)
        .OS(DeviceFingerprintUtils.getOS(httpRequest))
        .browser(DeviceFingerprintUtils.getBrowser(httpRequest))
        .firstSeenAt(now)
        .lastSeenAt(now)
        .build()
      );
    device.setLastSeenAt(now);
    device = userDeviceRepository.save(device);
    List<UserSession> activeSessions = userSessionRepository.findByUserIdAndStatusOrderByIssuedAtAsc(user.getId(), SessionStatus.active);
    if (activeSessions.size() >= 5) {
      UserSession oldest = activeSessions.get(0);
      oldest.setStatus(SessionStatus.expired);
      oldest.setRevokedAt(now);
      oldest.setRevokedReason(RevokedReason.expired);
      userSessionRepository.save(oldest);
      if (oldest.getAccessTokenJTI() != null) {
        redisTemplate.opsForValue().set("blacklist:" + oldest.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
      }
    }
    String accessJTI = UUID.randomUUID().toString();
    String refreshJTI = UUID.randomUUID().toString();
    String tokenFamilyId = UUID.randomUUID().toString();
    String accessToken = jwtService.generateAccessToken(user.getId(), user.getRole().name(), accessJTI);
    String refreshToken = jwtService.generateRefreshToken(user.getId(), refreshJTI);
    UserSession session = UserSession.builder()
      .user(user)
      .device(device)
      .refreshTokenHash(hashToken(refreshToken))
      .accessTokenJTI(accessJTI)
      .tokenFamilyId(tokenFamilyId)
      .issuedIPAddress(clientIP)
      .IPAddress(clientIP)
      .userAgent(httpRequest.getHeader("User-Agent"))
      .status(SessionStatus.active)
      .issuedAt(now)
      .lastSeenAt(now)
      .expiresAt(now.plusSeconds(604800))
      .build();
    session = userSessionRepository.save(session);
    recordLoginHistory(user, session, device, clientIP, httpRequest, LoginStatus.success, null);
    UserProfileResponse userProfile = new UserProfileResponse(
      user.getId(),
      user.getUsername(),
      user.getFullname(),
      user.getEmail(),
      user.getPhone(),
      user.getRole(),
      user.getEmailVerifiedAt(),
      user.getCreatedAt()
    );
    return new AuthResult(accessToken, refreshToken, "Bearer", userProfile);
  }
  @Transactional
  public void forgotPassword(ForgotPasswordRequest request) {
    ValidationUtils.validateEmail(request.email());
    boolean allowed = redisRateLimiter.tryAcquire("RateLimit:OTP:" + request.email(), 3, 300000);
    if (!allowed) {
      throw AppException.tooManyRequests("Too Many OTP Requests - Please Try Again Later");
    }
    User user = userRepository.findByEmail(request.email())
      .orElseThrow(() -> AppException.notFound("User With Given Email Not Found"));
    String otp = String.format("%06d", new SecureRandom().nextInt(1000000));
    UserOTP userOTP = UserOTP.builder()
      .user(user)
      .codeHash(passwordEncoder.encode(otp))
      .purpose(OTPPurpose.forgotPassword)
      .expiresAt(Instant.now().plusSeconds(300))
      .build();
    userOTPRepository.save(userOTP);
    try {
      SimpleMailMessage message = new SimpleMailMessage();
      message.setTo(user.getEmail());
      message.setSubject("Mã OTP Đặt Lại Mật Khẩu");
      message.setText("Mã OTP Đặt Lại Mật Khẩu Của Bạn Là: " + otp + " - Mã Này Có Hiệu Lực Trong Vòng 5 Phút!");
      mailSender.send(message);
    } catch (Exception e) {
      log.warn("Failed To Send Password Reset OTP Email To {}: {}", user.getEmail(), e.getMessage());
    }
  }
  @Transactional(readOnly = true)
  public void verifyOTP(VerifyOTPRequest request) {
    ValidationUtils.validateEmail(request.email());
    User user = userRepository.findByEmail(request.email())
      .orElseThrow(() -> AppException.notFound("User With Given Email Not Found"));
    UserOTP userOTP = userOTPRepository.findTopByUserIdAndPurposeAndUsedAtIsNullOrderByCreatedAtDesc(user.getId(), OTPPurpose.forgotPassword)
      .orElseThrow(() -> AppException.badRequest("Invalid Or Expired OTP Code"));
    if (userOTP.getExpiresAt().isBefore(Instant.now())) {
      throw AppException.badRequest("OTP Code Has Expired");
    }
    if (!passwordEncoder.matches(request.otp(), userOTP.getCodeHash())) {
      throw AppException.badRequest("Invalid OTP Code");
    }
  }
  @Transactional
  public void resetPassword(ResetPasswordRequest request) {
    ValidationUtils.validateEmail(request.email());
    ValidationUtils.validatePassword(request.newPassword());
    if (!request.newPassword().equals(request.confirmPassword())) {
      throw AppException.badRequest("Passwords Do Not Match");
    }
    User user = userRepository.findByEmail(request.email())
      .orElseThrow(() -> AppException.notFound("User With Given Email Not Found"));
    UserOTP userOTP = userOTPRepository.findTopByUserIdAndPurposeAndUsedAtIsNullOrderByCreatedAtDesc(user.getId(), OTPPurpose.forgotPassword)
      .orElseThrow(() -> AppException.badRequest("Invalid Or Expired OTP Code"));
    if (userOTP.getExpiresAt().isBefore(Instant.now())) {
      throw AppException.badRequest("OTP Code Has Expired");
    }
    if (!passwordEncoder.matches(request.otp(), userOTP.getCodeHash())) {
      throw AppException.badRequest("Invalid OTP Code");
    }
    userOTP.setUsedAt(Instant.now());
    userOTPRepository.save(userOTP);
    user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
    userRepository.save(user);
    Instant now = Instant.now();
    List<UserSession> activeSessions = userSessionRepository.findByUserIdAndStatus(user.getId(), SessionStatus.active);
    for (UserSession s : activeSessions) {
      s.setStatus(SessionStatus.revoked);
      s.setRevokedAt(now);
      s.setRevokedReason(RevokedReason.passwordChange);
      userSessionRepository.save(s);
      if (s.getAccessTokenJTI() != null) {
        redisTemplate.opsForValue().set("blacklist:" + s.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
      }
    }
  }
  @Transactional
  public TokenResult refreshToken(String refreshToken, HttpServletRequest httpRequest) {
    if (refreshToken == null || refreshToken.isBlank()) {
      throw AppException.unauthorized("Refresh Token Is Required");
    }
    String token = refreshToken.trim();
    String tokenHash = hashToken(token);
    UserSession session = userSessionRepository.findByRefreshTokenHash(tokenHash)
      .orElseThrow(() -> AppException.unauthorized("Invalid Or Expired Refresh Token"));
    Instant now = Instant.now();
    if (session.getStatus() != SessionStatus.active) {
      List<UserSession> familySessions = userSessionRepository.findByTokenFamilyIdAndStatus(session.getTokenFamilyId(), SessionStatus.active);
      for (UserSession fs : familySessions) {
        fs.setStatus(SessionStatus.revoked);
        fs.setRevokedAt(now);
        fs.setRevokedReason(RevokedReason.tokenReuseDetected);
        userSessionRepository.save(fs);
        if (fs.getAccessTokenJTI() != null) {
          redisTemplate.opsForValue().set("blacklist:" + fs.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
        }
      }
      throw AppException.unauthorized("Compromised Refresh Token Family Detected, All Sessions Revoked");
    }
    if (session.getExpiresAt().isBefore(now)) {
      session.setStatus(SessionStatus.expired);
      session.setRevokedAt(now);
      session.setRevokedReason(RevokedReason.expired);
      userSessionRepository.save(session);
      throw AppException.unauthorized("Refresh Token Has Expired");
    }
    User user = session.getUser();
    String newAccessJTI = UUID.randomUUID().toString();
    String newRefreshJTI = UUID.randomUUID().toString();
    String newAccessToken = jwtService.generateAccessToken(user.getId(), user.getRole().name(), newAccessJTI);
    String newRefreshToken = jwtService.generateRefreshToken(user.getId(), newRefreshJTI);
    session.setStatus(SessionStatus.revoked);
    session.setRevokedAt(now);
    session.setRevokedReason(RevokedReason.userLogout);
    userSessionRepository.save(session);
    if (session.getAccessTokenJTI() != null) {
      redisTemplate.opsForValue().set("blacklist:" + session.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
    }
    String clientIP = IPUtils.getClientIP(httpRequest);
    UserSession newSession = UserSession.builder()
      .user(user)
      .device(session.getDevice())
      .refreshTokenHash(hashToken(newRefreshToken))
      .accessTokenJTI(newAccessJTI)
      .tokenFamilyId(session.getTokenFamilyId())
      .issuedIPAddress(session.getIssuedIPAddress() != null ? session.getIssuedIPAddress() : clientIP)
      .IPAddress(clientIP)
      .userAgent(httpRequest.getHeader("User-Agent"))
      .status(SessionStatus.active)
      .issuedAt(now)
      .lastSeenAt(now)
      .expiresAt(now.plusSeconds(604800))
      .build();
    userSessionRepository.save(newSession);
    return TokenResult.of(newAccessToken, newRefreshToken);
  }
  @Transactional
  public void logout(HttpServletRequest request, String refreshTokenCookie) {
    String currentJTI = SecurityUtils.getCurrentJTI();
    if (currentJTI == null && request != null) {
      String authHeader = request.getHeader("Authorization");
      if (authHeader != null && authHeader.startsWith("Bearer ")) {
        var claims = jwtService.parseAndValidateToken(authHeader.substring(7));
        if (claims != null) {
          currentJTI = claims.getJWTID();
        }
      }
    }
    UUID userId = SecurityUtils.getCurrentUserIdOrNull();
    Instant now = Instant.now();
    if (currentJTI != null) {
      redisTemplate.opsForValue().set("blacklist:" + currentJTI, "revoked", 900, TimeUnit.SECONDS);
      userSessionRepository.findByAccessTokenJTI(currentJTI).ifPresent(s -> {
        s.setStatus(SessionStatus.revoked);
        s.setRevokedAt(now);
        s.setRevokedReason(RevokedReason.userLogout);
        userSessionRepository.save(s);
      });
    }
    if (refreshTokenCookie != null && !refreshTokenCookie.isBlank()) {
      String tokenHash = hashToken(refreshTokenCookie);
      userSessionRepository.findByRefreshTokenHash(tokenHash).ifPresent(s -> {
        s.setStatus(SessionStatus.revoked);
        s.setRevokedAt(now);
        s.setRevokedReason(RevokedReason.userLogout);
        userSessionRepository.save(s);
        if (s.getAccessTokenJTI() != null) {
          redisTemplate.opsForValue().set("blacklist:" + s.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
        }
      });
    }
    if (userId != null && currentJTI == null && (refreshTokenCookie == null || refreshTokenCookie.isBlank())) {
      userSessionRepository.findByUserIdAndStatus(userId, SessionStatus.active).forEach(s -> {
        s.setStatus(SessionStatus.revoked);
        s.setRevokedAt(now);
        s.setRevokedReason(RevokedReason.userLogout);
        userSessionRepository.save(s);
        if (s.getAccessTokenJTI() != null) {
          redisTemplate.opsForValue().set("blacklist:" + s.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
        }
      });
    }
  }
  private void recordLoginHistory(User user, UserSession session, UserDevice device, String ip, HttpServletRequest request, LoginStatus status, String reason) {
    if (user != null) {
      boolean isNewIP = status == LoginStatus.success && !loginHistoryRepository.existsByUserIdAndIPAddressAndStatus(user.getId(), ip, LoginStatus.success);
      String country = GeoIPUtils.getCountry(request, ip);
      String city = GeoIPUtils.getCity(request, ip);
      String userAgent = request != null ? request.getHeader("User-Agent") : null;
      LoginHistory history = LoginHistory.builder()
        .user(user)
        .session(session)
        .device(device)
        .IPAddress(ip)
        .geoCountry(country)
        .geoCity(city)
        .isNewIP(isNewIP)
        .userAgent(userAgent)
        .status(status)
        .failureReason(reason)
        .build();
      loginHistoryRepository.save(history);
    }
  }
  private String hashToken(String token) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(token.getBytes());
      return HexFormat.of().formatHex(hash);
    } catch (NoSuchAlgorithmException e) {
      throw AppException.internal("SHA-256 Cryptographic Algorithm Unavailable: " + e.getMessage());
    }
  }
}