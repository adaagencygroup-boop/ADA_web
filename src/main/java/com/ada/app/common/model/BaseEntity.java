package com.ada.app.common.model;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.time.Instant;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @Column(name = "\"createdAt\"", nullable = false, updatable = false)
  private Instant createdAt;
  @Column(name = "\"updatedAt\"", nullable = false)
  private Instant updatedAt;
  @PrePersist
  protected void onCreate() {
    Instant now = Instant.now();
    if (this.createdAt == null) {
      this.createdAt = now;
    }
    if (this.updatedAt == null) {
      this.updatedAt = now;
    }
  }
  @PreUpdate
  protected void onUpdate() {
    this.updatedAt = Instant.now();
  }
}