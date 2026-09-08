package com.ada.app.modules.notification.redis;
import com.ada.app.modules.notification.dto.NotificationDTO;
import com.ada.app.modules.notification.dto.NotificationRealtimeEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Component;
@Slf4j
@Component
@RequiredArgsConstructor
public class RedisNotificationPublisher {
  private final StringRedisTemplate stringRedisTemplate;
  private final ChannelTopic notificationTopic;
  private final ObjectMapper objectMapper;
  public void publish(NotificationRealtimeEvent event) {
    try {
      String payload = objectMapper.writeValueAsString(event);
      stringRedisTemplate.convertAndSend(notificationTopic.getTopic(), payload);
    } catch (Exception e) {
      log.error("Failed To Publish Notification Event To Redis", e);
    }
  }
  public void publish(NotificationDTO notification) {
    publish(new NotificationRealtimeEvent(notification, List.of()));
  }
}