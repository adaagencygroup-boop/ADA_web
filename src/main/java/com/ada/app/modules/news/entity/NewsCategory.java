package com.ada.app.modules.news.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
@Entity
@Table(name = "\"newsCategories\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewsCategory {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @Column(name = "\"name\"", nullable = false, length = 100)
  private String name;
  @Column(name = "\"isActive\"", nullable = false)
  @Builder.Default
  private Boolean isActive = true;
  @Column(name = "\"createdAt\"", nullable = false, updatable = false)
  private Instant createdAt;
  @PrePersist
  protected void onCreate() {
    if (this.createdAt == null) {
      this.createdAt = Instant.now();
    }
  }
}