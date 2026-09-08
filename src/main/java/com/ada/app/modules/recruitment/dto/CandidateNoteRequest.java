package com.ada.app.modules.recruitment.dto;
import jakarta.validation.constraints.NotNull;
public record CandidateNoteRequest(
  @NotNull(message = "Note Cannot Be Null")
  String note
) {}