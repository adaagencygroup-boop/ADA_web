package com.ada.app.modules.recruitment.entity;
import com.ada.app.common.model.BaseEntity;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
import com.ada.app.modules.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
@Entity
@Table(name = "\"recruitments\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recruitment extends BaseEntity {
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"recruiterId\"")
  private User recruiter;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"departmentId\"")
  private Department department;
  @Column(name = "\"jobTitle\"", nullable = false, length = 150)
  private String jobTitle;
  @Column(name = "\"slug\"", nullable = false, unique = true, length = 255)
  private String slug;
  @Column(name = "\"location\"", length = 100)
  private String location;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"employmentType\"", nullable = false, columnDefinition = "\"employmentType\"")
  private EmploymentType employmentType;
  @Column(name = "\"workingHours\"", length = 100)
  private String workingHours;
  @Column(name = "\"description\"", columnDefinition = "TEXT")
  private String description;
  @Column(name = "\"requirements\"", columnDefinition = "TEXT")
  private String requirements;
  @Column(name = "\"benefits\"", columnDefinition = "TEXT")
  private String benefits;
  @Column(name = "\"coverImageURL\"")
  private String coverImageURL;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"status\"", nullable = false, columnDefinition = "\"recruitmentStatus\"")
  @Builder.Default
  private RecruitmentStatus status = RecruitmentStatus.draft;
  @Column(name = "\"minSalary\"", precision = 12, scale = 2)
  private BigDecimal minSalary;
  @Column(name = "\"maxSalary\"", precision = 12, scale = 2)
  private BigDecimal maxSalary;
  @Column(name = "\"isNegotiable\"", nullable = false)
  @Builder.Default
  private Boolean isNegotiable = false;
  @Column(name = "\"requiredCandidateNum\"", nullable = false)
  @Builder.Default
  private Integer requiredCandidateNum = 1;
  @Column(name = "\"viewCount\"", nullable = false)
  @Builder.Default
  private Integer viewCount = 0;
  @Column(name = "\"expiresAt\"")
  private Instant expiresAt;
}