package com.ada.app.modules.user.entity;
import com.ada.app.modules.user.enums.DeviceStatus;
import com.ada.app.modules.user.enums.DeviceType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;
@Entity
@Table(name = "\"userDevices\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDevice {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"userId\"", nullable = false)
  private User user;
  @Column(name = "\"deviceFingerprint\"", nullable = false)
  private String deviceFingerprint;
  @Column(name = "\"deviceName\"", length = 128)
  private String deviceName;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"deviceType\"", nullable = false, columnDefinition = "\"deviceType\"")
  private DeviceType deviceType;
  @Column(name = "\"OS\"", length = 64)
  private String OS;
  @Column(name = "\"browser\"", length = 64)
  private String browser;
  @Column(name = "\"firstSeenAt\"", nullable = false, updatable = false)
  private Instant firstSeenAt;
  @Column(name = "\"lastSeenAt\"", nullable = false)
  private Instant lastSeenAt;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"status\"", nullable = false, columnDefinition = "\"deviceStatus\"")
  @Builder.Default
  private DeviceStatus status = DeviceStatus.active;
  @PrePersist
  protected void onCreate() {
    Instant now = Instant.now();
    if (this.firstSeenAt == null) {
      this.firstSeenAt = now;
    }
    if (this.lastSeenAt == null || this.lastSeenAt.isBefore(this.firstSeenAt)) {
      this.lastSeenAt = this.firstSeenAt;
    }
  }
  @PreUpdate
  protected void onUpdate() {
    this.lastSeenAt = Instant.now();
  }
}