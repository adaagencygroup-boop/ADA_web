package com.ada.app.functional;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.backup.controller.AdminSettingsController;
import com.ada.app.modules.backup.dto.BackupHistoryDTO;
import com.ada.app.modules.backup.dto.BackupScheduleResponse;
import com.ada.app.modules.backup.dto.BackupTriggerResponse;
import com.ada.app.modules.backup.dto.UpdateBackupScheduleRequest;
import com.ada.app.modules.backup.enums.BackupFrequency;
import com.ada.app.modules.backup.enums.BackupStatus;
import com.ada.app.modules.backup.service.BackupService;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
public class AdminSettingsControllerFunctionalTest {
  private BackupService backupService;
  private AdminSettingsController adminSettingsController;
  @BeforeEach
  public void setUp() {
    backupService = Mockito.mock(BackupService.class);
    adminSettingsController = new AdminSettingsController(backupService);
  }
  @Test
  public void testBackupScheduleEndpoints() {
    UUID scheduleId = UUID.randomUUID();
    BackupScheduleResponse schedule = new BackupScheduleResponse(scheduleId, true, BackupFrequency.daily, LocalTime.of(2, 0), null, null);
    Mockito.when(backupService.getSchedule()).thenReturn(schedule);
    ResponseEntity<APIResponse<BackupScheduleResponse>> getResp = adminSettingsController.getBackupSchedule();
    Assertions.assertEquals(200, getResp.getStatusCode().value());
    Assertions.assertEquals(BackupFrequency.daily, getResp.getBody().data().frequency());
    UpdateBackupScheduleRequest updateReq = new UpdateBackupScheduleRequest(true, "weekly", "03:00:00", (short) 0, null);
    BackupScheduleResponse updatedSchedule = new BackupScheduleResponse(scheduleId, true, BackupFrequency.weekly, LocalTime.of(3, 0), (short) 0, null);
    Mockito.when(backupService.updateSchedule(updateReq)).thenReturn(updatedSchedule);
    ResponseEntity<APIResponse<BackupScheduleResponse>> updateResp = adminSettingsController.updateBackupSchedule(updateReq);
    Assertions.assertEquals(200, updateResp.getStatusCode().value());
    Assertions.assertEquals(BackupFrequency.weekly, updateResp.getBody().data().frequency());
  }
  @Test
  public void testTriggerAndListBackupsEndpoints() {
    UUID backupId = UUID.randomUUID();
    BackupTriggerResponse triggerResp = new BackupTriggerResponse(backupId, "running", "Backup Triggered In Background");
    Mockito.when(backupService.triggerBackup()).thenReturn(triggerResp);
    ResponseEntity<APIResponse<BackupTriggerResponse>> triggerResult = adminSettingsController.triggerBackup();
    Assertions.assertEquals(202, triggerResult.getStatusCode().value());
    Assertions.assertEquals("running", triggerResult.getBody().data().status());
    BackupHistoryDTO historyDTO = new BackupHistoryDTO(backupId, "backup" + Instant.now().toEpochMilli() + ".zip", 10485760L, BackupStatus.success, null, Instant.now(), Instant.now());
    PageResponse<BackupHistoryDTO> page = new PageResponse<>(List.of(historyDTO), new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(backupService.getHistory(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(page);
    ResponseEntity<APIResponse<PageResponse<BackupHistoryDTO>>> getHistoryResp = adminSettingsController.getBackups(1, 10, null, null, null, null);
    Assertions.assertEquals(200, getHistoryResp.getStatusCode().value());
    Assertions.assertEquals(1, getHistoryResp.getBody().data().items().size());
    byte[] excelBytes = new byte[]{0x50, 0x4B, 0x03, 0x04};
    Mockito.when(backupService.exportBackupHistoriesExcel(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(excelBytes);
    ResponseEntity<byte[]> exportResp = adminSettingsController.exportBackupHistoriesExcel(null, null, null, null);
    Assertions.assertEquals(200, exportResp.getStatusCode().value());
    Assertions.assertTrue(exportResp.getHeaders().getFirst(HttpHeaders.CONTENT_DISPOSITION).contains("backupHistories.xlsx"));
  }
  @Test
  public void testDownloadBackupFileEndpoint() throws IOException {
    UUID backupId = UUID.randomUUID();
    File tempFile = File.createTempFile("backup", ".zip");
    tempFile.deleteOnExit();
    try (FileOutputStream fos = new FileOutputStream(tempFile)) {
      fos.write(new byte[]{0x50, 0x4B, 0x03, 0x04});
    }
    Mockito.when(backupService.getBackupFile(backupId)).thenReturn(tempFile);
    ResponseEntity<InputStreamResource> downloadResp = adminSettingsController.downloadBackup(backupId);
    Assertions.assertEquals(200, downloadResp.getStatusCode().value());
    Assertions.assertNotNull(downloadResp.getBody());
    Assertions.assertTrue(downloadResp.getHeaders().getFirst(HttpHeaders.CONTENT_DISPOSITION).contains(tempFile.getName()));
  }
}