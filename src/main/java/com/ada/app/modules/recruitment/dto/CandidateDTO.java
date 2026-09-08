package com.ada.app.modules.recruitment.dto;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;
import java.util.UUID;
@JsonInclude(JsonInclude.Include.NON_NULL)
public record CandidateDTO(
  UUID id,
  UUID recruitmentId,
  String recruitmentTitle,
  String location,
  EmploymentType employmentType,
  String fullname,
  String email,
  String phone,
  String resumeURL,
  String message,
  String note,
  Instant appliedAt,
  Instant expiresAt,
  Instant createdAt,
  Instant updatedAt
) {}