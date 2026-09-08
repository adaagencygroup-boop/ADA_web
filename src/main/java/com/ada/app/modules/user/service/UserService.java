package com.ada.app.modules.user.service;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.security.SecurityUtils;
import com.ada.app.common.util.ExcelExportService;
import com.ada.app.common.util.ValidationUtils;
import com.ada.app.modules.auth.entity.UserSession;
import com.ada.app.modules.auth.enums.RevokedReason;
import com.ada.app.modules.auth.enums.SessionStatus;
import com.ada.app.modules.auth.repository.UserSessionRepository;
import com.ada.app.modules.user.dto.ChangePasswordRequest;
import com.ada.app.modules.user.dto.LoginHistoryDTO;
import com.ada.app.modules.user.dto.SessionResponse;
import com.ada.app.modules.user.dto.UpdateProfileRequest;
import com.ada.app.modules.user.dto.UserProfileResponse;
import com.ada.app.modules.user.entity.LoginHistory;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.entity.UserDevice;
import com.ada.app.modules.user.enums.LoginStatus;
import com.ada.app.modules.user.repository.LoginHistoryRepository;
import com.ada.app.modules.user.repository.LoginHistorySpecs;
import com.ada.app.modules.user.repository.UserRepository;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final UserSessionRepository userSessionRepository;
  private final LoginHistoryRepository loginHistoryRepository;
  private final PasswordEncoder passwordEncoder;
  private final StringRedisTemplate redisTemplate;
  private final ExcelExportService excelExportService;
  @Transactional(readOnly = true)
  public UserProfileResponse getProfile() {
    UUID userId = SecurityUtils.getCurrentUserId();
    User user = userRepository.findById(userId)
      .orElseThrow(() -> AppException.notFound("User Not Found"));
    return new UserProfileResponse(
      user.getId(),
      user.getUsername(),
      user.getFullname(),
      user.getEmail(),
      user.getPhone(),
      user.getRole(),
      user.getEmailVerifiedAt(),
      user.getCreatedAt()
    );
  }
  @Transactional
  public UserProfileResponse updateProfile(UpdateProfileRequest request) {
    UUID userId = SecurityUtils.getCurrentUserId();
    User user = userRepository.findById(userId)
      .orElseThrow(() -> AppException.notFound("User Not Found"));
    if (request.fullname() != null && !request.fullname().isBlank()) {
      user.setFullname(request.fullname().trim());
    }
    if (request.phone() != null && !request.phone().isBlank()) {
      ValidationUtils.validatePhone(request.phone());
      user.setPhone(request.phone().trim());
    }
    user = userRepository.save(user);
    return new UserProfileResponse(
      user.getId(),
      user.getUsername(),
      user.getFullname(),
      user.getEmail(),
      user.getPhone(),
      user.getRole(),
      user.getEmailVerifiedAt(),
      user.getCreatedAt()
    );
  }
  @Transactional
  public void changePassword(ChangePasswordRequest request) {
    ValidationUtils.validatePassword(request.newPassword());
    if (!request.newPassword().equals(request.confirmPassword())) {
      throw AppException.badRequest("Passwords Do Not Match");
    }
    UUID userId = SecurityUtils.getCurrentUserId();
    User user = userRepository.findById(userId)
      .orElseThrow(() -> AppException.notFound("User Not Found"));
    if (!passwordEncoder.matches(request.currentPassword(), user.getPasswordHash())) {
      throw AppException.badRequest("Current Password Is Incorrect");
    }
    user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
    userRepository.save(user);
    String currentJTI = SecurityUtils.getCurrentJTI();
    Instant now = Instant.now();
    List<UserSession> activeSessions = userSessionRepository.findByUserIdAndStatus(userId, SessionStatus.active);
    for (UserSession session : activeSessions) {
      if (currentJTI == null || !currentJTI.equals(session.getAccessTokenJTI())) {
        session.setStatus(SessionStatus.revoked);
        session.setRevokedAt(now);
        session.setRevokedReason(RevokedReason.passwordChange);
        userSessionRepository.save(session);
        if (session.getAccessTokenJTI() != null) {
          redisTemplate.opsForValue().set("blacklist:" + session.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
        }
      }
    }
  }
  @Transactional(readOnly = true)
  public List<SessionResponse> getSessions() {
    UUID userId = SecurityUtils.getCurrentUserId();
    String currentJTI = SecurityUtils.getCurrentJTI();
    return userSessionRepository.findByUserIdAndStatus(userId, SessionStatus.active).stream()
      .map(session -> {
        UserDevice device = session.getDevice();
        boolean isCurrent = currentJTI != null && currentJTI.equals(session.getAccessTokenJTI());
        return new SessionResponse(
          session.getId(),
          device != null ? device.getId() : null,
          device != null ? device.getDeviceName() : null,
          device != null ? device.getDeviceType() : null,
          device != null ? device.getOS() : null,
          device != null ? device.getBrowser() : null,
          session.getIPAddress(),
          isCurrent,
          device != null ? device.getLastSeenAt() : null,
          session.getIssuedAt()
        );
      })
      .toList();
  }
  @Transactional
  public void revokeSession(UUID sessionId) {
    UUID userId = SecurityUtils.getCurrentUserId();
    UserSession session = userSessionRepository.findById(sessionId)
      .orElseThrow(() -> AppException.notFound("Session Not Found"));
    if (!session.getUser().getId().equals(userId)) {
      throw AppException.forbidden("Access Denied");
    }
    String currentJTI = SecurityUtils.getCurrentJTI();
    boolean isCurrent = currentJTI != null && currentJTI.equals(session.getAccessTokenJTI());
    session.setStatus(SessionStatus.revoked);
    session.setRevokedAt(Instant.now());
    session.setRevokedReason(isCurrent ? RevokedReason.userLogout : RevokedReason.userLogoutOthers);
    userSessionRepository.save(session);
    if (session.getAccessTokenJTI() != null) {
      redisTemplate.opsForValue().set("blacklist:" + session.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
    }
  }
  @Transactional
  public void revokeOtherSessions() {
    UUID userId = SecurityUtils.getCurrentUserId();
    String currentJTI = SecurityUtils.getCurrentJTI();
    Instant now = Instant.now();
    List<UserSession> activeSessions = userSessionRepository.findByUserIdAndStatus(userId, SessionStatus.active);
    for (UserSession session : activeSessions) {
      if (currentJTI == null || !currentJTI.equals(session.getAccessTokenJTI())) {
        session.setStatus(SessionStatus.revoked);
        session.setRevokedAt(now);
        session.setRevokedReason(RevokedReason.userLogoutOthers);
        userSessionRepository.save(session);
        if (session.getAccessTokenJTI() != null) {
          redisTemplate.opsForValue().set("blacklist:" + session.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
        }
      }
    }
  }
  @Transactional(readOnly = true)
  public PageResponse<LoginHistoryDTO> getLoginHistories(int page, int size, LoginStatus status, Instant fromDate, Instant toDate) {
    UUID userId = SecurityUtils.getCurrentUserId();
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("createdAt").descending());
    Page<LoginHistory> result = loginHistoryRepository.findAll(LoginHistorySpecs.filter(userId, status, fromDate, toDate), pageable);
    List<LoginHistoryDTO> items = result.getContent().stream()
      .map(h -> new LoginHistoryDTO(
        h.getId(),
        h.getUser().getId(),
        h.getSession() != null ? h.getSession().getId() : null,
        h.getDevice() != null ? h.getDevice().getId() : null,
        h.getDevice() != null ? h.getDevice().getDeviceName() : null,
        h.getIPAddress(),
        h.getGeoCountry(),
        h.getGeoCity(),
        h.getIsNewIP(),
        h.getUserAgent(),
        h.getStatus(),
        h.getFailureReason(),
        h.getCreatedAt()
      ))
      .toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional(readOnly = true)
  public byte[] exportLoginHistoriesExcel(LoginStatus status, Instant fromDate, Instant toDate) {
    UUID userId = SecurityUtils.getCurrentUserId();
    List<LoginHistory> list = loginHistoryRepository.findAll(LoginHistorySpecs.filter(userId, status, fromDate, toDate), Sort.by("createdAt").descending());
    List<String> headers = List.of("ID", "Device", "IP Address", "Country", "City", "Is New IP", "User Agent", "Status", "Failure Reason", "Created At");
    List<List<Object>> rows = new ArrayList<>();
    for (LoginHistory h : list) {
      rows.add(List.of(
        h.getId().toString(),
        h.getDevice() != null ? h.getDevice().getDeviceName() : "",
        h.getIPAddress() != null ? h.getIPAddress() : "",
        h.getGeoCountry() != null ? h.getGeoCountry() : "",
        h.getGeoCity() != null ? h.getGeoCity() : "",
        Boolean.TRUE.equals(h.getIsNewIP()) ? "Yes" : "No",
        h.getUserAgent() != null ? h.getUserAgent() : "",
        h.getStatus().name(),
        h.getFailureReason() != null ? h.getFailureReason() : "",
        h.getCreatedAt().toString()
      ));
    }
    return excelExportService.exportToExcel("Login Histories", headers, rows);
  }
}