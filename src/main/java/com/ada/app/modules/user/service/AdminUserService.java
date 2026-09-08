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
import com.ada.app.modules.news.repository.NewsRepository;
import com.ada.app.modules.recruitment.repository.RecruitmentRepository;
import com.ada.app.modules.user.dto.AdminResetUserPasswordRequest;
import com.ada.app.modules.user.dto.AdminUserResponse;
import com.ada.app.modules.user.dto.CreateUserRequest;
import com.ada.app.modules.user.dto.UpdateUserRequest;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.enums.UserRole;
import com.ada.app.modules.user.repository.UserRepository;
import com.ada.app.modules.user.repository.UserSpecs;
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
public class AdminUserService {
  private final UserRepository userRepository;
  private final UserSessionRepository userSessionRepository;
  private final NewsRepository newsRepository;
  private final RecruitmentRepository recruitmentRepository;
  private final PasswordEncoder passwordEncoder;
  private final StringRedisTemplate redisTemplate;
  private final ExcelExportService excelExportService;
  @Transactional(readOnly = true)
  public PageResponse<AdminUserResponse> getUsers(int page, int size, String search, Instant fromDate, Instant toDate) {
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("createdAt").descending());
    Page<User> result = userRepository.findAll(UserSpecs.filter(search, UserRole.staff, fromDate, toDate), pageable);
    List<AdminUserResponse> items = result.getContent().stream()
      .map(this::mapToResponse)
      .toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional(readOnly = true)
  public byte[] exportUsersExcel(String search, Instant fromDate, Instant toDate) {
    List<User> list = userRepository.findAll(UserSpecs.filter(search, UserRole.staff, fromDate, toDate), Sort.by("createdAt").descending());
    List<String> headers = List.of("ID", "Username", "Fullname", "Email", "Phone", "Role", "Email Verified At", "Created At", "Updated At");
    List<List<Object>> rows = new ArrayList<>();
    for (User u : list) {
      rows.add(List.of(
        u.getId().toString(),
        u.getUsername(),
        u.getFullname(),
        u.getEmail(),
        u.getPhone() != null ? u.getPhone() : "",
        u.getRole().name(),
        u.getEmailVerifiedAt() != null ? u.getEmailVerifiedAt().toString() : "",
        u.getCreatedAt() != null ? u.getCreatedAt().toString() : "",
        u.getUpdatedAt() != null ? u.getUpdatedAt().toString() : ""
      ));
    }
    return excelExportService.exportToExcel("Users", headers, rows);
  }
  @Transactional(readOnly = true)
  public AdminUserResponse getUserById(UUID id) {
    User user = userRepository.findById(id)
      .orElseThrow(() -> AppException.notFound("User Not Found"));
    if (user.getRole() != UserRole.staff) {
      throw AppException.notFound("User Not Found");
    }
    return mapToResponse(user);
  }
  @Transactional
  public AdminUserResponse createUser(CreateUserRequest request) {
    ValidationUtils.validateUsername(request.username());
    ValidationUtils.validateEmail(request.email());
    ValidationUtils.validatePassword(request.password());
    ValidationUtils.validatePhone(request.phone());
    String username = request.username().trim();
    String email = request.email().trim();
    if (userRepository.existsByUsername(username)) {
      throw AppException.conflict("Username Already Exists");
    }
    if (userRepository.existsByEmail(email)) {
      throw AppException.conflict("Email Already Exists");
    }
    User user = User.builder()
      .username(username)
      .fullname(request.fullname().trim())
      .email(email)
      .phone(request.phone().trim())
      .passwordHash(passwordEncoder.encode(request.password()))
      .role(UserRole.staff)
      .build();
    user = userRepository.save(user);
    return mapToResponse(user);
  }
  @Transactional
  public AdminUserResponse updateUser(UUID id, UpdateUserRequest request) {
    User user = userRepository.findById(id)
      .orElseThrow(() -> AppException.notFound("User Not Found"));
    if (user.getRole() != UserRole.staff) {
      throw AppException.badRequest("Cannot Modify Non-Staff User");
    }
    if (request.fullname() != null && !request.fullname().isBlank()) {
      user.setFullname(request.fullname().trim());
    }
    if (request.email() != null && !request.email().isBlank()) {
      String email = request.email().trim();
      ValidationUtils.validateEmail(email);
      if (userRepository.existsByEmailAndIdNot(email, id)) {
        throw AppException.conflict("Email Already Exists");
      }
      user.setEmail(email);
    }
    if (request.phone() != null && !request.phone().isBlank()) {
      String phone = request.phone().trim();
      ValidationUtils.validatePhone(phone);
      user.setPhone(phone);
    }
    user = userRepository.save(user);
    return mapToResponse(user);
  }
  @Transactional
  public void resetUserPassword(UUID id, AdminResetUserPasswordRequest request) {
    ValidationUtils.validatePassword(request.newPassword());
    if (!request.newPassword().equals(request.confirmPassword())) {
      throw AppException.badRequest("Passwords Do Not Match");
    }
    User user = userRepository.findById(id)
      .orElseThrow(() -> AppException.notFound("User Not Found"));
    if (user.getRole() != UserRole.staff) {
      throw AppException.badRequest("Cannot Reset Non-Staff Password");
    }
    user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
    userRepository.save(user);
    List<UserSession> activeSessions = userSessionRepository.findByUserIdAndStatus(id, SessionStatus.active);
    Instant now = Instant.now();
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
  public void deleteUser(UUID id) {
    UUID currentAdminId = SecurityUtils.getCurrentUserId();
    if (id.equals(currentAdminId)) {
      throw AppException.badRequest("Cannot Delete Own Account");
    }
    User targetUser = userRepository.findById(id)
      .orElseThrow(() -> AppException.notFound("User Not Found"));
    if (targetUser.getRole() != UserRole.staff) {
      throw AppException.badRequest("Cannot Delete Non-Staff User");
    }
    User currentAdmin = userRepository.findById(currentAdminId)
      .orElseThrow(() -> AppException.notFound("Current Admin Not Found"));
    newsRepository.reassignAuthor(targetUser, currentAdmin);
    recruitmentRepository.reassignRecruiter(targetUser, currentAdmin);
    List<UserSession> activeSessions = userSessionRepository.findByUserIdAndStatus(id, SessionStatus.active);
    for (UserSession s : activeSessions) {
      if (s.getAccessTokenJTI() != null) {
        redisTemplate.opsForValue().set("blacklist:" + s.getAccessTokenJTI(), "revoked", 900, TimeUnit.SECONDS);
      }
    }
    userRepository.delete(targetUser);
  }
  private AdminUserResponse mapToResponse(User user) {
    return new AdminUserResponse(
      user.getId(),
      user.getUsername(),
      user.getFullname(),
      user.getEmail(),
      user.getPhone(),
      user.getRole(),
      user.getEmailVerifiedAt(),
      user.getCreatedAt(),
      user.getUpdatedAt()
    );
  }
}