package com.ada.app.modules.backup.dto;
import com.ada.app.modules.backup.enums.BackupFrequency;
import jakarta.validation.constraints.NotBlank;
import java.util.UUID;
public record UpdateBackupScheduleRequest(
  Boolean isEnabled,
  @NotBlank(message = "Frequency Is Required")
  String frequency,
  @NotBlank(message = "Time Of Day Is Required (HH:mm:ss)")
  String timeOfDay,
  Short dayOfWeek,
  Short dayOfMonth
) {}