package com.ada.app.modules.news.dto;
import jakarta.validation.constraints.NotNull;
public record FeaturedRequest(
  @NotNull(message = "Featured Status Is Required")
  Boolean isFeatured
) {}