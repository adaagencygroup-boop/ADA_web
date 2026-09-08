package com.ada.app.modules.user.controller;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.user.dto.AdminResetUserPasswordRequest;
import com.ada.app.modules.user.dto.AdminUserResponse;
import com.ada.app.modules.user.dto.CreateUserRequest;
import com.ada.app.modules.user.dto.UpdateUserRequest;
import com.ada.app.modules.user.service.AdminUserService;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/admin/users")
@PreAuthorize("hasAuthority('admin')")
@RequiredArgsConstructor
public class AdminUserController {
  private final AdminUserService adminUserService;
  @GetMapping
  public ResponseEntity<APIResponse<PageResponse<AdminUserResponse>>> getUsers(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    return ResponseEntity.ok(APIResponse.ok("Users Retrieved Successfully", adminUserService.getUsers(page, size, search, fromDate, toDate)));
  }
  @GetMapping("/exportExcel")
  public ResponseEntity<byte[]> exportUsersExcel(
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    byte[] excelBytes = adminUserService.exportUsersExcel(search, fromDate, toDate);
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users.xlsx")
      .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
      .body(excelBytes);
  }
  @GetMapping("/{id}")
  public ResponseEntity<APIResponse<AdminUserResponse>> getUserById(@PathVariable UUID id) {
    return ResponseEntity.ok(APIResponse.ok("User Detail Retrieved Successfully", adminUserService.getUserById(id)));
  }
  @PostMapping
  public ResponseEntity<APIResponse<AdminUserResponse>> createUser(@Valid @RequestBody CreateUserRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(APIResponse.created("User Created Successfully", adminUserService.createUser(request)));
  }
  @PutMapping("/{id}")
  public ResponseEntity<APIResponse<AdminUserResponse>> updateUser(@PathVariable UUID id, @Valid @RequestBody UpdateUserRequest request) {
    return ResponseEntity.ok(APIResponse.ok("User Updated Successfully", adminUserService.updateUser(id, request)));
  }
  @PatchMapping("/{id}/password")
  public ResponseEntity<APIResponse<Void>> resetUserPassword(@PathVariable UUID id, @Valid @RequestBody AdminResetUserPasswordRequest request) {
    adminUserService.resetUserPassword(id, request);
    return ResponseEntity.ok(APIResponse.ok("User Password Reset Successfully", null));
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<APIResponse<Void>> deleteUser(@PathVariable UUID id) {
    adminUserService.deleteUser(id);
    return ResponseEntity.ok(APIResponse.ok("User Deleted Successfully", null));
  }
}