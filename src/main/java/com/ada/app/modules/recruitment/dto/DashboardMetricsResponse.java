package com.ada.app.modules.recruitment.dto;
public record DashboardMetricsResponse(
  long activeCount,
  long totalCandidatesCount,
  long expiringSoonCount,
  long closedCount
) {}