package com.ada.app.functional;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.security.JWTAuthenticationDetails;
import com.ada.app.modules.notification.controller.NotificationController;
import com.ada.app.modules.notification.dto.NotificationDTO;
import com.ada.app.modules.notification.dto.NotificationListResponse;
import com.ada.app.modules.notification.dto.NotificationReadResponse;
import com.ada.app.modules.notification.enums.NotificationType;
import com.ada.app.modules.notification.service.NotificationSSEService;
import com.ada.app.modules.notification.service.NotificationService;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
public class NotificationControllerFunctionalTest {
  private NotificationService notificationService;
  private NotificationSSEService notificationSSEService;
  private NotificationController notificationController;
  private UUID currentUserId;
  @BeforeEach
  public void setUp() {
    currentUserId = UUID.randomUUID();
    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
      currentUserId.toString(),
      null,
      Collections.singletonList(new SimpleGrantedAuthority("admin"))
    );
    auth.setDetails(new JWTAuthenticationDetails("127.0.0.1", UUID.randomUUID().toString()));
    SecurityContextHolder.getContext().setAuthentication(auth);
    notificationService = Mockito.mock(NotificationService.class);
    notificationSSEService = Mockito.mock(NotificationSSEService.class);
    notificationController = new NotificationController(notificationService, notificationSSEService);
  }
  @Test
  public void testStreamNotificationsEndpoint() {
    SseEmitter emitter = new SseEmitter();
    Mockito.when(notificationSSEService.subscribe(currentUserId)).thenReturn(emitter);
    SseEmitter result = notificationController.streamNotifications();
    Assertions.assertNotNull(result);
  }
  @Test
  public void testGetNotificationsEndpoint() {
    NotificationDTO dto = new NotificationDTO(UUID.randomUUID(), "Bản Sao Lưu Hoàn Tất", "Sao Lưu Dữ Liệu Hệ Thống Hoàn Tất", NotificationType.system, false, null, Instant.now());
    NotificationListResponse listResponse = new NotificationListResponse(List.of(dto), 1, new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(notificationService.getNotifications(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(listResponse);
    ResponseEntity<APIResponse<NotificationListResponse>> response = notificationController.getNotifications(1, 10, null, null, null, null, null);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertEquals(1, response.getBody().data().unreadCount());
  }
  @Test
  public void testGetNotificationDetailEndpoint() {
    UUID notifId = UUID.randomUUID();
    NotificationDTO dto = new NotificationDTO(notifId, "Bản Sao Lưu Hoàn Tất", "Sao Lưu Dữ Liệu Hệ Thống Hoàn Tất", NotificationType.system, true, Instant.now(), Instant.now());
    Mockito.when(notificationService.getNotificationDetail(notifId)).thenReturn(dto);
    ResponseEntity<APIResponse<NotificationDTO>> response = notificationController.getNotificationDetail(notifId);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertTrue(response.getBody().data().isRead());
  }
  @Test
  public void testMarkAsReadEndpoint() {
    UUID notifId = UUID.randomUUID();
    NotificationReadResponse readResponse = new NotificationReadResponse(notifId, true, Instant.now());
    Mockito.when(notificationService.markAsRead(notifId)).thenReturn(readResponse);
    ResponseEntity<APIResponse<NotificationReadResponse>> response = notificationController.markAsRead(notifId);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertTrue(response.getBody().data().isRead());
  }
  @Test
  public void testMarkAllAsReadEndpoint() {
    Mockito.doNothing().when(notificationService).markAllAsRead();
    ResponseEntity<APIResponse<Void>> response = notificationController.markAllAsRead();
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertEquals("All Notifications Marked As Read", response.getBody().message());
  }
  @Test
  public void testExportNotificationsExcelEndpoint() {
    byte[] excelBytes = new byte[]{0x50, 0x4B, 0x03, 0x04};
    Mockito.when(notificationService.exportNotificationsExcel(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(excelBytes);
    ResponseEntity<byte[]> response = notificationController.exportNotificationsExcel(null, null, null, null, null);
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertTrue(response.getHeaders().getFirst(HttpHeaders.CONTENT_DISPOSITION).contains("notifications.xlsx"));
  }
}