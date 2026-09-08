package com.ada.app.modules.backup.dto;
import java.util.UUID;
public record BackupTriggerResponse(
  UUID backupId,
  String status,
  String message
) {}