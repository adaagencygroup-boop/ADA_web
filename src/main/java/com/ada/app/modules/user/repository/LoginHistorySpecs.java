package com.ada.app.modules.user.repository;
import com.ada.app.modules.user.entity.LoginHistory;
import com.ada.app.modules.user.enums.LoginStatus;
import jakarta.persistence.criteria.Predicate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.domain.Specification;
public class LoginHistorySpecs {
  public static Specification<LoginHistory> filter(UUID userId, LoginStatus status, Instant fromDate, Instant toDate) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (userId != null) {
        predicates.add(cb.equal(root.get("user").get("id"), userId));
      }
      if (status != null) {
        predicates.add(cb.equal(root.get("status"), status));
      }
      if (fromDate != null) {
        predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), fromDate));
      }
      if (toDate != null) {
        predicates.add(cb.lessThanOrEqualTo(root.get("createdAt"), toDate));
      }
      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}