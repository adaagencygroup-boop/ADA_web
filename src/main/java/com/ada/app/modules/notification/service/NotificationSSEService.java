package com.ada.app.modules.notification.service;
import com.ada.app.modules.notification.dto.NotificationDTO;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
@Slf4j
@Service
public class NotificationSSEService {
  private final Map<UUID, List<SseEmitter>> userEmitters = new ConcurrentHashMap<>();
  public SseEmitter subscribe(UUID userId) {
    SseEmitter emitter = new SseEmitter(1800000L);
    List<SseEmitter> list = userEmitters.computeIfAbsent(userId, k -> new CopyOnWriteArrayList<>());
    list.add(emitter);
    emitter.onCompletion(() -> removeEmitter(userId, emitter));
    emitter.onTimeout(() -> removeEmitter(userId, emitter));
    emitter.onError(e -> removeEmitter(userId, emitter));
    try {
      emitter.send(SseEmitter.event().name("init").data("Connected"));
    } catch (IOException e) {
      removeEmitter(userId, emitter);
    }
    return emitter;
  }
  public void sendToUsers(List<UUID> recipientUserIds, NotificationDTO notification) {
    if (recipientUserIds == null || recipientUserIds.isEmpty()) {
      broadcast(notification);
      return;
    }
    for (UUID userId : recipientUserIds) {
      List<SseEmitter> list = userEmitters.get(userId);
      if (list != null && !list.isEmpty()) {
        List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();
        for (SseEmitter emitter : list) {
          try {
            emitter.send(SseEmitter.event().name("notification").data(notification));
          } catch (Exception e) {
            deadEmitters.add(emitter);
          }
        }
        list.removeAll(deadEmitters);
      }
    }
  }
  public void broadcast(NotificationDTO notification) {
    for (Map.Entry<UUID, List<SseEmitter>> entry : userEmitters.entrySet()) {
      List<SseEmitter> list = entry.getValue();
      List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();
      for (SseEmitter emitter : list) {
        try {
          emitter.send(SseEmitter.event().name("notification").data(notification));
        } catch (Exception e) {
          deadEmitters.add(emitter);
        }
      }
      list.removeAll(deadEmitters);
    }
  }
  @Scheduled(fixedRate = 25000)
  public void sendHeartbeat() {
    for (Map.Entry<UUID, List<SseEmitter>> entry : userEmitters.entrySet()) {
      List<SseEmitter> list = entry.getValue();
      List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();
      for (SseEmitter emitter : list) {
        try {
          emitter.send(SseEmitter.event().name("ping").data("heartbeat"));
        } catch (Exception e) {
          deadEmitters.add(emitter);
        }
      }
      list.removeAll(deadEmitters);
    }
  }
  private void removeEmitter(UUID userId, SseEmitter emitter) {
    List<SseEmitter> list = userEmitters.get(userId);
    if (list != null) {
      list.remove(emitter);
      if (list.isEmpty()) {
        userEmitters.remove(userId);
      }
    }
  }
}