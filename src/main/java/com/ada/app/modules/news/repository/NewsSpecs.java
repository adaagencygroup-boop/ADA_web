package com.ada.app.modules.news.repository;
import com.ada.app.modules.news.entity.News;
import com.ada.app.modules.news.enums.NewsStatus;
import jakarta.persistence.criteria.Predicate;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.domain.Specification;
public class NewsSpecs {
  public static Specification<News> adminFilter(NewsStatus status, UUID categoryId, Boolean isFeatured, String search, Instant fromDate, Instant toDate) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (status != null) {
        predicates.add(cb.equal(root.get("status"), status));
      }
      if (categoryId != null) {
        predicates.add(cb.equal(root.get("category").get("id"), categoryId));
      }
      if (isFeatured != null) {
        predicates.add(cb.equal(root.get("isFeatured"), isFeatured));
      }
      if (search != null && !search.isBlank()) {
        String pattern = "%" + search.trim().toLowerCase() + "%";
        predicates.add(cb.or(
          cb.like(cb.lower(root.get("title")), pattern),
          cb.like(cb.lower(root.get("content")), pattern)
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
  public static Specification<News> publicFilter(UUID categoryId, String search) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      predicates.add(cb.equal(root.get("status"), NewsStatus.published));
      if (categoryId != null) {
        predicates.add(cb.equal(root.get("category").get("id"), categoryId));
      }
      if (search != null && !search.isBlank()) {
        String pattern = "%" + search.trim().toLowerCase() + "%";
        predicates.add(cb.or(
          cb.like(cb.lower(root.get("title")), pattern),
          cb.like(cb.lower(root.get("content")), pattern)
        ));
      }
      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}