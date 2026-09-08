package com.ada.app.modules.contact.dto;
import com.ada.app.modules.contact.enums.ContactStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;
import java.util.UUID;
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ContactResponse(
  UUID id,
  String customerFullname,
  String customerPhone,
  String customerEmail,
  String message,
  ContactStatus status,
  String feedbackContent,
  String feedbackAttachmentURL,
  Instant feedbackSentAt,
  String note,
  Instant createdAt,
  Instant updatedAt
) {}