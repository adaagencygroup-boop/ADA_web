package com.ada.app.modules.auth.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
public record ResetPasswordRequest(
  @NotBlank(message = "Email Is Required")
  @Email(message = "Invalid Email Format")
  String email,
  @NotBlank(message = "OTP Code Is Required")
  @Size(min = 6, max = 6, message = "OTP Code Must Be Exactly 6 Digits")
  String otp,
  @NotBlank(message = "New Password Is Required")
  @Size(min = 8, message = "Password Must Be At Least 8 Chars")
  String newPassword,
  @NotBlank(message = "Confirm Password Is Required")
  String confirmPassword
) {}