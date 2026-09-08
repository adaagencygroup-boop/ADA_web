package com.ada.app.modules.backup.service;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.util.ExcelExportService;
import com.ada.app.modules.backup.dto.BackupHistoryDTO;
import com.ada.app.modules.backup.dto.BackupScheduleResponse;
import com.ada.app.modules.backup.dto.BackupTriggerResponse;
import com.ada.app.modules.backup.dto.UpdateBackupScheduleRequest;
import com.ada.app.modules.backup.entity.BackupHistory;
import com.ada.app.modules.backup.entity.BackupSchedule;
import com.ada.app.modules.backup.enums.BackupFrequency;
import com.ada.app.modules.backup.enums.BackupStatus;
import com.ada.app.modules.backup.repository.BackupHistoryRepository;
import com.ada.app.modules.backup.repository.BackupHistorySpecs;
import com.ada.app.modules.backup.repository.BackupScheduleRepository;
import com.ada.app.modules.notification.enums.NotificationType;
import com.ada.app.modules.notification.service.NotificationService;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class BackupService {
  private static final Logger log = LoggerFactory.getLogger(BackupService.class);
  private static final ZoneId SCHEDULE_ZONE = ZoneId.of("Asia/Ho_Chi_Minh");
  private final BackupScheduleRepository scheduleRepository;
  private final BackupHistoryRepository historyRepository;
  private final NotificationService notificationService;
  private final ExcelExportService excelExportService;
  @Value("${app.storage.path}")
  private String storagePath;
  @Value("${spring.datasource.url}")
  private String datasourceUrl;
  @Value("${spring.datasource.username}")
  private String dbUser;
  @Value("${spring.datasource.password}")
  private String dbPassword;
  @Transactional(readOnly = true)
  public BackupScheduleResponse getSchedule() {
    BackupSchedule s = scheduleRepository.findFirstByOrderByIdAsc()
      .orElseThrow(() -> AppException.notFound("Backup Schedule Not Found"));
    return new BackupScheduleResponse(s.getId(), s.getIsEnabled(), s.getFrequency(), s.getTimeOfDay(), s.getDayOfWeek(), s.getDayOfMonth());
  }
  @Transactional
  public BackupScheduleResponse updateSchedule(UpdateBackupScheduleRequest request) {
    if (request.frequency() == null || request.frequency().isBlank()) {
      throw AppException.badRequest("Backup Frequency Is Required");
    }
    BackupFrequency freq;
    try {
      freq = BackupFrequency.valueOf(request.frequency().trim().toLowerCase());
    } catch (IllegalArgumentException e) {
      throw AppException.badRequest("Invalid Backup Frequency: Must Be Daily, Weekly Or Monthly");
    }
    LocalTime parsedTime;
    try {
      parsedTime = LocalTime.parse(request.timeOfDay().trim());
    } catch (DateTimeParseException e) {
      throw AppException.badRequest("Invalid Time Format (Must Be HH:mm:ss): " + request.timeOfDay());
    }
    if (freq == BackupFrequency.daily) {
      if (request.dayOfWeek() != null || request.dayOfMonth() != null) {
        throw AppException.badRequest("Daily Backup Schedule Must Not Specify Day Of Week Or Day Of Month");
      }
    } else if (freq == BackupFrequency.weekly) {
      if (request.dayOfWeek() == null || request.dayOfWeek() < 0 || request.dayOfWeek() > 6) {
        throw AppException.badRequest("Weekly Backup Schedule Requires Day Of Week Between Sunday And Saturday");
      }
      if (request.dayOfMonth() != null) {
        throw AppException.badRequest("Weekly Backup Schedule Must Not Specify Day Of Month");
      }
    } else if (freq == BackupFrequency.monthly) {
      if (request.dayOfMonth() == null || request.dayOfMonth() < 1 || request.dayOfMonth() > 31) {
        throw AppException.badRequest("Monthly Backup Schedule Requires Day Of Month Between 1 And 31");
      }
      if (request.dayOfWeek() != null) {
        throw AppException.badRequest("Monthly Backup Schedule Must Not Specify Day Of Week");
      }
    }
    BackupSchedule s = scheduleRepository.findFirstByOrderByIdAsc()
      .orElseGet(() -> BackupSchedule.builder().build());
    if (request.isEnabled() != null) {
      s.setIsEnabled(request.isEnabled());
    }
    s.setFrequency(freq);
    s.setTimeOfDay(parsedTime);
    s.setDayOfWeek(request.dayOfWeek());
    s.setDayOfMonth(request.dayOfMonth());
    s = scheduleRepository.save(s);
    return new BackupScheduleResponse(s.getId(), s.getIsEnabled(), s.getFrequency(), s.getTimeOfDay(), s.getDayOfWeek(), s.getDayOfMonth());
  }
  @Transactional
  public BackupTriggerResponse triggerBackup() {
    String filename = "backup" + Instant.now().toEpochMilli() + ".zip";
    BackupHistory history = BackupHistory.builder()
      .fileURL(filename)
      .fileSizeBytes(0L)
      .status(BackupStatus.running)
      .build();
    history = historyRepository.save(history);
    final UUID historyId = history.getId();
    CompletableFuture.runAsync(() -> executeBackup(historyId, filename));
    return new BackupTriggerResponse(history.getId(), "running", "Backup Triggered In Background");
  }
  @Scheduled(cron = "0 * * * * *")
  public void runScheduledBackup() {
    scheduleRepository.findFirstByOrderByIdAsc().ifPresent(s -> {
      if (!Boolean.TRUE.equals(s.getIsEnabled())) {
        return;
      }
      LocalTime nowTime = LocalTime.now(SCHEDULE_ZONE).truncatedTo(ChronoUnit.MINUTES);
      LocalTime scheduleTime = s.getTimeOfDay().truncatedTo(ChronoUnit.MINUTES);
      if (!nowTime.equals(scheduleTime)) {
        return;
      }
      LocalDate today = LocalDate.now(SCHEDULE_ZONE);
      if (s.getFrequency() == BackupFrequency.weekly) {
        int currentDayOfWeek = today.getDayOfWeek().getValue() % 7;
        if (s.getDayOfWeek() == null || currentDayOfWeek != s.getDayOfWeek()) {
          return;
        }
      } else if (s.getFrequency() == BackupFrequency.monthly) {
        if (s.getDayOfMonth() == null) {
          return;
        }
        int targetDay = Math.min((int) s.getDayOfMonth(), today.lengthOfMonth());
        if (today.getDayOfMonth() != targetDay) {
          return;
        }
      }
      log.info("Triggering Scheduled Automated Backup For Schedule: {}", s.getId());
      triggerBackup();
    });
  }
  @Transactional(readOnly = true)
  public PageResponse<BackupHistoryDTO> getHistory(int page, int size, BackupStatus status, String search, Instant fromDate, Instant toDate) {
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("startedAt").descending());
    Page<BackupHistory> result = historyRepository.findAll(BackupHistorySpecs.filter(status, search, fromDate, toDate), pageable);
    List<BackupHistoryDTO> items = result.getContent().stream()
      .map(h -> new BackupHistoryDTO(h.getId(), h.getFileURL(), h.getFileSizeBytes(), h.getStatus(), h.getErrorMessage(), h.getStartedAt(), h.getFinishedAt()))
      .toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional(readOnly = true)
  public File getBackupFile(UUID id) {
    BackupHistory history = historyRepository.findById(id).orElseThrow(() -> AppException.notFound("Backup Record Not Found"));
    if (history.getFileURL() == null) {
      throw AppException.notFound("Backup File Location Not Recorded");
    }
    String fileURL = history.getFileURL();
    Path path = Paths.get(storagePath, "backups", fileURL);
    File file = path.toFile();
    if (!file.exists() && !fileURL.toLowerCase().endsWith(".zip")) {
      File zipFile = Paths.get(storagePath, "backups", fileURL + ".zip").toFile();
      if (zipFile.exists()) {
        return zipFile;
      }
    }
    if (!file.exists()) {
      throw AppException.notFound("Backup File Not Found On Disk");
    }
    return file;
  }
  private void executeBackup(UUID historyId, String filename) {
    Path storageDir = Paths.get(storagePath);
    Path backupDir = storageDir.resolve("backups");
    try {
      if (!Files.exists(backupDir)) {
        Files.createDirectories(backupDir);
      }
      File rawSql = backupDir.resolve("temp" + historyId + ".sql").toFile();
      File zipFile = backupDir.resolve(filename).toFile();
      URI uri = URI.create(datasourceUrl.startsWith("jdbc:") ? datasourceUrl.substring(5) : datasourceUrl);
      String host = uri.getHost();
      int port = uri.getPort() > 0 ? uri.getPort() : 5432;
      String path = uri.getPath();
      String dbName = path != null && path.startsWith("/") ? path.substring(1) : path;
      ProcessBuilder pb = new ProcessBuilder(
        "pg_dump",
        "-h", host,
        "-p", String.valueOf(port),
        "-U", dbUser,
        "-d", dbName,
        "-f", rawSql.getAbsolutePath()
      );
      pb.environment().put("PGPASSWORD", dbPassword);
      Process process = pb.start();
      int exitCode = process.waitFor();
      if (exitCode == 0 && rawSql.exists()) {
        try (FileOutputStream fos = new FileOutputStream(zipFile);
             ZipOutputStream zos = new ZipOutputStream(fos)) {
          addFileToZip(rawSql, "database.sql", zos);
          Path mediaDir = storageDir.resolve("media");
          if (Files.exists(mediaDir)) {
            addDirectoryToZip(mediaDir.toFile(), "media", zos);
          }
          Path resumesDir = storageDir.resolve("resumes");
          if (Files.exists(resumesDir)) {
            addDirectoryToZip(resumesDir.toFile(), "resumes", zos);
          }
        }
        if (!rawSql.delete()) {
          log.warn("Could Not Delete Temporary Backup File: {}", rawSql.getAbsolutePath());
        }
        updateBackupStatus(historyId, BackupStatus.success, zipFile.length(), null);
      } else {
        updateBackupStatus(historyId, BackupStatus.failed, 0L, "pg_dump Failed With Exit Code " + exitCode);
      }
      purgeOldBackups();
    } catch (Exception e) {
      updateBackupStatus(historyId, BackupStatus.failed, 0L, "Error: " + e.getMessage());
    }
  }
  private void addFileToZip(File file, String entryName, ZipOutputStream zos) throws IOException {
    try (FileInputStream fis = new FileInputStream(file)) {
      ZipEntry zipEntry = new ZipEntry(entryName);
      zos.putNextEntry(zipEntry);
      byte[] buffer = new byte[8192];
      int length;
      while ((length = fis.read(buffer)) >= 0) {
        zos.write(buffer, 0, length);
      }
      zos.closeEntry();
    }
  }
  private void addDirectoryToZip(File folder, String parentFolder, ZipOutputStream zos) throws IOException {
    File[] files = folder.listFiles();
    if (files == null) {
      return;
    }
    for (File file : files) {
      String entryName = parentFolder + "/" + file.getName();
      if (file.isDirectory()) {
        addDirectoryToZip(file, entryName, zos);
      } else {
        addFileToZip(file, entryName, zos);
      }
    }
  }
  private void updateBackupStatus(UUID id, BackupStatus status, Long size, String errorMessage) {
    historyRepository.findById(id).ifPresent(h -> {
      h.setStatus(status);
      h.setFileSizeBytes(size);
      h.setErrorMessage(errorMessage);
      h.setFinishedAt(Instant.now());
      historyRepository.save(h);
      notificationService.createAndBroadcast(
        status == BackupStatus.success ? "Bản Sao Lưu Hoàn Tất" : "Sao Lưu Dữ Liệu Thất Bại",
        errorMessage != null ? "Sao Lưu Dữ Liệu Không Thành Công: " + errorMessage : "Sao Lưu Dữ Liệu Hệ Thống Hoàn Tất",
        NotificationType.system
      );
    });
  }
  private void purgeOldBackups() {
    try {
      Path backupDir = Paths.get(storagePath, "backups");
      if (Files.exists(backupDir)) {
        Instant cutoff = Instant.now().minus(30, ChronoUnit.DAYS);
        try (var stream = Files.list(backupDir)) {
          stream.forEach(p -> {
            try {
              if (Files.getLastModifiedTime(p).toInstant().isBefore(cutoff)) {
                Files.deleteIfExists(p);
              }
            } catch (IOException e) {
              log.warn("Failed To Delete Old Backup File {}: {}", p, e.getMessage());
            }
          });
        }
      }
    } catch (Exception e) {
      log.warn("Failed To Purge Old Backups: {}", e.getMessage());
    }
  }
  @Transactional(readOnly = true)
  public byte[] exportBackupHistoriesExcel(BackupStatus status, String search, Instant fromDate, Instant toDate) {
    List<BackupHistory> list = historyRepository.findAll(BackupHistorySpecs.filter(status, search, fromDate, toDate), Sort.by("startedAt").descending());
    List<String> headers = List.of("ID", "File URL", "File Size", "Status", "Error Message", "Started At", "Finished At");
    List<List<Object>> rows = new ArrayList<>();
    for (BackupHistory b : list) {
      rows.add(List.of(
        b.getId().toString(),
        b.getFileURL() != null ? b.getFileURL() : "",
        b.getFileSizeBytes() != null ? b.getFileSizeBytes() : 0,
        b.getStatus().name(),
        b.getErrorMessage() != null ? b.getErrorMessage() : "",
        b.getStartedAt() != null ? b.getStartedAt().toString() : "",
        b.getFinishedAt() != null ? b.getFinishedAt().toString() : ""
      ));
    }
    return excelExportService.exportToExcel("Backup Histories", headers, rows);
  }
}