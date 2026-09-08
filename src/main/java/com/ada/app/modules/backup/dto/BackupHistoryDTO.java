package com.ada.app.modules.backup.dto;
import com.ada.app.modules.backup.enums.BackupStatus;
import java.time.Instant;
import java.util.UUID;
public record BackupHistoryDTO(
  UUID id,
  String fileURL,
  Long fileSizeBytes,
  BackupStatus status,
  String errorMessage,
  Instant startedAt,
  Instant finishedAt
) {}