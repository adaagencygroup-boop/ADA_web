package com.ada.app.modules.notification.redis;
import com.ada.app.modules.notification.dto.NotificationRealtimeEvent;
import com.ada.app.modules.notification.service.NotificationSSEService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;
@Slf4j
@Component
@RequiredArgsConstructor
public class RedisNotificationSubscriber implements MessageListener {
  private final NotificationSSEService notificationSSEService;
  private final ObjectMapper objectMapper;
  @Override
  public void onMessage(Message message, byte[] pattern) {
    try {
      String json = new String(message.getBody(), StandardCharsets.UTF_8);
      NotificationRealtimeEvent event = objectMapper.readValue(json, NotificationRealtimeEvent.class);
      notificationSSEService.sendToUsers(event.recipientUserIds(), event.notification());
    } catch (Exception e) {
      log.error("Failed To Process Notification Event From Redis", e);
    }
  }
}