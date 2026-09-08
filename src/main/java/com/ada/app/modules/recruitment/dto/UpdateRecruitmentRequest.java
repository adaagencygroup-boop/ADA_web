package com.ada.app.modules.recruitment.dto;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
public record UpdateRecruitmentRequest(
  @Size(max = 150, message = "Job Title Cannot Exceed 150 Chars")
  String jobTitle,
  UUID departmentId,
  @Size(max = 100, message = "Location Cannot Exceed 100 Chars")
  String location,
  EmploymentType employmentType,
  @Size(max = 100, message = "Working Hours Cannot Exceed 100 Chars")
  String workingHours,
  String description,
  String requirements,
  String benefits,
  String coverImageURL,
  RecruitmentStatus status,
  BigDecimal minSalary,
  BigDecimal maxSalary,
  Boolean isNegotiable,
  Integer requiredCandidateNum,
  Instant expiresAt
) {}