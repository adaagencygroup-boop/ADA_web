package com.ada.app.modules.user.entity;
import com.ada.app.common.model.BaseEntity;
import com.ada.app.modules.user.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
@Entity
@Table(name = "\"users\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
  @Column(name = "\"username\"", nullable = false, unique = true, length = 50)
  private String username;
  @Column(name = "\"fullname\"", nullable = false, length = 150)
  private String fullname;
  @Column(name = "\"email\"", nullable = false, unique = true, columnDefinition = "citext")
  private String email;
  @Column(name = "\"phone\"", length = 20)
  private String phone;
  @Column(name = "\"passwordHash\"", nullable = false)
  private String passwordHash;
  @Column(name = "\"emailVerifiedAt\"")
  private Instant emailVerifiedAt;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"role\"", nullable = false, columnDefinition = "\"userRole\"")
  @Builder.Default
  private UserRole role = UserRole.staff;
}