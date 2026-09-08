package com.ada.app.modules.news.dto;
import com.ada.app.modules.news.enums.NewsStatus;
import jakarta.validation.constraints.Size;
import java.util.UUID;
public record UpdateNewsRequest(
  @Size(max = 255, message = "Title Cannot Exceed 255 Chars")
  String title,
  UUID categoryId,
  String content,
  String coverImageURL,
  NewsStatus status,
  Boolean isFeatured
) {}