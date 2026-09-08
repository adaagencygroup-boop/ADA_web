package com.ada.app.modules.notification.dto;
import com.ada.app.modules.notification.enums.NotificationType;
import java.time.Instant;
import java.util.UUID;
public record NotificationDTO(
  UUID id,
  String title,
  String content,
  NotificationType type,
  Boolean isRead,
  Instant readAt,
  Instant createdAt
) {}