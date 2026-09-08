package com.ada.app.modules.news.dto;
import java.util.UUID;
public record PublicCategoryResponse(
  UUID id,
  String name
) {}