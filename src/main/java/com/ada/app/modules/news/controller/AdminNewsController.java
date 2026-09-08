package com.ada.app.modules.news.controller;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.util.FileUtils;
import com.ada.app.modules.news.dto.CategoryResponse;
import com.ada.app.modules.news.dto.CreateCategoryRequest;
import com.ada.app.modules.news.dto.CreateNewsAdminRequest;
import com.ada.app.modules.news.dto.NewsResponse;
import com.ada.app.modules.news.dto.UpdateCategoryRequest;
import com.ada.app.modules.news.dto.UpdateNewsRequest;
import com.ada.app.modules.news.enums.NewsStatus;
import com.ada.app.modules.news.service.NewsService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminNewsController {
  private final NewsService newsService;
  private final FileUtils fileUtils;
  @GetMapping("/news")
  public ResponseEntity<APIResponse<PageResponse<NewsResponse>>> getNews(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) NewsStatus status,
    @RequestParam(required = false) UUID categoryId,
    @RequestParam(required = false) Boolean isFeatured,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    return ResponseEntity.ok(APIResponse.ok("News Articles Retrieved Successfully", newsService.getAdminNews(page, size, status, categoryId, isFeatured, search, fromDate, toDate)));
  }
  @GetMapping("/news/exportExcel")
  public ResponseEntity<byte[]> exportNewsExcel(
    @RequestParam(required = false) NewsStatus status,
    @RequestParam(required = false) UUID categoryId,
    @RequestParam(required = false) Boolean isFeatured,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    byte[] excelBytes = newsService.exportNewsExcel(status, categoryId, isFeatured, search, fromDate, toDate);
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=news.xlsx")
      .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
      .body(excelBytes);
  }
  @GetMapping("/news/{id}")
  public ResponseEntity<APIResponse<NewsResponse>> getNewsById(@PathVariable UUID id) {
    return ResponseEntity.ok(APIResponse.ok("News Article Retrieved Successfully", newsService.getAdminNewsById(id)));
  }
  @PostMapping("/news")
  public ResponseEntity<APIResponse<NewsResponse>> createNews(@Valid @RequestBody CreateNewsAdminRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(APIResponse.created("News Article Created Successfully", newsService.createNews(request)));
  }
  @PutMapping("/news/{id}")
  public ResponseEntity<APIResponse<NewsResponse>> updateNews(@PathVariable UUID id, @Valid @RequestBody UpdateNewsRequest request) {
    return ResponseEntity.ok(APIResponse.ok("News Article Updated Successfully", newsService.updateNews(id, request)));
  }
  @DeleteMapping("/news/{id}")
  public ResponseEntity<APIResponse<Void>> deleteNews(@PathVariable UUID id) {
    newsService.deleteNews(id);
    return ResponseEntity.ok(APIResponse.ok("News Article Deleted Successfully", null));
  }
  @GetMapping({"/newsCategories", "/news-categories"})
  public ResponseEntity<APIResponse<List<CategoryResponse>>> getCategories(@RequestParam(required = false) String search) {
    return ResponseEntity.ok(APIResponse.ok("Categories Retrieved Successfully", newsService.getAdminCategories(search)));
  }
  @PostMapping({"/newsCategories", "/news-categories"})
  public ResponseEntity<APIResponse<CategoryResponse>> createCategory(@Valid @RequestBody CreateCategoryRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(APIResponse.created("Category Created Successfully", newsService.createCategory(request)));
  }
  @PutMapping({"/newsCategories/{id}", "/news-categories/{id}"})
  public ResponseEntity<APIResponse<CategoryResponse>> updateCategory(@PathVariable UUID id, @Valid @RequestBody UpdateCategoryRequest request) {
    return ResponseEntity.ok(APIResponse.ok("Category Updated Successfully", newsService.updateCategory(id, request)));
  }
  @DeleteMapping({"/newsCategories/{id}", "/news-categories/{id}"})
  public ResponseEntity<APIResponse<Void>> deleteCategory(@PathVariable UUID id) {
    newsService.deleteCategory(id);
    return ResponseEntity.ok(APIResponse.ok("Category Deleted Successfully", null));
  }
  @PostMapping("/media/upload")
  public ResponseEntity<APIResponse<Map<String, Object>>> uploadMedia(@RequestParam("file") MultipartFile file) {
    try {
      String fileURL = fileUtils.uploadFile(file, "media");
      String mimeType = file.getContentType();
      if (mimeType == null || mimeType.isBlank()) {
        mimeType = fileUtils.detectMIMEType(file.getBytes());
      }
      return ResponseEntity.ok(APIResponse.ok("File Uploaded Successfully", Map.of(
        "fileURL", fileURL,
        "fileSizeBytes", file.getSize(),
        "mimeType", mimeType != null ? mimeType : "application/octet-stream",
        "uploadedAt", Instant.now()
      )));
    } catch (IOException e) {
      throw AppException.badRequest("Failed To Read Uploaded File: " + e.getMessage());
    }
  }
}