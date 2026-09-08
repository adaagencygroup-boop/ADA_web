package com.ada.app.modules.auth.controller;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.model.APIResponse;
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
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;
  @Value("${app.jwt.refreshExpirationSeconds}")
  private long refreshExpirationSeconds;
  @PostMapping("/login")
  public ResponseEntity<APIResponse<LoginResponse>> login(
    @Valid @RequestBody LoginRequest request,
    HttpServletRequest httpRequest,
    HttpServletResponse httpResponse
  ) {
    AuthResult result = authService.login(request, httpRequest);
    setRefreshTokenCookie(httpResponse, result.refreshToken(), refreshExpirationSeconds);
    LoginResponse response = new LoginResponse(result.accessToken(), result.tokenType(), result.user());
    return ResponseEntity.ok(APIResponse.ok("Login Successful", response));
  }
  @PostMapping("/forgotPassword")
  public ResponseEntity<APIResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
    authService.forgotPassword(request);
    return ResponseEntity.ok(APIResponse.ok("OTP Sent Successfully", null));
  }
  @PostMapping("/verifyOTP")
  public ResponseEntity<APIResponse<Void>> verifyOTP(@Valid @RequestBody VerifyOTPRequest request) {
    authService.verifyOTP(request);
    return ResponseEntity.ok(APIResponse.ok("OTP Verified Successfully", null));
  }
  @PostMapping("/resetPassword")
  public ResponseEntity<APIResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
    authService.resetPassword(request);
    return ResponseEntity.ok(APIResponse.ok("Password Reset Successful", null));
  }
  @PostMapping("/refreshToken")
  public ResponseEntity<APIResponse<TokenResponse>> refreshToken(
    @CookieValue(name = "refreshToken", required = false) String refreshToken,
    HttpServletRequest httpRequest,
    HttpServletResponse httpResponse
  ) {
    if (refreshToken == null || refreshToken.isBlank()) {
      throw AppException.unauthorized("Refresh Token Is Required");
    }
    TokenResult result = authService.refreshToken(refreshToken, httpRequest);
    setRefreshTokenCookie(httpResponse, result.refreshToken(), refreshExpirationSeconds);
    TokenResponse response = TokenResponse.of(result.accessToken());
    return ResponseEntity.ok(APIResponse.ok("Token Refreshed Successfully", response));
  }
  @PostMapping("/logout")
  public ResponseEntity<APIResponse<Void>> logout(
    @CookieValue(name = "refreshToken", required = false) String refreshToken,
    HttpServletRequest httpRequest,
    HttpServletResponse httpResponse
  ) {
    if (refreshToken == null || refreshToken.isBlank()) {
      throw AppException.unauthorized("Refresh Token Is Required");
    }
    authService.logout(httpRequest, refreshToken);
    setRefreshTokenCookie(httpResponse, "", 0);
    return ResponseEntity.ok(APIResponse.ok("Logout Successful", null));
  }
  private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken, long maxAge) {
    ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken != null ? refreshToken : "")
      .httpOnly(true)
      .secure(true)
      .path("/api/v1/auth")
      .maxAge(maxAge)
      .sameSite("Strict")
      .build();
    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
  }
}