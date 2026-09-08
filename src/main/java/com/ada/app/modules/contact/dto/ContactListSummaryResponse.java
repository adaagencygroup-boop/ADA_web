package com.ada.app.modules.contact.dto;
import com.ada.app.common.model.PageResponse;
public record ContactListSummaryResponse(
  long totalCount,
  long pendingCount,
  long respondedCount,
  PageResponse<ContactResponse> page
) {}