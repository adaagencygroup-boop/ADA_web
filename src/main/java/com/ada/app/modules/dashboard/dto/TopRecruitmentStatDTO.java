package com.ada.app.modules.dashboard.dto;
import java.util.UUID;
public record TopRecruitmentStatDTO(
  UUID id,
  String jobTitle,
  int viewCount,
  double percentage
) {}