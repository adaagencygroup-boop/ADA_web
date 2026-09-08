package com.ada.app.modules.user.dto;
import jakarta.validation.constraints.Size;
public record UpdateUserRequest(
  @Size(max = 150, message = "Fullname Must Not Exceed 150 Chars")
  String fullname,
  String email,
  @Size(max = 20, message = "Phone Cannot Exceed 20 Chars")
  String phone
) {}