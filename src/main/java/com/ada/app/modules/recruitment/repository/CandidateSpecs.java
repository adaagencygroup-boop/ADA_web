package com.ada.app.modules.recruitment.repository;
import com.ada.app.modules.recruitment.entity.Candidate;
import jakarta.persistence.criteria.Predicate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.domain.Specification;
public class CandidateSpecs {
  public static Specification<Candidate> filter(UUID recruitmentId, String search, Instant fromDate, Instant toDate) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (recruitmentId != null) {
        predicates.add(cb.equal(root.get("recruitment").get("id"), recruitmentId));
      }
      if (search != null && !search.isBlank()) {
        String pattern = "%" + search.trim().toLowerCase() + "%";
        predicates.add(cb.or(
          cb.like(cb.lower(root.get("fullname")), pattern),
          cb.like(cb.lower(root.get("email")), pattern),
          cb.like(cb.lower(root.get("phone")), pattern)
        ));
      }
      if (fromDate != null) {
        predicates.add(cb.greaterThanOrEqualTo(root.get("appliedAt"), fromDate));
      }
      if (toDate != null) {
        predicates.add(cb.lessThanOrEqualTo(root.get("appliedAt"), toDate));
      }
      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}