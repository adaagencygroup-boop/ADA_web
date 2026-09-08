package com.ada.app.modules.notification.dto;
import com.ada.app.common.model.PageResponse;
import java.util.List;
public record NotificationListResponse(
  List<NotificationDTO> items,
  long unreadCount,
  PageResponse.Pagination pagination
) {}