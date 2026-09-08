package com.ada.app.functional;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.user.controller.AdminUserController;
import com.ada.app.modules.user.dto.AdminResetUserPasswordRequest;
import com.ada.app.modules.user.dto.AdminUserResponse;
import com.ada.app.modules.user.dto.CreateUserRequest;
import com.ada.app.modules.user.dto.UpdateUserRequest;
import com.ada.app.modules.user.enums.UserRole;
import com.ada.app.modules.user.service.AdminUserService;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
public class AdminUserControllerFunctionalTest {
  private AdminUserService adminUserService;
  private AdminUserController adminUserController;
  @BeforeEach
  public void setUp() {
    adminUserService = Mockito.mock(AdminUserService.class);
    adminUserController = new AdminUserController(adminUserService);
  }
  @Test
  public void testGetUsersEndpoint() {
    UUID userId = UUID.randomUUID();
    AdminUserResponse userResponse = new AdminUserResponse(userId, "staff", "Staff Member", "staff@ada.com.vn", "+84 900 120 456", UserRole.staff, null, Instant.now(), Instant.now());
    PageResponse<AdminUserResponse> page = new PageResponse<>(List.of(userResponse), new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(adminUserService.getUsers(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(page);
    ResponseEntity<APIResponse<PageResponse<AdminUserResponse>>> response = adminUserController.getUsers(1, 10, null, null, null);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals(1, response.getBody().data().items().size());
    Assertions.assertEquals("staff", response.getBody().data().items().get(0).username());
  }
  @Test
  public void testExportUsersExcelEndpoint() {
    byte[] excelBytes = new byte[]{0x50, 0x4B, 0x03, 0x04};
    Mockito.when(adminUserService.exportUsersExcel(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(excelBytes);
    ResponseEntity<byte[]> response = adminUserController.exportUsersExcel(null, null, null);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertTrue(response.getHeaders().getFirst(HttpHeaders.CONTENT_DISPOSITION).contains("users.xlsx"));
  }
  @Test
  public void testGetUserByIdEndpoint() {
    UUID userId = UUID.randomUUID();
    AdminUserResponse userResponse = new AdminUserResponse(userId, "staff", "Staff Member", "staff@ada.com.vn", "+84 900 120 456", UserRole.staff, null, Instant.now(), Instant.now());
    Mockito.when(adminUserService.getUserById(userId)).thenReturn(userResponse);
    ResponseEntity<APIResponse<AdminUserResponse>> response = adminUserController.getUserById(userId);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertEquals("staff", response.getBody().data().username());
  }
  @Test
  public void testCreateUserEndpoint() {
    CreateUserRequest request = new CreateUserRequest("staff", "Staff Member", "staff@ada.com.vn", "+84 900 120 456", "StrongPassword18");
    AdminUserResponse userResponse = new AdminUserResponse(UUID.randomUUID(), "staff", "Staff Member", "staff@ada.com.vn", "+84 900 120 456", UserRole.staff, null, Instant.now(), Instant.now());
    Mockito.when(adminUserService.createUser(request)).thenReturn(userResponse);
    ResponseEntity<APIResponse<AdminUserResponse>> response = adminUserController.createUser(request);
    Assertions.assertEquals(201, response.getStatusCode().value());
    Assertions.assertEquals("staff", response.getBody().data().username());
  }
  @Test
  public void testUpdateUserEndpoint() {
    UUID userId = UUID.randomUUID();
    UpdateUserRequest request = new UpdateUserRequest("Updated Staff", "updated@ada.com.vn", "+84 902 245 678");
    AdminUserResponse userResponse = new AdminUserResponse(userId, "staff", "Updated Staff", "updated@ada.com.vn", "+84 902 245 678", UserRole.staff, null, Instant.now(), Instant.now());
    Mockito.when(adminUserService.updateUser(userId, request)).thenReturn(userResponse);
    ResponseEntity<APIResponse<AdminUserResponse>> response = adminUserController.updateUser(userId, request);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertEquals("Updated Staff", response.getBody().data().fullname());
  }
  @Test
  public void testResetUserPasswordEndpoint() {
    UUID userId = UUID.randomUUID();
    AdminResetUserPasswordRequest request = new AdminResetUserPasswordRequest("NewStrongPassword18", "NewStrongPassword18");
    Mockito.doNothing().when(adminUserService).resetUserPassword(userId, request);
    ResponseEntity<APIResponse<Void>> response = adminUserController.resetUserPassword(userId, request);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertEquals("User Password Reset Successfully", response.getBody().message());
  }
  @Test
  public void testDeleteUserEndpoint() {
    UUID userId = UUID.randomUUID();
    Mockito.doNothing().when(adminUserService).deleteUser(userId);
    ResponseEntity<APIResponse<Void>> response = adminUserController.deleteUser(userId);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertEquals("User Deleted Successfully", response.getBody().message());
  }
}