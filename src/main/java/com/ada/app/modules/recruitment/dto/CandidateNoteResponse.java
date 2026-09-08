package com.ada.app.modules.recruitment.dto;
import java.time.Instant;
import java.util.UUID;
public record CandidateNoteResponse(
  UUID id,
  String note,
  Instant updatedAt
) {}