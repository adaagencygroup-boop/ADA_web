package com.ada.app.modules.user.controller;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.user.dto.ChangePasswordRequest;
import com.ada.app.modules.user.dto.LoginHistoryDTO;
import com.ada.app.modules.user.dto.SessionResponse;
import com.ada.app.modules.user.dto.UpdateProfileRequest;
import com.ada.app.modules.user.dto.UserProfileResponse;
import com.ada.app.modules.user.enums.LoginStatus;
import com.ada.app.modules.user.service.UserService;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/admin/account")
@RequiredArgsConstructor
public class AdminAccountController {
  private final UserService userService;
  @GetMapping("/profile")
  public ResponseEntity<APIResponse<UserProfileResponse>> getProfile() {
    return ResponseEntity.ok(APIResponse.ok("Profile Retrieved Successfully", userService.getProfile()));
  }
  @PutMapping("/profile")
  public ResponseEntity<APIResponse<UserProfileResponse>> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
    return ResponseEntity.ok(APIResponse.ok("Profile Updated Successfully", userService.updateProfile(request)));
  }
  @PatchMapping("/password")
  public ResponseEntity<APIResponse<Void>> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
    userService.changePassword(request);
    return ResponseEntity.ok(APIResponse.ok("Password Changed Successfully", null));
  }
  @GetMapping("/sessions")
  public ResponseEntity<APIResponse<List<SessionResponse>>> getSessions() {
    return ResponseEntity.ok(APIResponse.ok("Sessions Retrieved Successfully", userService.getSessions()));
  }
  @DeleteMapping("/sessions/other")
  public ResponseEntity<APIResponse<Void>> revokeOtherSessions() {
    userService.revokeOtherSessions();
    return ResponseEntity.ok(APIResponse.ok("Other Sessions Revoked Successfully", null));
  }
  @DeleteMapping("/sessions/{sessionId}")
  public ResponseEntity<APIResponse<Void>> revokeSession(@PathVariable UUID sessionId) {
    userService.revokeSession(sessionId);
    return ResponseEntity.ok(APIResponse.ok("Session Revoked Successfully", null));
  }
  @GetMapping("/loginHistories")
  public ResponseEntity<APIResponse<PageResponse<LoginHistoryDTO>>> getLoginHistories(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) LoginStatus status,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    return ResponseEntity.ok(APIResponse.ok("Login Histories Retrieved Successfully", userService.getLoginHistories(page, size, status, fromDate, toDate)));
  }
  @GetMapping("/loginHistories/exportExcel")
  public ResponseEntity<byte[]> exportLoginHistoriesExcel(
    @RequestParam(required = false) LoginStatus status,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    byte[] excelBytes = userService.exportLoginHistoriesExcel(status, fromDate, toDate);
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=loginHistories.xlsx")
      .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
      .body(excelBytes);
  }
}