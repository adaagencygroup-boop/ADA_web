package com.ada.app.modules.contact.repository;
import com.ada.app.modules.contact.entity.Contact;
import com.ada.app.modules.contact.enums.ContactStatus;
import jakarta.persistence.criteria.Predicate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
public class ContactSpecs {
  public static Specification<Contact> filter(ContactStatus status, String search, Instant fromDate, Instant toDate) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      predicates.add(cb.isNull(root.get("deletedAt")));
      if (status != null) {
        predicates.add(cb.equal(root.get("status"), status));
      }
      if (search != null && !search.isBlank()) {
        String pattern = "%" + search.trim().toLowerCase() + "%";
        predicates.add(cb.or(
          cb.like(cb.lower(root.get("customerFullname")), pattern),
          cb.like(cb.lower(root.get("customerEmail")), pattern),
          cb.like(cb.lower(root.get("customerPhone")), pattern)
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