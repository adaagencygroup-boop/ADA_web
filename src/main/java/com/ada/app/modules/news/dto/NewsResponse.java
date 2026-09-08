package com.ada.app.modules.news.dto;
import com.ada.app.modules.news.enums.NewsStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;
import java.util.UUID;
@JsonInclude(JsonInclude.Include.NON_NULL)
public record NewsResponse(
  UUID id,
  String title,
  String slug,
  String content,
  String coverImageURL,
  NewsStatus status,
  Integer viewCount,
  Boolean isFeatured,
  UUID categoryId,
  String categoryName,
  String authorName,
  Instant updatedAt,
  Instant createdAt
) {}