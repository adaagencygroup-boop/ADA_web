package com.ada.app.modules.notification.repository;
import com.ada.app.modules.notification.entity.NotificationRecipient;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface NotificationRecipientRepository extends JpaRepository<NotificationRecipient, UUID>, JpaSpecificationExecutor<NotificationRecipient> {
  @EntityGraph(attributePaths = {"notification"})
  Page<NotificationRecipient> findAll(Specification<NotificationRecipient> spec, Pageable pageable);
  @EntityGraph(attributePaths = {"notification"})
  List<NotificationRecipient> findAll(Specification<NotificationRecipient> spec);
  @EntityGraph(attributePaths = {"notification"})
  Optional<NotificationRecipient> findByNotificationIdAndUserId(UUID notificationId, UUID userId);
  long countByUserIdAndIsReadFalse(UUID userId);
  @Modifying
  @Query("UPDATE NotificationRecipient nr SET nr.isRead = true, nr.readAt = :now WHERE nr.user.id = :userId AND nr.isRead = false")
  void markAllReadByUserId(@Param("userId") UUID userId, @Param("now") Instant now);
}