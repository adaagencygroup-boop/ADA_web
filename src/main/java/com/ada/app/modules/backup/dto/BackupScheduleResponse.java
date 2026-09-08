package com.ada.app.modules.backup.dto;
import com.ada.app.modules.backup.enums.BackupFrequency;
import java.time.LocalTime;
import java.util.UUID;
public record BackupScheduleResponse(
  UUID id,
  Boolean isEnabled,
  BackupFrequency frequency,
  LocalTime timeOfDay,
  Short dayOfWeek,
  Short dayOfMonth
) {}