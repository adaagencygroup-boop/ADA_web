package com.ada.app.modules.recruitment.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.UUID;
public record ApplyCandidateRequest(
  @NotNull(message = "ID tin tuyển dụng là bắt buộc")
  UUID recruitmentId,
  @NotBlank(message = "Vui lòng nhập họ và tên")
  @Size(max = 150, message = "Họ và tên không được vượt quá 150 ký tự")
  @Pattern(regexp = "^[\\p{L}\\s]+$", message = "Họ và tên chỉ được chứa chữ cái và khoảng trắng")
  String fullname,
  @NotBlank(message = "Vui lòng nhập địa chỉ email")
  @Pattern(regexp = "^(?!\\.)(?!.*\\.\\.)[a-zA-Z0-9._%+-]+@(?i)[a-z0-9-]+(\\.[a-z0-9-]+)*\\.[a-z]{2,}$", message = "Địa chỉ email không hợp lệ")
  String email,
  @NotBlank(message = "Vui lòng nhập số điện thoại")
  @Pattern(regexp = "^(?!0{10})\\d{10}$", message = "Số điện thoại phải gồm đúng 10 chữ số hợp lệ")
  String phone,
  String resumeURL,
  String message
) {}