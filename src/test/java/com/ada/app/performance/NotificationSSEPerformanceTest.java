package com.ada.app.performance;
import com.ada.app.modules.notification.dto.NotificationDTO;
import com.ada.app.modules.notification.enums.NotificationType;
import com.ada.app.modules.notification.service.NotificationSSEService;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
public class NotificationSSEPerformanceTest {
  @Test
  public void testMultiSubscriberSSEBroadcastPerformance() {
    NotificationSSEService sseService = new NotificationSSEService();
    int subscriberCount = 50;
    List<UUID> userIds = new ArrayList<>();
    for (int i = 0; i < subscriberCount; i++) {
      UUID userId = UUID.randomUUID();
      userIds.add(userId);
      sseService.subscribe(userId);
    }
    NotificationDTO notification = new NotificationDTO(
      UUID.randomUUID(),
      "Thông Báo Hệ Thống",
      "Thông Điệp Phát Sóng Khẩn Cấp",
      NotificationType.system,
      false,
      null,
      Instant.now()
    );
    long startTime = System.currentTimeMillis();
    Assertions.assertDoesNotThrow(() -> sseService.broadcast(notification));
    Assertions.assertDoesNotThrow(() -> sseService.sendToUsers(userIds, notification));
    Assertions.assertDoesNotThrow(sseService::sendHeartbeat);
    long duration = System.currentTimeMillis() - startTime;
    Assertions.assertTrue(duration < 200);
  }
}