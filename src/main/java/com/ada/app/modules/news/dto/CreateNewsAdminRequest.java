package com.ada.app.modules.news.dto;
import com.ada.app.modules.news.enums.NewsStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;
public record CreateNewsAdminRequest(
  @NotBlank(message = "Title Is Required")
  @Size(max = 255, message = "Title Cannot Exceed 255 Chars")
  String title,
  @NotNull(message = "Category ID Is Required")
  UUID categoryId,
  @NotBlank(message = "Content Is Required")
  String content,
  @NotBlank(message = "Cover Image URL Is Required")
  String coverImageURL,
  @NotNull(message = "Status Is Required")
  NewsStatus status,
  @NotNull(message = "isFeatured Is Required")
  Boolean isFeatured
) {}