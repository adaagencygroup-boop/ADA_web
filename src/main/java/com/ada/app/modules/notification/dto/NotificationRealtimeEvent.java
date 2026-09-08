package com.ada.app.modules.notification.dto;
import java.util.List;
import java.util.UUID;
public record NotificationRealtimeEvent(
  NotificationDTO notification,
  List<UUID> recipientUserIds
) {}