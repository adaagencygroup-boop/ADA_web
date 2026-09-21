package com.ada.app.modules.recruitment.repository;
import com.ada.app.modules.recruitment.entity.Recruitment;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
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
public interface RecruitmentRepository extends JpaRepository<Recruitment, UUID>, JpaSpecificationExecutor<Recruitment> {
  @EntityGraph(attributePaths = {"recruiter", "department"})
  Optional<Recruitment> findBySlug(String slug);
  @EntityGraph(attributePaths = {"recruiter", "department"})
  Optional<Recruitment> findBySlugAndStatus(String slug, RecruitmentStatus status);
  boolean existsBySlug(String slug);
  @Query("SELECT COUNT(r) > 0 FROM Recruitment r WHERE r.department.id = :departmentId")
  boolean existsByDepartmentId(@Param("departmentId") UUID departmentId);
  @EntityGraph(attributePaths = {"recruiter", "department"})
  Page<Recruitment> findAll(Specification<Recruitment> spec, Pageable pageable);
  @EntityGraph(attributePaths = {"recruiter", "department"})
  List<Recruitment> findAll(Specification<Recruitment> spec);
  @Modifying
  @Query(value = "UPDATE recruitments SET status = 'closed'::\"recruitmentStatus\" WHERE status = 'hiring'::\"recruitmentStatus\" AND \"expiresAt\" IS NOT NULL AND \"expiresAt\" <= :now", nativeQuery = true)
  int closeExpiredRecruitments(@Param("now") Instant now);
  long countByStatus(RecruitmentStatus status);

  @Query("SELECT COUNT(r) FROM Recruitment r WHERE r.status = :status AND r.createdAt >= :startDate AND r.createdAt < :endDate")
  long countByStatusAndCreatedAtBetween(@Param("status") RecruitmentStatus status, @Param("startDate") Instant startDate, @Param("endDate") Instant endDate);

  @Query("SELECT count(r) FROM Recruitment r WHERE r.status = 'hiring' AND r.expiresAt IS NOT NULL AND r.expiresAt BETWEEN :now AND :soon")
  long countExpiringSoon(@Param("now") Instant now, @Param("soon") Instant soon);
  @Query("SELECT DISTINCT r.employmentType FROM Recruitment r WHERE r.status = 'hiring' AND r.employmentType IS NOT NULL")
  List<EmploymentType> findDistinctEmploymentTypes();
  @Modifying
  @Query("UPDATE Recruitment r SET r.viewCount = r.viewCount + :delta WHERE r.id = :id")
  void incrementViewCount(@Param("id") UUID id, @Param("delta") int delta);
  @EntityGraph(attributePaths = {"department", "recruiter"})
  List<Recruitment> findByStatusOrderByViewCountDesc(RecruitmentStatus status, Pageable pageable);

  @EntityGraph(attributePaths = {"department", "recruiter"})
  @Query("SELECT r FROM Recruitment r WHERE r.status = :status AND r.createdAt >= :startDate AND r.createdAt < :endDate ORDER BY r.viewCount DESC")
  List<Recruitment> findByStatusAndCreatedAtBetweenOrderByViewCountDesc(@Param("status") RecruitmentStatus status, @Param("startDate") Instant startDate, @Param("endDate") Instant endDate, Pageable pageable);

  @Modifying
  @Query("UPDATE Recruitment r SET r.recruiter = :newRecruiter WHERE r.recruiter = :oldRecruiter")
  int reassignRecruiter(@Param("oldRecruiter") com.ada.app.modules.user.entity.User oldRecruiter, @Param("newRecruiter") com.ada.app.modules.user.entity.User newRecruiter);
}