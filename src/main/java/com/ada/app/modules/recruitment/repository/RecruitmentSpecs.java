package com.ada.app.modules.recruitment.repository;
import com.ada.app.modules.recruitment.entity.Recruitment;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
import jakarta.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.domain.Specification;
public class RecruitmentSpecs {
  public static Specification<Recruitment> adminFilter(
    RecruitmentStatus status,
    UUID departmentId,
    EmploymentType employmentType,
    String location,
    BigDecimal minSalary,
    BigDecimal maxSalary,
    String search,
    Instant fromDate,
    Instant toDate
  ) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      if (status != null) {
        predicates.add(cb.equal(root.get("status"), status));
      }
      if (departmentId != null) {
        predicates.add(cb.equal(root.get("department").get("id"), departmentId));
      }
      if (employmentType != null) {
        predicates.add(cb.equal(root.get("employmentType"), employmentType));
      }
      if (location != null && !location.isBlank()) {
        predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.trim().toLowerCase() + "%"));
      }
      if (minSalary != null) {
        predicates.add(cb.greaterThanOrEqualTo(root.get("minSalary"), minSalary));
      }
      if (maxSalary != null) {
        predicates.add(cb.lessThanOrEqualTo(root.get("maxSalary"), maxSalary));
      }
      if (search != null && !search.isBlank()) {
        String pattern = "%" + search.trim().toLowerCase() + "%";
        predicates.add(cb.or(
          cb.like(cb.lower(root.get("jobTitle")), pattern),
          cb.like(cb.lower(root.get("description")), pattern)
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
  public static Specification<Recruitment> publicFilter(
    UUID departmentId,
    EmploymentType employmentType,
    String location,
    String search
  ) {
    return (root, query, cb) -> {
      List<Predicate> predicates = new ArrayList<>();
      predicates.add(cb.equal(root.get("status"), RecruitmentStatus.hiring));
      if (departmentId != null) {
        predicates.add(cb.equal(root.get("department").get("id"), departmentId));
      }
      if (employmentType != null) {
        predicates.add(cb.equal(root.get("employmentType"), employmentType));
      }
      if (location != null && !location.isBlank()) {
        predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.trim().toLowerCase() + "%"));
      }
      if (search != null && !search.isBlank()) {
        predicates.add(cb.like(cb.lower(root.get("jobTitle")), "%" + search.trim().toLowerCase() + "%"));
      }
      return cb.and(predicates.toArray(new Predicate[0]));
    };
  }
}