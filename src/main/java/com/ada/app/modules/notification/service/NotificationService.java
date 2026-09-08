package com.ada.app.modules.notification.service;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.security.SecurityUtils;
import com.ada.app.common.util.ExcelExportService;
import com.ada.app.modules.notification.dto.NotificationDTO;
import com.ada.app.modules.notification.dto.NotificationListResponse;
import com.ada.app.modules.notification.dto.NotificationReadResponse;
import com.ada.app.modules.notification.dto.NotificationRealtimeEvent;
import com.ada.app.modules.notification.entity.Notification;
import com.ada.app.modules.notification.entity.NotificationRecipient;
import com.ada.app.modules.notification.enums.NotificationType;
import com.ada.app.modules.notification.redis.RedisNotificationPublisher;
import com.ada.app.modules.notification.repository.NotificationRecipientRepository;
import com.ada.app.modules.notification.repository.NotificationRecipientSpecs;
import com.ada.app.modules.notification.repository.NotificationRepository;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.enums.UserRole;
import com.ada.app.modules.user.repository.UserRepository;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class NotificationService {
  private final NotificationRepository notificationRepository;
  private final NotificationRecipientRepository recipientRepository;
  private final UserRepository userRepository;
  private final RedisNotificationPublisher redisNotificationPublisher;
  private final ExcelExportService excelExportService;
  @Transactional
  public Notification createAndBroadcast(String title, String content, NotificationType type) {
    Set<User> recipients = new HashSet<>(userRepository.findByRole(UserRole.admin));
    if (type != NotificationType.system) {
      recipients.addAll(userRepository.findByRole(UserRole.staff));
    }
    return createAndBroadcastToUsers(title, content, type, new ArrayList<>(recipients));
  }
  @Transactional
  public Notification createAndBroadcastToUsers(String title, String content, NotificationType type, List<User> targetUsers) {
    Notification notification = Notification.builder()
      .title(title)
      .content(content)
      .type(type)
      .build();
    notification = notificationRepository.save(notification);
    List<UUID> recipientUserIds = new ArrayList<>();
    for (User user : targetUsers) {
      NotificationRecipient recipient = NotificationRecipient.builder()
        .notification(notification)
        .user(user)
        .isRead(false)
        .build();
      recipientRepository.save(recipient);
      recipientUserIds.add(user.getId());
    }
    NotificationDTO dto = new NotificationDTO(
      notification.getId(),
      notification.getTitle(),
      notification.getContent(),
      notification.getType(),
      false,
      null,
      notification.getCreatedAt() != null ? notification.getCreatedAt() : Instant.now()
    );
    redisNotificationPublisher.publish(new NotificationRealtimeEvent(dto, recipientUserIds));
    return notification;
  }
  @Transactional(readOnly = true)
  public NotificationListResponse getNotifications(
    int page,
    int size,
    NotificationType type,
    Boolean isRead,
    String search,
    Instant fromDate,
    Instant toDate
  ) {
    UUID userId = SecurityUtils.getCurrentUserId();
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("notification.createdAt").descending());
    Page<NotificationRecipient> result = recipientRepository.findAll(NotificationRecipientSpecs.filter(userId, type, isRead, search, fromDate, toDate), pageable);
    List<NotificationDTO> items = result.getContent().stream()
      .map(nr -> {
        Notification n = nr.getNotification();
        return new NotificationDTO(
          n.getId(),
          n.getTitle(),
          n.getContent(),
          n.getType(),
          nr.getIsRead(),
          nr.getReadAt(),
          n.getCreatedAt()
        );
      })
      .toList();
    long unreadCount = recipientRepository.countByUserIdAndIsReadFalse(userId);
    return new NotificationListResponse(items, unreadCount, PageResponse.Pagination.from(result));
  }
  @Transactional
  public NotificationDTO getNotificationDetail(UUID id) {
    UUID userId = SecurityUtils.getCurrentUserId();
    NotificationRecipient nr = recipientRepository.findByNotificationIdAndUserId(id, userId)
      .orElseThrow(() -> AppException.notFound("Notification Not Found"));
    if (!Boolean.TRUE.equals(nr.getIsRead())) {
      nr.setIsRead(true);
      nr.setReadAt(Instant.now());
      recipientRepository.save(nr);
    }
    Notification n = nr.getNotification();
    return new NotificationDTO(
      n.getId(),
      n.getTitle(),
      n.getContent(),
      n.getType(),
      nr.getIsRead(),
      nr.getReadAt(),
      n.getCreatedAt()
    );
  }
  @Transactional
  public NotificationReadResponse markAsRead(UUID id) {
    UUID userId = SecurityUtils.getCurrentUserId();
    NotificationRecipient nr = recipientRepository.findByNotificationIdAndUserId(id, userId)
      .orElseThrow(() -> AppException.notFound("Notification Not Found"));
    nr.setIsRead(true);
    nr.setReadAt(Instant.now());
    recipientRepository.save(nr);
    return new NotificationReadResponse(nr.getNotification().getId(), nr.getIsRead(), nr.getReadAt());
  }
  @Transactional
  public void markAllAsRead() {
    UUID userId = SecurityUtils.getCurrentUserId();
    recipientRepository.markAllReadByUserId(userId, Instant.now());
  }
  @Transactional(readOnly = true)
  public byte[] exportNotificationsExcel(NotificationType type, Boolean isRead, String search, Instant fromDate, Instant toDate) {
    UUID userId = SecurityUtils.getCurrentUserId();
    List<NotificationRecipient> list = recipientRepository.findAll(NotificationRecipientSpecs.filter(userId, type, isRead, search, fromDate, toDate), Sort.by("notification.createdAt").descending());
    List<String> headers = List.of("ID", "Title", "Content", "Type", "Is Read", "Read At", "Created At");
    List<List<Object>> rows = new ArrayList<>();
    for (NotificationRecipient nr : list) {
      Notification n = nr.getNotification();
      rows.add(List.of(
        n.getId().toString(),
        n.getTitle(),
        n.getContent(),
        n.getType().name(),
        Boolean.TRUE.equals(nr.getIsRead()) ? "Yes" : "No",
        nr.getReadAt() != null ? nr.getReadAt().toString() : "",
        n.getCreatedAt() != null ? n.getCreatedAt().toString() : ""
      ));
    }
    return excelExportService.exportToExcel("Notifications", headers, rows);
  }
}