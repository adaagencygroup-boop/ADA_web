package com.ada.app.modules.user.repository;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.enums.UserRole;
import jakarta.persistence.criteria.Predicate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
public class UserSpecs {
  public static Specification<User> filter(String search, UserRole role, Instant fromDate, Instant toDate) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (role != null) {
        predicates.add(cb.equal(root.get("role"), role));
      }
      if (search != null && !search.isBlank()) {
        String pattern = "%" + search.trim().toLowerCase() + "%";
        predicates.add(cb.or(
          cb.like(cb.lower(root.get("username")), pattern),
          cb.like(cb.lower(root.get("fullname")), pattern),
          cb.like(cb.lower(root.get("email")), pattern),
          cb.like(cb.lower(root.get("phone")), pattern)
        ));
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