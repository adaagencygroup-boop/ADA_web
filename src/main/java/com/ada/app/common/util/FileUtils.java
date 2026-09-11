package com.ada.app.common.util;
import com.ada.app.common.exception.AppException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
@Slf4j
@Component
public class FileUtils {
  @Value("${app.storage.path}")
  private String storagePath;
  @Value("${app.storage.publicUrl}")
  private String publicUrl;
  private final Tika tika = new Tika();
  @PostConstruct
  public void initStorage() {
    try {
      Files.createDirectories(Paths.get(storagePath, "media"));
      Files.createDirectories(Paths.get(storagePath, "resumes"));
      Files.createDirectories(Paths.get(storagePath, "backups"));
    } catch (IOException e) {
      log.error("Failed To Initialize Storage Directories: {}", e.getMessage(), e);
    }
  }
  public String uploadFile(MultipartFile file, String subDirectory) {
    if (file == null || file.isEmpty()) {
      throw AppException.badRequest("File Cannot Be Empty");
    }
    try {
      String originalFilename = file.getOriginalFilename();
      String extension = "";
      if (originalFilename != null && originalFilename.contains(".")) {
        extension = originalFilename.substring(originalFilename.lastIndexOf("."));
      }
      if (extension.isBlank()) {
        String mimeType = file.getContentType();
        if (mimeType == null || mimeType.isBlank()) {
          mimeType = detectMIMEType(file.getBytes());
        }
        extension = getExtensionFromMimeType(mimeType);
      }
      String filename = UUID.randomUUID() + extension;
      Path targetDir = Paths.get(storagePath, subDirectory);
      if (!Files.exists(targetDir)) {
        Files.createDirectories(targetDir);
      }
      Path targetPath = targetDir.resolve(filename);
      Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
      return "/files/" + subDirectory + "/" + filename;
    } catch (IOException e) {
      throw AppException.internal("Failed To Store File: " + e.getMessage());
    }
  }
  public String detectMIMEType(byte[] data) {
    return tika.detect(data);
  }
  public String getExtensionFromMimeType(String mimeType) {
    if (mimeType == null) return "";
    switch (mimeType.toLowerCase()) {
      case "application/pdf":
        return ".pdf";
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return ".docx";
      case "application/msword":
        return ".doc";
      case "image/jpeg":
        return ".jpg";
      case "image/png":
        return ".png";
      case "image/webp":
        return ".webp";
      default:
        return "";
    }
  }
}