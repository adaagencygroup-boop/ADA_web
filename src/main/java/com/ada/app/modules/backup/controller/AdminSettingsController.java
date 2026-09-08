package com.ada.app.modules.backup.controller;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.backup.dto.BackupHistoryDTO;
import com.ada.app.modules.backup.dto.BackupScheduleResponse;
import com.ada.app.modules.backup.dto.BackupTriggerResponse;
import com.ada.app.modules.backup.dto.UpdateBackupScheduleRequest;
import com.ada.app.modules.backup.enums.BackupStatus;
import com.ada.app.modules.backup.service.BackupService;
import jakarta.validation.Valid;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/admin/settings")
@RequiredArgsConstructor
public class AdminSettingsController {
  private final BackupService backupService;
  @GetMapping({"/backupSchedule", "/backup-schedule"})
  public ResponseEntity<APIResponse<BackupScheduleResponse>> getBackupSchedule() {
    return ResponseEntity.ok(APIResponse.ok("Backup Schedule Retrieved Successfully", backupService.getSchedule()));
  }
  @PutMapping({"/backupSchedule", "/backup-schedule"})
  public ResponseEntity<APIResponse<BackupScheduleResponse>> updateBackupSchedule(@Valid @RequestBody UpdateBackupScheduleRequest request) {
    return ResponseEntity.ok(APIResponse.ok("Backup Schedule Updated Successfully", backupService.updateSchedule(request)));
  }
  @PostMapping({"/backups/trigger", "/backups"})
  public ResponseEntity<APIResponse<BackupTriggerResponse>> triggerBackup() {
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(APIResponse.ok("Backup Triggered In Background", backupService.triggerBackup()));
  }
  @GetMapping("/backups")
  public ResponseEntity<APIResponse<PageResponse<BackupHistoryDTO>>> getBackups(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) BackupStatus status,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    return ResponseEntity.ok(APIResponse.ok("Backup Histories Retrieved Successfully", backupService.getHistory(page, size, status, search, fromDate, toDate)));
  }
  @GetMapping("/backups/exportExcel")
  public ResponseEntity<byte[]> exportBackupHistoriesExcel(
    @RequestParam(required = false) BackupStatus status,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    byte[] excelBytes = backupService.exportBackupHistoriesExcel(status, search, fromDate, toDate);
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=backupHistories.xlsx")
      .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
      .body(excelBytes);
  }
  @GetMapping("/backups/{id}/download")
  public ResponseEntity<InputStreamResource> downloadBackup(@PathVariable UUID id) throws IOException {
    File file = backupService.getBackupFile(id);
    String filename = file.getName();
    if (!filename.toLowerCase().endsWith(".zip")) {
      filename = filename + ".zip";
    }
    InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
      .contentType(MediaType.parseMediaType("application/zip"))
      .contentLength(file.length())
      .body(resource);
  }
}