package com.ada.app.modules.news.repository;
import com.ada.app.modules.news.entity.NewsCategory;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface NewsCategoryRepository extends JpaRepository<NewsCategory, UUID> {
  Optional<NewsCategory> findByName(String name);
  List<NewsCategory> findByIsActiveTrue();
  @Query("SELECT c FROM NewsCategory c WHERE (:search IS NULL OR lower(c.name) LIKE lower(concat('%', :search, '%'))) ORDER BY c.createdAt DESC")
  List<NewsCategory> findBySearch(@Param("search") String search);
}