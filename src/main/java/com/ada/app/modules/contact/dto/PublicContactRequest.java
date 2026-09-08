package com.ada.app.modules.contact.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
public record PublicContactRequest(
  @NotBlank(message = "Customer Fullname Is Required")
  @Size(max = 150, message = "Customer Fullname Cannot Exceed 150 Chars")
  String customerFullname,
  @Size(max = 20, message = "Phone Cannot Exceed 20 Characters")
  String customerPhone,
  @Email(message = "Invalid Email Format")
  String customerEmail,
  @NotBlank(message = "Message Is Required")
  String message
) {}