package com.ada.app.modules.notification.entity;
import com.ada.app.modules.notification.enums.NotificationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;
@Entity
@Table(name = "\"notifications\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @Column(name = "\"title\"", nullable = false, length = 255)
  private String title;
  @Column(name = "\"content\"", nullable = false, columnDefinition = "TEXT")
  private String content;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"type\"", nullable = false, columnDefinition = "\"notificationType\"")
  private NotificationType type;
  @Column(name = "\"createdAt\"", nullable = false, updatable = false)
  private Instant createdAt;
  @PrePersist
  protected void onCreate() {
    if (this.createdAt == null) {
      this.createdAt = Instant.now();
    }
  }
}