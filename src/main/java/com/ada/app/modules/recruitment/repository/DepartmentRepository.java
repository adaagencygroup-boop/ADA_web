package com.ada.app.modules.recruitment.repository;
import com.ada.app.modules.recruitment.entity.Department;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface DepartmentRepository extends JpaRepository<Department, UUID> {
  Optional<Department> findByName(String name);
  @Query("SELECT d FROM Department d WHERE (:search IS NULL OR lower(d.name) LIKE lower(concat('%', :search, '%')))")
  List<Department> findBySearch(@Param("search") String search);
}