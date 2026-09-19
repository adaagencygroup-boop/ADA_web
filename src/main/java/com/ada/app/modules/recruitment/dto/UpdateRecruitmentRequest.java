package com.ada.app.modules.recruitment.dto;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
public record UpdateRecruitmentRequest(
  @Size(max = 150, message = "Vị trí tuyển dụng không được vượt quá 150 ký tự")
  String jobTitle,
  UUID departmentId,
  @Size(max = 100, message = "Địa điểm không được vượt quá 100 ký tự")
  String location,
  EmploymentType employmentType,
  @Size(max = 100, message = "Thời gian làm việc không được vượt quá 100 ký tự")
  String workingHours,
  String description,
  String requirements,
  String benefits,
  String coverImageURL,
  RecruitmentStatus status,
  BigDecimal minSalary,
  BigDecimal maxSalary,
  Boolean isNegotiable,
  @Positive(message = "Số lượng tuyển dụng phải là số nguyên lớn hơn 0")
  Integer requiredCandidateNum,
  @FutureOrPresent(message = "Ngày hết hạn không được ở trong quá khứ")
  Instant expiresAt
) {}