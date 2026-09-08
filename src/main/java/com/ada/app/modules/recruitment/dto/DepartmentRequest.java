package com.ada.app.modules.recruitment.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
public record DepartmentRequest(
  @NotBlank(message = "Department Name Is Required")
  @Size(max = 100, message = "Department Name Cannot Exceed 100 Chars")
  String name
) {}