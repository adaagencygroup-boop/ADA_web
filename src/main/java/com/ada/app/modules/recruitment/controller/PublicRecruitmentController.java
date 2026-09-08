package com.ada.app.modules.recruitment.controller;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.util.FileUtils;
import com.ada.app.modules.recruitment.dto.ApplyCandidateRequest;
import com.ada.app.modules.recruitment.dto.PublicDepartmentResponse;
import com.ada.app.modules.recruitment.dto.RecruitmentResponse;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.service.RecruitmentService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
@RestController
@RequestMapping("/api/v1/public")
@RequiredArgsConstructor
public class PublicRecruitmentController {
  private final RecruitmentService recruitmentService;
  private final FileUtils fileUtils;
  @GetMapping("/recruitments")
  public ResponseEntity<APIResponse<PageResponse<RecruitmentResponse>>> getPublicRecruitments(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) UUID departmentId,
    @RequestParam(required = false) EmploymentType employmentType,
    @RequestParam(required = false) String location,
    @RequestParam(required = false) String search
  ) {
    return ResponseEntity.ok(APIResponse.ok("Recruitments Retrieved Successfully", recruitmentService.getPublicRecruitments(page, size, departmentId, employmentType, location, search)));
  }
  @GetMapping("/recruitments/{slug}")
  public ResponseEntity<APIResponse<RecruitmentResponse>> getRecruitmentBySlug(@PathVariable String slug) {
    return ResponseEntity.ok(APIResponse.ok("Recruitment Retrieved Successfully", recruitmentService.getPublicRecruitmentBySlug(slug)));
  }
  @GetMapping({"/departments", "/recruitments/departments"})
  public ResponseEntity<APIResponse<List<PublicDepartmentResponse>>> getDepartments() {
    return ResponseEntity.ok(APIResponse.ok("Departments Retrieved Successfully", recruitmentService.getPublicDepartments()));
  }
  @GetMapping({"/employmentTypes", "/employment-types", "/recruitments/employment-types"})
  public ResponseEntity<APIResponse<List<EmploymentType>>> getEmploymentTypes() {
    return ResponseEntity.ok(APIResponse.ok("Employment Types Retrieved Successfully", recruitmentService.getEmploymentTypes()));
  }
  @PostMapping({"/candidates/uploadResume", "/candidates/upload-resume", "/recruitments/upload-resume"})
  public ResponseEntity<APIResponse<Map<String, Object>>> uploadResume(@RequestParam("file") MultipartFile file) {
    try {
      String resumeURL = fileUtils.uploadFile(file, "resumes");
      String mimeType = file.getContentType();
      if (mimeType == null || mimeType.isBlank()) {
        mimeType = fileUtils.detectMIMEType(file.getBytes());
      }
      return ResponseEntity.ok(APIResponse.ok("Resume Uploaded Successfully", Map.of(
        "resumeURL", resumeURL,
        "fileSizeBytes", file.getSize(),
        "mimeType", mimeType != null ? mimeType : "application/pdf",
        "uploadedAt", Instant.now()
      )));
    } catch (IOException e) {
      throw AppException.badRequest("Failed To Read Resume File: " + e.getMessage());
    }
  }
  @PostMapping("/candidates")
  public ResponseEntity<APIResponse<Void>> applyCandidate(@Valid @RequestBody ApplyCandidateRequest request) {
    recruitmentService.applyCandidate(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(APIResponse.created("Application Submitted Successfully", null));
  }
  @PostMapping(value = "/recruitments/{id}/apply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<APIResponse<Void>> applyJob(
    @PathVariable UUID id,
    @RequestParam("fullname") String fullname,
    @RequestParam("email") String email,
    @RequestParam(value = "phone", required = false) String phone,
    @RequestParam(value = "message", required = false) String message,
    @RequestParam("resume") MultipartFile resume
  ) {
    recruitmentService.applyJob(id, fullname, email, phone, message, resume);
    return ResponseEntity.status(HttpStatus.CREATED).body(APIResponse.created("Application Submitted Successfully", null));
  }
}