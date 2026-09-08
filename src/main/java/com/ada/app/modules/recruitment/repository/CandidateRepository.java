package com.ada.app.modules.recruitment.repository;
import com.ada.app.modules.recruitment.entity.Candidate;
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
public interface CandidateRepository extends JpaRepository<Candidate, UUID>, JpaSpecificationExecutor<Candidate> {
  @EntityGraph(attributePaths = {"recruitment", "recruitment.department"})
  Optional<Candidate> findById(UUID id);
  @EntityGraph(attributePaths = {"recruitment"})
  Page<Candidate> findAll(Specification<Candidate> spec, Pageable pageable);
  @EntityGraph(attributePaths = {"recruitment"})
  List<Candidate> findAll(Specification<Candidate> spec);
  long countByRecruitmentId(UUID recruitmentId);
  @Query("SELECT c.recruitment.id, count(c.id) FROM Candidate c WHERE c.recruitment.id IN :recruitmentIds GROUP BY c.recruitment.id")
  List<Object[]> countByRecruitmentIds(@Param("recruitmentIds") List<UUID> recruitmentIds);
  @Modifying
  @Query("DELETE FROM Candidate c WHERE c.recruitment.id = :recruitmentId")
  void deleteByRecruitmentId(@Param("recruitmentId") UUID recruitmentId);
}