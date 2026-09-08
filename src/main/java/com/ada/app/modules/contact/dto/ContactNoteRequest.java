package com.ada.app.modules.contact.dto;
import jakarta.validation.constraints.NotNull;
public record ContactNoteRequest(
  @NotNull(message = "Note Cannot Be Null")
  String note
) {}