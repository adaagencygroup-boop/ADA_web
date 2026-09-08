package com.ada.app.modules.user.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
public record CreateUserRequest(
  @NotBlank(message = "Username Is Required")
  @Size(min = 3, max = 50, message = "Username Must Be Between 3 - 50 Chars")
  String username,
  @NotBlank(message = "Fullname Is Required")
  @Size(max = 150, message = "Fullname Must Not Exceed 150 Chars")
  String fullname,
  @NotBlank(message = "Email Is Required")
  @Email(message = "Invalid Email Format")
  String email,
  @NotBlank(message = "Phone Number Is Required")
  @Size(max = 20, message = "Phone Cannot Exceed 20 Chars")
  String phone,
  @NotBlank(message = "Password Is Required")
  @Size(min = 8, message = "Password Must Be At Least 8 Chars")
  String password
) {}