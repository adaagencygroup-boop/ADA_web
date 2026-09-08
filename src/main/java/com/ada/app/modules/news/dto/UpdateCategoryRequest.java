package com.ada.app.modules.news.dto;
import jakarta.validation.constraints.Size;
public record UpdateCategoryRequest(
  @Size(max = 100, message = "Category Name Cannot Exceed 100 Chars")
  String name,
  Boolean isActive
) {}