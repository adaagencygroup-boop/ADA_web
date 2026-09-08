package com.ada.app.modules.recruitment.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;
public record ApplyCandidateRequest(
  @NotNull(message = "Recruitment ID Is Required")
  UUID recruitmentId,
  @NotBlank(message = "Fullname Is Required")
  @Size(max = 150, message = "Fullname Cannot Exceed 150 Char")
  String fullname,
  @Email(message = "Invalid Email Format")
  String email,
  @Size(max = 20, message = "Phone Cannot Exceed 20 Chars")
  String phone,
  String resumeURL,
  String message
) {}