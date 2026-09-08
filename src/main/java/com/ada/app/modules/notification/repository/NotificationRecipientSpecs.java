package com.ada.app.modules.notification.repository;
import com.ada.app.modules.notification.entity.NotificationRecipient;
import com.ada.app.modules.notification.enums.NotificationType;
import jakarta.persistence.criteria.Predicate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.domain.Specification;
public class NotificationRecipientSpecs {
  public static Specification<NotificationRecipient> filter(UUID userId, NotificationType type, Boolean isRead, String search, Instant fromDate, Instant toDate) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (userId != null) {
        predicates.add(cb.equal(root.get("user").get("id"), userId));
      }
      if (type != null) {
        predicates.add(cb.equal(root.get("notification").get("type"), type));
      }
      if (isRead != null) {
        predicates.add(cb.equal(root.get("isRead"), isRead));
      }
      if (search != null && !search.isBlank()) {
        String pattern = "%" + search.trim().toLowerCase() + "%";
        predicates.add(cb.or(
          cb.like(cb.lower(root.get("notification").get("title")), pattern),
          cb.like(cb.lower(root.get("notification").get("content")), pattern)
        ));
      }
      if (fromDate != null) {
        predicates.add(cb.greaterThanOrEqualTo(root.get("notification").get("createdAt"), fromDate));
      }
      if (toDate != null) {
        predicates.add(cb.lessThanOrEqualTo(root.get("notification").get("createdAt"), toDate));
      }
      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}