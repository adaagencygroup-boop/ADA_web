package com.ada.app.modules.recruitment.dto;

import com.ada.app.modules.recruitment.enums.CandidateStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CandidateRespondAdminRequest(
  @NotNull(message = "Trạng thái không được để trống")
  CandidateStatus status,

  @NotBlank(message = "Nội dung phản hồi không được để trống")
  String feedbackContent,

  String feedbackAttachmentURL
) {}
