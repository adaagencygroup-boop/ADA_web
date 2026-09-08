package com.ada.app.modules.news.dto;
import java.time.Instant;
import java.util.UUID;
public record CategoryResponse(
  UUID id,
  String name,
  Boolean isActive,
  Instant createdAt
) {}