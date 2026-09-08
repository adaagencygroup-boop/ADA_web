package com.ada.app.modules.user.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
public record AdminResetUserPasswordRequest(
  @NotBlank(message = "New Password Is Required")
  @Size(min = 8, message = "New Password Must Be At Least 8 Chars")
  String newPassword,
  @NotBlank(message = "Confirm Password Is Required")
  String confirmPassword
) {}