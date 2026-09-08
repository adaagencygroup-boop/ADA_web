package com.ada.app.modules.news.repository;
import com.ada.app.modules.news.entity.News;
import com.ada.app.modules.news.enums.NewsStatus;
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
public interface NewsRepository extends JpaRepository<News, UUID>, JpaSpecificationExecutor<News> {
  @EntityGraph(attributePaths = {"author", "category"})
  Optional<News> findBySlug(String slug);
  @EntityGraph(attributePaths = {"author", "category"})
  Optional<News> findBySlugAndStatus(String slug, NewsStatus status);
  boolean existsBySlug(String slug);
  @EntityGraph(attributePaths = {"author", "category"})
  Page<News> findAll(Specification<News> spec, Pageable pageable);
  @EntityGraph(attributePaths = {"author", "category"})
  List<News> findAll(Specification<News> spec);
  @EntityGraph(attributePaths = {"author", "category"})
  List<News> findByStatusAndIsFeaturedTrueOrderByCreatedAtDesc(NewsStatus status, Pageable pageable);
  @Query(value = "SELECT * FROM \"news\" WHERE \"status\" = 'published' ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
  List<News> findRandomPublishedNews(@Param("limit") int limit);
  @Modifying
  @Query("UPDATE News n SET n.viewCount = n.viewCount + :delta WHERE n.id = :id")
  void incrementViewCount(@Param("id") UUID id, @Param("delta") int delta);
  long countByStatus(NewsStatus status);
  @EntityGraph(attributePaths = {"author", "category"})
  List<News> findByStatusOrderByViewCountDesc(NewsStatus status, Pageable pageable);
  @Modifying
  @Query("UPDATE News n SET n.author = :newAuthor WHERE n.author = :oldAuthor")
  int reassignAuthor(@Param("oldAuthor") com.ada.app.modules.user.entity.User oldAuthor, @Param("newAuthor") com.ada.app.modules.user.entity.User newAuthor);
}