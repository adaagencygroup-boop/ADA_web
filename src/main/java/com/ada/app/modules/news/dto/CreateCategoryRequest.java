package com.ada.app.modules.news.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
public record CreateCategoryRequest(
  @NotBlank(message = "Category Name Is Required")
  @Size(max = 100, message = "Category Name Cannot Exceed 100 Chars")
  String name,
  @NotNull(message = "isActive Is Required")
  Boolean isActive
) {}