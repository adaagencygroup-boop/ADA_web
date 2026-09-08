package com.ada.app.modules.backup.repository;
import com.ada.app.modules.backup.entity.BackupHistory;
import com.ada.app.modules.backup.enums.BackupStatus;
import jakarta.persistence.criteria.Predicate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
public class BackupHistorySpecs {
  public static Specification<BackupHistory> filter(BackupStatus status, String search, Instant fromDate, Instant toDate) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (status != null) {
        predicates.add(cb.equal(root.get("status"), status));
      }
      if (search != null && !search.isBlank()) {
        String pattern = "%" + search.trim().toLowerCase() + "%";
        predicates.add(cb.or(
          cb.like(cb.lower(root.get("fileURL")), pattern),
          cb.like(root.get("id").as(String.class), pattern)
        ));
      }
      if (fromDate != null) {
        predicates.add(cb.greaterThanOrEqualTo(root.get("startedAt"), fromDate));
      }
      if (toDate != null) {
        predicates.add(cb.lessThanOrEqualTo(root.get("startedAt"), toDate));
      }
      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}