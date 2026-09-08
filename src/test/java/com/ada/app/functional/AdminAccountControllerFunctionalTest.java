package com.ada.app.functional;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.user.controller.AdminAccountController;
import com.ada.app.modules.user.dto.ChangePasswordRequest;
import com.ada.app.modules.user.dto.LoginHistoryDTO;
import com.ada.app.modules.user.dto.SessionResponse;
import com.ada.app.modules.user.dto.UpdateProfileRequest;
import com.ada.app.modules.user.dto.UserProfileResponse;
import com.ada.app.modules.user.enums.DeviceType;
import com.ada.app.modules.user.enums.LoginStatus;
import com.ada.app.modules.user.enums.UserRole;
import com.ada.app.modules.user.service.UserService;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
public class AdminAccountControllerFunctionalTest {
  private UserService userService;
  private AdminAccountController adminAccountController;
  @BeforeEach
  public void setUp() {
    userService = Mockito.mock(UserService.class);
    adminAccountController = new AdminAccountController(userService);
  }
  @Test
  public void testGetProfileEndpoint() {
    UserProfileResponse profile = new UserProfileResponse(UUID.randomUUID(), "vak1412", "Alexander Nguyen", "contact@ada.com.vn", "+84 912 045 678", UserRole.admin, Instant.now(), Instant.now());
    Mockito.when(userService.getProfile()).thenReturn(profile);
    ResponseEntity<APIResponse<UserProfileResponse>> response = adminAccountController.getProfile();
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("vak1412", response.getBody().data().username());
  }
  @Test
  public void testUpdateProfileEndpoint() {
    UpdateProfileRequest request = new UpdateProfileRequest("Alexander Nguyen", "+84 912 045 678");
    UserProfileResponse profile = new UserProfileResponse(UUID.randomUUID(), "vak1412", "Alexander Nguyen", "contact@ada.com.vn", "+84 912 045 678", UserRole.admin, Instant.now(), Instant.now());
    Mockito.when(userService.updateProfile(request)).thenReturn(profile);
    ResponseEntity<APIResponse<UserProfileResponse>> response = adminAccountController.updateProfile(request);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("Alexander Nguyen", response.getBody().data().fullname());
  }
  @Test
  public void testChangePasswordEndpoint() {
    ChangePasswordRequest request = new ChangePasswordRequest("DeprecatedPassword18", "UpdatedPassword18", "UpdatedPassword18");
    Mockito.doNothing().when(userService).changePassword(request);
    ResponseEntity<APIResponse<Void>> response = adminAccountController.changePassword(request);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("Password Changed Successfully", response.getBody().message());
  }
  @Test
  public void testGetSessionsEndpoint() {
    SessionResponse session = new SessionResponse(UUID.randomUUID(), UUID.randomUUID(), "Firefox on Linux", DeviceType.desktop, "Linux", "Firefox", "127.0.0.1", true, Instant.now(), Instant.now());
    Mockito.when(userService.getSessions()).thenReturn(List.of(session));
    ResponseEntity<APIResponse<List<SessionResponse>>> response = adminAccountController.getSessions();
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals(1, response.getBody().data().size());
    Assertions.assertTrue(response.getBody().data().get(0).isCurrentSession());
  }
  @Test
  public void testRevokeSessionEndpoint() {
    UUID sessionId = UUID.randomUUID();
    Mockito.doNothing().when(userService).revokeSession(sessionId);
    ResponseEntity<APIResponse<Void>> response = adminAccountController.revokeSession(sessionId);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("Session Revoked Successfully", response.getBody().message());
  }
  @Test
  public void testRevokeOtherSessionsEndpoint() {
    Mockito.doNothing().when(userService).revokeOtherSessions();
    ResponseEntity<APIResponse<Void>> response = adminAccountController.revokeOtherSessions();
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("Other Sessions Revoked Successfully", response.getBody().message());
  }
  @Test
  public void testGetLoginHistoriesEndpoint() {
    LoginHistoryDTO history = new LoginHistoryDTO(UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID(), UUID.randomUUID(), "Firefox on Linux", "127.0.0.1", "Vietnam", "Hanoi", false, "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0", LoginStatus.success, null, Instant.now());
    PageResponse<LoginHistoryDTO> pageResponse = new PageResponse<>(List.of(history), new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(userService.getLoginHistories(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(pageResponse);
    ResponseEntity<APIResponse<PageResponse<LoginHistoryDTO>>> response = adminAccountController.getLoginHistories(1, 10, null, null, null);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals(1, response.getBody().data().items().size());
  }
  @Test
  public void testExportLoginHistoriesExcelEndpoint() {
    byte[] excelBytes = new byte[]{0x50, 0x4B, 0x03, 0x04};
    Mockito.when(userService.exportLoginHistoriesExcel(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(excelBytes);
    ResponseEntity<byte[]> response = adminAccountController.exportLoginHistoriesExcel(null, null, null);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertEquals(4, response.getBody().length);
    Assertions.assertTrue(response.getHeaders().getFirst(HttpHeaders.CONTENT_DISPOSITION).contains("loginHistories.xlsx"));
  }
}