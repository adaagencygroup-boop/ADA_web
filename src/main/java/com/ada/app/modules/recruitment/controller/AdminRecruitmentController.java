package com.ada.app.modules.recruitment.controller;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.recruitment.dto.CandidateDTO;
import com.ada.app.modules.recruitment.dto.CandidateNoteRequest;
import com.ada.app.modules.recruitment.dto.CandidateNoteResponse;
import com.ada.app.modules.recruitment.dto.CreateRecruitmentRequest;
import com.ada.app.modules.recruitment.dto.DashboardMetricsResponse;
import com.ada.app.modules.recruitment.dto.DepartmentRequest;
import com.ada.app.modules.recruitment.dto.DepartmentResponse;
import com.ada.app.modules.recruitment.dto.RecruitmentResponse;
import com.ada.app.modules.recruitment.dto.UpdateRecruitmentRequest;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
import com.ada.app.modules.recruitment.service.RecruitmentService;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminRecruitmentController {
  private final RecruitmentService recruitmentService;
  @GetMapping("/recruitments/dashboardMetrics")
  public ResponseEntity<APIResponse<DashboardMetricsResponse>> getDashboardMetrics() {
    return ResponseEntity.ok(APIResponse.ok("Metrics Retrieved Successfully", recruitmentService.getDashboardMetrics()));
  }
  @GetMapping("/recruitments")
  public ResponseEntity<APIResponse<PageResponse<RecruitmentResponse>>> getRecruitments(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) RecruitmentStatus status,
    @RequestParam(required = false) UUID departmentId,
    @RequestParam(required = false) EmploymentType employmentType,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    return ResponseEntity.ok(APIResponse.ok("Recruitments Retrieved Successfully", recruitmentService.getAdminRecruitments(page, size, status, departmentId, employmentType, null, null, null, search, fromDate, toDate)));
  }
  @GetMapping("/recruitments/exportExcel")
  public ResponseEntity<byte[]> exportRecruitmentsExcel(
    @RequestParam(required = false) RecruitmentStatus status,
    @RequestParam(required = false) UUID departmentId,
    @RequestParam(required = false) EmploymentType employmentType,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    byte[] excelBytes = recruitmentService.exportRecruitmentsExcel(status, departmentId, employmentType, search, fromDate, toDate);
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=recruitments.xlsx")
      .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
      .body(excelBytes);
  }
  @GetMapping("/recruitments/{id}")
  public ResponseEntity<APIResponse<RecruitmentResponse>> getRecruitmentById(@PathVariable UUID id) {
    return ResponseEntity.ok(APIResponse.ok("Recruitment Retrieved Successfully", recruitmentService.getAdminRecruitmentById(id)));
  }
  @PostMapping("/recruitments")
  public ResponseEntity<APIResponse<RecruitmentResponse>> createRecruitment(@Valid @RequestBody CreateRecruitmentRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(APIResponse.created("Recruitment Created Successfully", recruitmentService.createRecruitment(request)));
  }
  @PutMapping("/recruitments/{id}")
  public ResponseEntity<APIResponse<RecruitmentResponse>> updateRecruitment(@PathVariable UUID id, @Valid @RequestBody UpdateRecruitmentRequest request) {
    return ResponseEntity.ok(APIResponse.ok("Recruitment Updated Successfully", recruitmentService.updateRecruitment(id, request)));
  }
  @DeleteMapping("/recruitments/{id}")
  public ResponseEntity<APIResponse<Void>> deleteRecruitment(@PathVariable UUID id) {
    recruitmentService.deleteRecruitment(id);
    return ResponseEntity.ok(APIResponse.ok("Recruitment Deleted Successfully", null));
  }
  @GetMapping({"/departments", "/recruitments/departments"})
  public ResponseEntity<APIResponse<List<DepartmentResponse>>> getDepartments(@RequestParam(required = false) String search) {
    return ResponseEntity.ok(APIResponse.ok("Departments Retrieved Successfully", recruitmentService.getDepartments(search)));
  }
  @PostMapping({"/departments", "/recruitments/departments"})
  public ResponseEntity<APIResponse<DepartmentResponse>> createDepartment(@Valid @RequestBody DepartmentRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(APIResponse.created("Department Created Successfully", recruitmentService.createDepartment(request)));
  }
  @PutMapping({"/departments/{id}", "/recruitments/departments/{id}"})
  public ResponseEntity<APIResponse<DepartmentResponse>> updateDepartment(@PathVariable UUID id, @Valid @RequestBody DepartmentRequest request) {
    return ResponseEntity.ok(APIResponse.ok("Department Updated Successfully", recruitmentService.updateDepartment(id, request)));
  }
  @DeleteMapping({"/departments/{id}", "/recruitments/departments/{id}"})
  public ResponseEntity<APIResponse<Void>> deleteDepartment(@PathVariable UUID id) {
    recruitmentService.deleteDepartment(id);
    return ResponseEntity.ok(APIResponse.ok("Department Deleted Successfully", null));
  }
  @GetMapping("/candidates")
  public ResponseEntity<APIResponse<PageResponse<CandidateDTO>>> getCandidates(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) UUID recruitmentId,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    return ResponseEntity.ok(APIResponse.ok("Candidates Retrieved Successfully", recruitmentService.getCandidates(page, size, recruitmentId, search, fromDate, toDate)));
  }
  @GetMapping("/candidates/exportExcel")
  public ResponseEntity<byte[]> exportCandidatesExcel(
    @RequestParam(required = false) UUID recruitmentId,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    byte[] excelBytes = recruitmentService.exportCandidatesExcel(recruitmentId, fromDate, toDate);
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=candidates.xlsx")
      .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
      .body(excelBytes);
  }
  @GetMapping("/candidates/{id}")
  public ResponseEntity<APIResponse<CandidateDTO>> getCandidateById(@PathVariable UUID id) {
    return ResponseEntity.ok(APIResponse.ok("Candidate Retrieved Successfully", recruitmentService.getCandidateById(id)));
  }
  @PatchMapping("/candidates/{id}/note")
  public ResponseEntity<APIResponse<CandidateNoteResponse>> updateCandidateNote(@PathVariable UUID id, @Valid @RequestBody CandidateNoteRequest request) {
    return ResponseEntity.ok(APIResponse.ok("Candidate Note Updated Successfully", recruitmentService.updateCandidateNote(id, request)));
  }
}