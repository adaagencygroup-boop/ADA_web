package com.ada.app.modules.contact.dto;
import jakarta.validation.constraints.NotBlank;
public record ContactRespondAdminRequest(
  @NotBlank(message = "Feedback Content Is Required")
  String feedbackContent,
  String feedbackAttachmentURL
) {}