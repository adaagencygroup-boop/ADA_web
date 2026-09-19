package com.ada.app.modules.recruitment.dto;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
public record CreateRecruitmentRequest(
  @NotBlank(message = "Vui lòng nhập vị trí tuyển dụng")
  @Size(max = 150, message = "Vị trí tuyển dụng không được vượt quá 150 ký tự")
  String jobTitle,
  @NotNull(message = "Vui lòng chọn phòng ban")
  UUID departmentId,
  @NotBlank(message = "Vui lòng nhập địa điểm làm việc")
  @Size(max = 100, message = "Địa điểm không được vượt quá 100 ký tự")
  String location,
  @NotNull(message = "Vui lòng chọn hình thức làm việc")
  EmploymentType employmentType,
  @NotBlank(message = "Vui lòng chọn thời gian làm việc")
  @Size(max = 100, message = "Thời gian làm việc không được vượt quá 100 ký tự")
  String workingHours,
  @NotBlank(message = "Vui lòng nhập mô tả công việc")
  String description,
  @NotBlank(message = "Vui lòng nhập yêu cầu ứng viên")
  String requirements,
  @NotBlank(message = "Vui lòng nhập quyền lợi được hưởng")
  String benefits,
  String coverImageURL,
  RecruitmentStatus status,
  BigDecimal minSalary,
  BigDecimal maxSalary,
  Boolean isNegotiable,
  @NotNull(message = "Vui lòng nhập số lượng cần tuyển")
  @Positive(message = "Số lượng tuyển dụng phải là số nguyên lớn hơn 0")
  Integer requiredCandidateNum,
  @FutureOrPresent(message = "Ngày hết hạn không được ở trong quá khứ")
  Instant expiresAt
) {}