package com.ada.app.modules.backup.entity;
import com.ada.app.modules.backup.enums.BackupFrequency;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalTime;
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
@Table(name = "\"backupSchedules\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BackupSchedule {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @Column(name = "\"isEnabled\"", nullable = false)
  @Builder.Default
  private Boolean isEnabled = true;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"frequency\"", nullable = false, columnDefinition = "\"backupFrequency\"")
  @Builder.Default
  private BackupFrequency frequency = BackupFrequency.daily;
  @Column(name = "\"timeOfDay\"", nullable = false)
  @Builder.Default
  private LocalTime timeOfDay = LocalTime.of(2, 0);
  @Column(name = "\"dayOfWeek\"")
  private Short dayOfWeek;
  @Column(name = "\"dayOfMonth\"")
  private Short dayOfMonth;
}