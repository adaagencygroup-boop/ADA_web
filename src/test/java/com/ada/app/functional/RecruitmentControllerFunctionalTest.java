package com.ada.app.functional;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.util.FileUtils;
import com.ada.app.modules.recruitment.controller.AdminRecruitmentController;
import com.ada.app.modules.recruitment.controller.PublicRecruitmentController;
import com.ada.app.modules.recruitment.dto.ApplyCandidateRequest;
import com.ada.app.modules.recruitment.dto.CandidateDTO;
import com.ada.app.modules.recruitment.dto.CandidateNoteRequest;
import com.ada.app.modules.recruitment.dto.CandidateNoteResponse;
import com.ada.app.modules.recruitment.dto.CreateRecruitmentRequest;
import com.ada.app.modules.recruitment.dto.DashboardMetricsResponse;
import com.ada.app.modules.recruitment.dto.DepartmentRequest;
import com.ada.app.modules.recruitment.dto.DepartmentResponse;
import com.ada.app.modules.recruitment.dto.PublicDepartmentResponse;
import com.ada.app.modules.recruitment.dto.RecruitmentResponse;
import com.ada.app.modules.recruitment.dto.UpdateRecruitmentRequest;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
import com.ada.app.modules.recruitment.service.RecruitmentService;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
public class RecruitmentControllerFunctionalTest {
  private RecruitmentService recruitmentService;
  private FileUtils fileUtils;
  private AdminRecruitmentController adminRecruitmentController;
  private PublicRecruitmentController publicRecruitmentController;
  @BeforeEach
  public void setUp() {
    recruitmentService = Mockito.mock(RecruitmentService.class);
    fileUtils = Mockito.mock(FileUtils.class);
    adminRecruitmentController = new AdminRecruitmentController(recruitmentService);
    publicRecruitmentController = new PublicRecruitmentController(recruitmentService, fileUtils);
  }
  @Test
  public void testAdminRecruitmentEndpoints() {
    DashboardMetricsResponse metrics = new DashboardMetricsResponse(5, 20, 2, 3);
    Mockito.when(recruitmentService.getDashboardMetrics()).thenReturn(metrics);
    ResponseEntity<APIResponse<DashboardMetricsResponse>> metricsResp = adminRecruitmentController.getDashboardMetrics();
    Assertions.assertEquals(200, metricsResp.getStatusCode().value());
    Assertions.assertEquals(5, metricsResp.getBody().data().activeCount());
    UUID recruitId = UUID.randomUUID();
    RecruitmentResponse recruitData = new RecruitmentResponse(recruitId, "Senior Java Backend Engineer", "seniorJavaBackendEngineer", UUID.randomUUID(), "Kỹ Thuật", UUID.randomUUID(), "Alexander Nguyen", "Hà Nội", EmploymentType.fulltime, "08:30 - 17:30", "Phát Triển Hệ Thống Backend", "Có Ít Nhất 3 Năm Kinh Nghiệm Java", "Thưởng Hiệu Suất & Bảo Hiểm Đầy Đủ", "https://ada.com/files/media/recruitCover.png", RecruitmentStatus.hiring, new BigDecimal("25000000"), new BigDecimal("45000000"), false, 2, 5L, 100, Instant.now(), Instant.now(), Instant.now());
    PageResponse<RecruitmentResponse> page = new PageResponse<>(List.of(recruitData), new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(recruitmentService.getAdminRecruitments(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(page);
    ResponseEntity<APIResponse<PageResponse<RecruitmentResponse>>> getPage = adminRecruitmentController.getRecruitments(1, 10, null, null, null, null, null, null);
    Assertions.assertEquals(200, getPage.getStatusCode().value());
    Mockito.when(recruitmentService.getAdminRecruitmentById(recruitId)).thenReturn(recruitData);
    ResponseEntity<APIResponse<RecruitmentResponse>> getDetail = adminRecruitmentController.getRecruitmentById(recruitId);
    Assertions.assertEquals(200, getDetail.getStatusCode().value());
    Assertions.assertEquals("seniorJavaBackendEngineer", getDetail.getBody().data().slug());
    CreateRecruitmentRequest createReq = new CreateRecruitmentRequest("Senior Java Backend Engineer", UUID.randomUUID(), "Hà Nội", EmploymentType.fulltime, "08:30 - 17:30", "Phát Triển Hệ Thống Backend", "Có Ít Nhất 3 Năm Kinh Nghiệm Java", "Thưởng Hiệu Suất & Bảo Hiểm Đầy Đủ", "https://ada.com/files/media/recruitCover.png", RecruitmentStatus.hiring, new BigDecimal("25000000"), new BigDecimal("45000000"), false, 2, Instant.now());
    Mockito.when(recruitmentService.createRecruitment(createReq)).thenReturn(recruitData);
    ResponseEntity<APIResponse<RecruitmentResponse>> createResp = adminRecruitmentController.createRecruitment(createReq);
    Assertions.assertEquals(201, createResp.getStatusCode().value());
    UpdateRecruitmentRequest updateReq = new UpdateRecruitmentRequest("Senior Java Backend Engineer - Cập Nhật", UUID.randomUUID(), "Hà Nội", EmploymentType.fulltime, "08:30 - 17:30", "Phát Triển Hệ Thống Backend", "Có Ít Nhất 3 Năm Kinh Nghiệm Java", "Thưởng Hiệu Suất & Bảo Hiểm Đầy Đủ", "https://ada.com/files/media/recruitCover.png", RecruitmentStatus.hiring, new BigDecimal("25000000"), new BigDecimal("45000000"), false, 2, Instant.now());
    Mockito.when(recruitmentService.updateRecruitment(recruitId, updateReq)).thenReturn(recruitData);
    ResponseEntity<APIResponse<RecruitmentResponse>> updateResp = adminRecruitmentController.updateRecruitment(recruitId, updateReq);
    Assertions.assertEquals(200, updateResp.getStatusCode().value());
    Mockito.doNothing().when(recruitmentService).deleteRecruitment(recruitId);
    ResponseEntity<APIResponse<Void>> deleteResp = adminRecruitmentController.deleteRecruitment(recruitId);
    Assertions.assertEquals(200, deleteResp.getStatusCode().value());
    byte[] excelBytes = new byte[]{0x50, 0x4B, 0x03, 0x04};
    Mockito.when(recruitmentService.exportRecruitmentsExcel(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(excelBytes);
    ResponseEntity<byte[]> exportResp = adminRecruitmentController.exportRecruitmentsExcel(null, null, null, null, null, null);
    Assertions.assertEquals(200, exportResp.getStatusCode().value());
  }
  @Test
  public void testAdminDepartmentEndpoints() {
    UUID deptId = UUID.randomUUID();
    DepartmentResponse deptResp = new DepartmentResponse(deptId, "Kỹ Thuật");
    Mockito.when(recruitmentService.getDepartments(ArgumentMatchers.any())).thenReturn(List.of(deptResp));
    ResponseEntity<APIResponse<List<DepartmentResponse>>> getDepts = adminRecruitmentController.getDepartments(null);
    Assertions.assertEquals(200, getDepts.getStatusCode().value());
    DepartmentRequest deptReq = new DepartmentRequest("Kỹ Thuật");
    Mockito.when(recruitmentService.createDepartment(deptReq)).thenReturn(deptResp);
    ResponseEntity<APIResponse<DepartmentResponse>> createDept = adminRecruitmentController.createDepartment(deptReq);
    Assertions.assertEquals(201, createDept.getStatusCode().value());
    Mockito.when(recruitmentService.updateDepartment(deptId, deptReq)).thenReturn(deptResp);
    ResponseEntity<APIResponse<DepartmentResponse>> updateDept = adminRecruitmentController.updateDepartment(deptId, deptReq);
    Assertions.assertEquals(200, updateDept.getStatusCode().value());
    Mockito.doNothing().when(recruitmentService).deleteDepartment(deptId);
    ResponseEntity<APIResponse<Void>> deleteDept = adminRecruitmentController.deleteDepartment(deptId);
    Assertions.assertEquals(200, deleteDept.getStatusCode().value());
  }
  @Test
  public void testAdminCandidateEndpoints() {
    UUID candId = UUID.randomUUID();
    CandidateDTO cand = new CandidateDTO(candId, UUID.randomUUID(), "Senior Java Backend Engineer", "Hà Nội", EmploymentType.fulltime, "Alexander Nguyen", "alexander.nguyen@ada.com.vn", "+84 912 045 678", "https://ada.com/files/resumes/resume.pdf", "Kính Gửi ADA Group Tôi Muốn Ứng Tuyển", "Đã Phỏng Vấn Vòng 1", Instant.now(), Instant.now(), Instant.now(), Instant.now());
    PageResponse<CandidateDTO> page = new PageResponse<>(List.of(cand), new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(recruitmentService.getCandidates(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(page);
    ResponseEntity<APIResponse<PageResponse<CandidateDTO>>> getCands = adminRecruitmentController.getCandidates(1, 10, null, null, null, null);
    Assertions.assertEquals(200, getCands.getStatusCode().value());
    Mockito.when(recruitmentService.getCandidateById(candId)).thenReturn(cand);
    ResponseEntity<APIResponse<CandidateDTO>> getCandDetail = adminRecruitmentController.getCandidateById(candId);
    Assertions.assertEquals(200, getCandDetail.getStatusCode().value());
    CandidateNoteRequest noteReq = new CandidateNoteRequest("Đã Lên Lịch Phỏng Vấn Vòng 1 Vào Thứ 3");
    CandidateNoteResponse noteResp = new CandidateNoteResponse(candId, "Đã Lên Lịch Phỏng Vấn Vòng 1 Vào Thứ 3", Instant.now());
    Mockito.when(recruitmentService.updateCandidateNote(candId, noteReq)).thenReturn(noteResp);
    ResponseEntity<APIResponse<CandidateNoteResponse>> updateNote = adminRecruitmentController.updateCandidateNote(candId, noteReq);
    Assertions.assertEquals(200, updateNote.getStatusCode().value());
    byte[] excelBytes = new byte[]{0x50, 0x4B, 0x03, 0x04};
    Mockito.when(recruitmentService.exportCandidatesExcel(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(excelBytes);
    ResponseEntity<byte[]> exportResp = adminRecruitmentController.exportCandidatesExcel(null, null, null);
    Assertions.assertEquals(200, exportResp.getStatusCode().value());
  }
  @Test
  public void testPublicRecruitmentEndpoints() {
    RecruitmentResponse publicRecruit = new RecruitmentResponse(UUID.randomUUID(), "Senior Java Backend Engineer", "seniorJavaBackendEngineer", UUID.randomUUID(), "Kỹ Thuật", null, null, "Hà Nội", EmploymentType.fulltime, "08:30 - 17:30", "Phát Triển Hệ Thống Backend", "Có Ít Nhất 3 Năm Kinh Nghiệm Java", "Thưởng Hiệu Suất", "https://ada.com/files/media/cover.png", null, new BigDecimal("25000000"), new BigDecimal("45000000"), false, 2, null, 100, Instant.now(), Instant.now(), Instant.now());
    PageResponse<RecruitmentResponse> page = new PageResponse<>(List.of(publicRecruit), new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(recruitmentService.getPublicRecruitments(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(page);
    ResponseEntity<APIResponse<PageResponse<RecruitmentResponse>>> getPublic = publicRecruitmentController.getPublicRecruitments(1, 10, null, null, null, null);
    Assertions.assertEquals(200, getPublic.getStatusCode().value());
    Mockito.when(recruitmentService.getPublicRecruitmentBySlug("seniorJavaBackendEngineer")).thenReturn(publicRecruit);
    ResponseEntity<APIResponse<RecruitmentResponse>> getBySlug = publicRecruitmentController.getRecruitmentBySlug("seniorJavaBackendEngineer");
    Assertions.assertEquals(200, getBySlug.getStatusCode().value());
    PublicDepartmentResponse publicDept = new PublicDepartmentResponse(UUID.randomUUID(), "Kỹ Thuật");
    Mockito.when(recruitmentService.getPublicDepartments()).thenReturn(List.of(publicDept));
    ResponseEntity<APIResponse<List<PublicDepartmentResponse>>> getDepts = publicRecruitmentController.getDepartments();
    Assertions.assertEquals(200, getDepts.getStatusCode().value());
    Mockito.when(recruitmentService.getEmploymentTypes()).thenReturn(List.of(EmploymentType.fulltime, EmploymentType.parttime));
    ResponseEntity<APIResponse<List<EmploymentType>>> getTypes = publicRecruitmentController.getEmploymentTypes();
    Assertions.assertEquals(200, getTypes.getStatusCode().value());
    MockMultipartFile resumeFile = new MockMultipartFile("file", "resume.pdf", "application/pdf", new byte[]{0x25, 0x50, 0x44, 0x46});
    Mockito.when(fileUtils.uploadFile(ArgumentMatchers.any(), ArgumentMatchers.eq("resumes"))).thenReturn("https://ada.com/files/resumes/resume.pdf");
    ResponseEntity<APIResponse<Map<String, Object>>> uploadResp = publicRecruitmentController.uploadResume(resumeFile);
    Assertions.assertEquals(200, uploadResp.getStatusCode().value());
    Assertions.assertEquals("https://ada.com/files/resumes/resume.pdf", uploadResp.getBody().data().get("resumeURL"));
    ApplyCandidateRequest applyReq = new ApplyCandidateRequest(UUID.randomUUID(), "Alexander Nguyen", "alexander.nguyen@ada.com.vn", "+84 912 045 678", "https://ada.com/files/resumes/resume.pdf", "Kính Gửi ADA Group");
    Mockito.doNothing().when(recruitmentService).applyCandidate(applyReq);
    ResponseEntity<APIResponse<Void>> applyResp = publicRecruitmentController.applyCandidate(applyReq);
    Assertions.assertEquals(201, applyResp.getStatusCode().value());
    UUID recruitId = UUID.randomUUID();
    Mockito.doNothing().when(recruitmentService).applyJob(ArgumentMatchers.eq(recruitId), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any());
    ResponseEntity<APIResponse<Void>> applyJobResp = publicRecruitmentController.applyJob(recruitId, "Alexander Nguyen", "alexander.nguyen@ada.com.vn", "+84 912 045 678", "Kính Gửi ADA Group", resumeFile);
    Assertions.assertEquals(201, applyJobResp.getStatusCode().value());
  }
}