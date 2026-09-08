package com.ada.app.modules.auth.entity;
import com.ada.app.modules.auth.enums.RevokedReason;
import com.ada.app.modules.auth.enums.SessionStatus;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.entity.UserDevice;
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
@Table(name = "\"userSessions\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSession {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"userId\"", nullable = false)
  private User user;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"deviceId\"")
  private UserDevice device;
  @Column(name = "\"refreshTokenHash\"", nullable = false)
  private String refreshTokenHash;
  @Column(name = "\"accessTokenJTI\"")
  private String accessTokenJTI;
  @Column(name = "\"tokenFamilyId\"", nullable = false)
  private String tokenFamilyId;
  @Column(name = "\"issuedIPAddress\"", length = 45)
  private String issuedIPAddress;
  @Column(name = "\"IPAddress\"", length = 45)
  private String IPAddress;
  @Column(name = "\"userAgent\"")
  private String userAgent;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"status\"", nullable = false, columnDefinition = "\"sessionStatus\"")
  @Builder.Default
  private SessionStatus status = SessionStatus.active;
  @Column(name = "\"issuedAt\"", nullable = false, updatable = false)
  private Instant issuedAt;
  @Column(name = "\"lastSeenAt\"", nullable = false)
  private Instant lastSeenAt;
  @Column(name = "\"expiresAt\"", nullable = false)
  private Instant expiresAt;
  @Column(name = "\"revokedAt\"")
  private Instant revokedAt;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"revokedReason\"", columnDefinition = "\"revokedReason\"")
  private RevokedReason revokedReason;
  @PrePersist
  protected void onCreate() {
    Instant now = Instant.now();
    if (this.issuedAt == null) {
      this.issuedAt = now;
    }
    if (this.lastSeenAt == null || this.lastSeenAt.isBefore(this.issuedAt)) {
      this.lastSeenAt = this.issuedAt;
    }
  }
  @PreUpdate
  protected void onUpdate() {
    this.lastSeenAt = Instant.now();
  }
}