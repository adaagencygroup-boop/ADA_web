package com.ada.app.modules.auth.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public record ForgotPasswordRequest(
  @NotBlank(message = "Email Is Required")
  @Email(message = "Invalid Email Format")
  String email
) {}