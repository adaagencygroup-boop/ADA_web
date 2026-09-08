package com.ada.app.modules.backup.entity;
import com.ada.app.modules.backup.enums.BackupStatus;
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
@Table(name = "\"backupHistories\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BackupHistory {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @Column(name = "\"fileURL\"")
  private String fileURL;
  @Column(name = "\"fileSizeBytes\"")
  private Long fileSizeBytes;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"status\"", nullable = false, columnDefinition = "\"backupStatus\"")
  @Builder.Default
  private BackupStatus status = BackupStatus.pending;
  @Column(name = "\"errorMessage\"", columnDefinition = "TEXT")
  private String errorMessage;
  @Column(name = "\"startedAt\"", nullable = false, updatable = false)
  private Instant startedAt;
  @Column(name = "\"finishedAt\"")
  private Instant finishedAt;
  @PrePersist
  protected void onCreate() {
    if (this.startedAt == null) {
      this.startedAt = Instant.now();
    }
  }
}