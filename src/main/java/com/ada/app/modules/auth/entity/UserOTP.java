package com.ada.app.modules.auth.entity;
import com.ada.app.modules.auth.enums.OTPPurpose;
import com.ada.app.modules.user.entity.User;
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
@Table(name = "\"userOTPs\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserOTP {
  @Id
  @UuidGenerator(style = UuidGenerator.Style.TIME)
  @Column(name = "\"id\"", updatable = false, nullable = false)
  private UUID id;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"userId\"", nullable = false)
  private User user;
  @Column(name = "\"codeHash\"", nullable = false)
  private String codeHash;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"purpose\"", nullable = false, columnDefinition = "\"otpPurpose\"")
  private OTPPurpose purpose;
  @Column(name = "\"expiresAt\"", nullable = false)
  private Instant expiresAt;
  @Column(name = "\"usedAt\"")
  private Instant usedAt;
  @Column(name = "\"createdAt\"", nullable = false, updatable = false)
  private Instant createdAt;
  @PrePersist
  protected void onCreate() {
    if (this.createdAt == null) {
      this.createdAt = Instant.now();
    }
  }
}