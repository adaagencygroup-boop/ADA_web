package com.ada.app.modules.notification.controller;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.security.SecurityUtils;
import com.ada.app.modules.notification.dto.NotificationDTO;
import com.ada.app.modules.notification.dto.NotificationListResponse;
import com.ada.app.modules.notification.dto.NotificationReadResponse;
import com.ada.app.modules.notification.enums.NotificationType;
import com.ada.app.modules.notification.service.NotificationSSEService;
import com.ada.app.modules.notification.service.NotificationService;
import java.time.Instant;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
@RestController
@RequestMapping({"/api/v1/notifications", "/api/v1/admin/notifications"})
@RequiredArgsConstructor
public class NotificationController {
  private final NotificationService notificationService;
  private final NotificationSSEService notificationSSEService;
  @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public SseEmitter streamNotifications() {
    UUID userId = SecurityUtils.getCurrentUserId();
    return notificationSSEService.subscribe(userId);
  }
  @GetMapping
  public ResponseEntity<APIResponse<NotificationListResponse>> getNotifications(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) NotificationType type,
    @RequestParam(required = false) Boolean isRead,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    return ResponseEntity.ok(APIResponse.ok("Notifications Retrieved Successfully", notificationService.getNotifications(page, size, type, isRead, search, fromDate, toDate)));
  }
  @GetMapping("/exportExcel")
  public ResponseEntity<byte[]> exportNotificationsExcel(
    @RequestParam(required = false) NotificationType type,
    @RequestParam(required = false) Boolean isRead,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    byte[] excelBytes = notificationService.exportNotificationsExcel(type, isRead, search, fromDate, toDate);
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=notifications.xlsx")
      .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
      .body(excelBytes);
  }
  @GetMapping("/{id}")
  public ResponseEntity<APIResponse<NotificationDTO>> getNotificationDetail(@PathVariable UUID id) {
    return ResponseEntity.ok(APIResponse.ok("Notification Detail Retrieved Successfully", notificationService.getNotificationDetail(id)));
  }
  @PatchMapping("/{id}/read")
  public ResponseEntity<APIResponse<NotificationReadResponse>> markAsRead(@PathVariable UUID id) {
    return ResponseEntity.ok(APIResponse.ok("Notification Marked As Read", notificationService.markAsRead(id)));
  }
  @PatchMapping("/markAllRead")
  public ResponseEntity<APIResponse<Void>> markAllAsRead() {
    notificationService.markAllAsRead();
    return ResponseEntity.ok(APIResponse.ok("All Notifications Marked As Read", null));
  }
}