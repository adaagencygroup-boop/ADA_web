package com.ada.app.modules.recruitment.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
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
@Table(name = "\"candidates\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"recruitmentId\"", nullable = false)
  private Recruitment recruitment;
  @Column(name = "\"fullname\"", nullable = false, length = 150)
  private String fullname;
  @Column(name = "\"email\"", columnDefinition = "citext")
  private String email;
  @Column(name = "\"phone\"", length = 20)
  private String phone;
  @Column(name = "\"resumeURL\"")
  private String resumeURL;
  @Column(name = "\"message\"", columnDefinition = "TEXT")
  private String message;
  @Column(name = "\"note\"", columnDefinition = "TEXT")
  private String note;
  @Column(name = "\"appliedAt\"", nullable = false, updatable = false)
  private Instant appliedAt;
  @Column(name = "\"updatedAt\"", nullable = false)
  private Instant updatedAt;
  @PrePersist
  protected void onCreate() {
    Instant now = Instant.now();
    if (this.appliedAt == null) {
      this.appliedAt = now;
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