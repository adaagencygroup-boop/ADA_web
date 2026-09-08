package com.ada.app.modules.notification.dto;
import java.time.Instant;
import java.util.UUID;
public record NotificationReadResponse(
  UUID id,
  Boolean isRead,
  Instant readAt
) {}