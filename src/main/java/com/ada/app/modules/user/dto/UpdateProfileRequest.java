package com.ada.app.modules.user.dto;
import jakarta.validation.constraints.Size;
public record UpdateProfileRequest(
  @Size(max = 150, message = "Fullname Cannot Exceed 150 Chars")
  String fullname,
  @Size(max = 20, message = "Phone Cannot Exceed 20 Chars")
  String phone
) {}