package com.ada.app.modules.dashboard.dto;
import java.util.UUID;
public record TopNewsStatDTO(
  UUID id,
  String title,
  int viewCount
) {}