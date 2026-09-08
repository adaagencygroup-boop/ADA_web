package com.ada.app.functional;
import com.ada.app.common.model.APIResponse;
import com.ada.app.modules.auth.controller.AuthController;
import com.ada.app.modules.auth.dto.AuthResult;
import com.ada.app.modules.auth.dto.ForgotPasswordRequest;
import com.ada.app.modules.auth.dto.LoginRequest;
import com.ada.app.modules.auth.dto.LoginResponse;
import com.ada.app.modules.auth.dto.RefreshTokenRequest;
import com.ada.app.modules.auth.dto.ResetPasswordRequest;
import com.ada.app.modules.auth.dto.TokenResponse;
import com.ada.app.modules.auth.dto.TokenResult;
import com.ada.app.modules.auth.dto.VerifyOTPRequest;
import com.ada.app.modules.auth.service.AuthService;
import com.ada.app.modules.user.dto.UserProfileResponse;
import com.ada.app.modules.user.enums.UserRole;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Instant;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
public class AuthControllerFunctionalTest {
  private AuthService authService;
  private AuthController authController;
  private HttpServletRequest httpRequest;
  private HttpServletResponse httpResponse;
  @BeforeEach
  public void setUp() {
    authService = Mockito.mock(AuthService.class);
    authController = new AuthController(authService);
    org.springframework.test.util.ReflectionTestUtils.setField(authController, "refreshExpirationSeconds", 604800L);
    httpRequest = Mockito.mock(HttpServletRequest.class);
    httpResponse = Mockito.mock(HttpServletResponse.class);
  }
  @Test
  public void testLoginEndpoint() {
    LoginRequest request = new LoginRequest("vak1412", "PascalCase18", "c8f1e6b7d2a34901", "Firefox on Linux", "desktop", true);
    UserProfileResponse profile = new UserProfileResponse(UUID.randomUUID(), "vak1412", "Alexander Nguyen", "contact@ada.com.vn", "+84 912 045 678", UserRole.admin, Instant.now(), Instant.now());
    AuthResult authResult = new AuthResult("accessTokenPayload", "refreshTokenPayload", "Bearer", profile);
    Mockito.when(authService.login(ArgumentMatchers.eq(request), ArgumentMatchers.any())).thenReturn(authResult);
    ResponseEntity<APIResponse<LoginResponse>> response = authController.login(request, httpRequest, httpResponse);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("Login Successful", response.getBody().message());
    Assertions.assertEquals("accessTokenPayload", response.getBody().data().accessToken());
    Mockito.verify(httpResponse).addHeader(ArgumentMatchers.eq(HttpHeaders.SET_COOKIE), ArgumentMatchers.contains("refreshToken=refreshTokenPayload"));
  }
  @Test
  public void testForgotPasswordEndpoint() {
    ForgotPasswordRequest request = new ForgotPasswordRequest("contact@ada.com.vn");
    Mockito.doNothing().when(authService).forgotPassword(request);
    ResponseEntity<APIResponse<Void>> response = authController.forgotPassword(request);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("OTP Sent Successfully", response.getBody().message());
  }
  @Test
  public void testVerifyOTPEndpoint() {
    VerifyOTPRequest request = new VerifyOTPRequest("contact@ada.com.vn", "948201");
    Mockito.doNothing().when(authService).verifyOTP(request);
    ResponseEntity<APIResponse<Void>> response = authController.verifyOTP(request);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("OTP Verified Successfully", response.getBody().message());
  }
  @Test
  public void testResetPasswordEndpoint() {
    ResetPasswordRequest request = new ResetPasswordRequest("contact@ada.com.vn", "948201", "UpdatedPassword18", "UpdatedPassword18");
    Mockito.doNothing().when(authService).resetPassword(request);
    ResponseEntity<APIResponse<Void>> response = authController.resetPassword(request);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("Password Reset Successful", response.getBody().message());
  }
  @Test
  public void testRefreshTokenEndpoint() {
    TokenResult tokenResult = TokenResult.of("accessTokenPayloadNew", "refreshTokenPayloadNew");
    Mockito.when(authService.refreshToken(ArgumentMatchers.eq("refreshTokenPayloadOld"), ArgumentMatchers.any())).thenReturn(tokenResult);
    ResponseEntity<APIResponse<TokenResponse>> response = authController.refreshToken("refreshTokenPayloadOld", httpRequest, httpResponse);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("Token Refreshed Successfully", response.getBody().message());
    Assertions.assertEquals("accessTokenPayloadNew", response.getBody().data().accessToken());
    Mockito.verify(httpResponse).addHeader(ArgumentMatchers.eq(HttpHeaders.SET_COOKIE), ArgumentMatchers.contains("refreshToken=refreshTokenPayloadNew"));
  }
  @Test
  public void testLogoutEndpoint() {
    Mockito.doNothing().when(authService).logout(ArgumentMatchers.eq(httpRequest), ArgumentMatchers.eq("refreshTokenPayloadOld"));
    ResponseEntity<APIResponse<Void>> response = authController.logout("refreshTokenPayloadOld", httpRequest, httpResponse);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("Logout Successful", response.getBody().message());
    Mockito.verify(httpResponse).addHeader(ArgumentMatchers.eq(HttpHeaders.SET_COOKIE), ArgumentMatchers.contains("Max-Age=0"));
  }
  @Test
  public void testLogoutEndpoint_MissingRefreshToken() {
    com.ada.app.common.exception.AppException ex = Assertions.assertThrows(
      com.ada.app.common.exception.AppException.class,
      () -> authController.logout(null, httpRequest, httpResponse)
    );
    Assertions.assertEquals("Refresh Token Is Required", ex.getMessage());
  }
}