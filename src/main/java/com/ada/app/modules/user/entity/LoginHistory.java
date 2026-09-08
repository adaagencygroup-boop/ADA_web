package com.ada.app.modules.user.entity;
import com.ada.app.modules.auth.entity.UserSession;
import com.ada.app.modules.user.enums.LoginStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "\"loginHistories\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginHistory {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"userId\"", nullable = false)
  private User user;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"sessionId\"")
  private UserSession session;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"deviceId\"")
  private UserDevice device;
  @Column(name = "\"IPAddress\"", length = 45)
  private String IPAddress;
  @Column(name = "\"geoCountry\"", length = 64)
  private String geoCountry;
  @Column(name = "\"geoCity\"", length = 128)
  private String geoCity;
  @Column(name = "\"isNewIP\"", nullable = false)
  @Builder.Default
  private Boolean isNewIP = false;
  @Column(name = "\"userAgent\"")
  private String userAgent;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"status\"", nullable = false, columnDefinition = "\"loginStatus\"")
  private LoginStatus status;
  @Column(name = "\"failureReason\"", length = 128)
  private String failureReason;
  @Column(name = "\"createdAt\"", nullable = false, updatable = false)
  private Instant createdAt;
  @PrePersist
  protected void onCreate() {
    if (this.createdAt == null) {
      this.createdAt = Instant.now();
    }
  }
}