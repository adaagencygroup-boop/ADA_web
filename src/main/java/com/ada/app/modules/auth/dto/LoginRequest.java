package com.ada.app.modules.auth.dto;
import jakarta.validation.constraints.NotBlank;
public record LoginRequest(
  @NotBlank(message = "Identifier Is Required")
  String identifier,
  @NotBlank(message = "Password Is Required")
  String password,
  @NotBlank(message = "Device Fingerprint Is Required")
  String deviceFingerprint,
  String deviceName,
  String deviceType,
  Boolean rememberMe
) {}