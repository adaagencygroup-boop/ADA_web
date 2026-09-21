package com.ada.app.modules.recruitment.service;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.security.SecurityUtils;
import com.ada.app.common.util.ExcelExportService;
import com.ada.app.common.util.FileUtils;
import com.ada.app.modules.notification.enums.NotificationType;
import com.ada.app.modules.notification.service.NotificationService;
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
import com.ada.app.modules.recruitment.entity.Candidate;
import com.ada.app.modules.recruitment.entity.Department;
import com.ada.app.modules.recruitment.entity.Recruitment;
import com.ada.app.modules.recruitment.dto.CandidateRespondAdminRequest;
import com.ada.app.modules.recruitment.enums.CandidateStatus;
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import com.ada.app.modules.recruitment.repository.CandidateRepository;
import com.ada.app.modules.recruitment.repository.CandidateSpecs;
import com.ada.app.modules.recruitment.repository.DepartmentRepository;
import com.ada.app.modules.recruitment.repository.RecruitmentRepository;
import com.ada.app.modules.recruitment.repository.RecruitmentSpecs;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.repository.UserRepository;
import java.math.BigDecimal;
import java.text.Normalizer;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
@Slf4j
@Service
@RequiredArgsConstructor
public class RecruitmentService {
  @Value("${app.storage.path}")
  private String storagePath;
  private final RecruitmentRepository recruitmentRepository;
  private final CandidateRepository candidateRepository;
  private final DepartmentRepository departmentRepository;
  private final UserRepository userRepository;
  private final NotificationService notificationService;
  private final ExcelExportService excelExportService;
  private final FileUtils fileUtils;
  private final StringRedisTemplate redisTemplate;
  private final JavaMailSender mailSender;
  @Value("${spring.mail.username}")
  private String senderEmail;
  private static final Pattern nonLatin = Pattern.compile("[^a-zA-Z0-9\\s]");
  private static final Pattern whitespace = Pattern.compile("\\s+");
  @Transactional
  public void autoCloseExpiredRecruitments() {
    try {
      int closedCount = recruitmentRepository.closeExpiredRecruitments(Instant.now());
      if (closedCount > 0) {
        log.info("Auto-closed {} expired recruitment postings", closedCount);
      }
    } catch (Exception e) {
      log.error("Failed to auto-close expired recruitments: {}", e.getMessage());
    }
  }

  @Transactional
  @org.springframework.scheduling.annotation.Scheduled(cron = "0 */5 * * * *")
  public void scheduledCloseExpiredRecruitments() {
    autoCloseExpiredRecruitments();
  }

  @Transactional
  @org.springframework.context.event.EventListener(org.springframework.boot.context.event.ApplicationReadyEvent.class)
  public void onApplicationReadyCloseExpiredRecruitments() {
    autoCloseExpiredRecruitments();
  }

  @Transactional
  public DashboardMetricsResponse getDashboardMetrics() {
    autoCloseExpiredRecruitments();
    long activeCount = recruitmentRepository.countByStatus(RecruitmentStatus.hiring);
    long closedCount = recruitmentRepository.countByStatus(RecruitmentStatus.closed);
    long totalCandidatesCount = candidateRepository.count();
    Instant now = Instant.now();
    Instant soon = now.plus(7, ChronoUnit.DAYS);
    long expiringSoonCount = recruitmentRepository.countExpiringSoon(now, soon);
    return new DashboardMetricsResponse(activeCount, totalCandidatesCount, expiringSoonCount, closedCount);
  }
  @Transactional
  public PageResponse<RecruitmentResponse> getAdminRecruitments(
    int page,
    int size,
    RecruitmentStatus status,
    UUID departmentId,
    EmploymentType employmentType,
    String location,
    BigDecimal minSalary,
    BigDecimal maxSalary,
    String search,
    Instant fromDate,
    Instant toDate
  ) {
    autoCloseExpiredRecruitments();
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("createdAt").descending());
    Page<Recruitment> result = recruitmentRepository.findAll(RecruitmentSpecs.adminFilter(status, departmentId, employmentType, location, minSalary, maxSalary, search, fromDate, toDate), pageable);
    List<UUID> ids = result.getContent().stream().map(Recruitment::getId).toList();
    Map<UUID, Long> countMap = new HashMap<>();
    if (!ids.isEmpty()) {
      List<Object[]> counts = candidateRepository.countByRecruitmentIds(ids);
      for (Object[] row : counts) {
        if (row[0] != null && row[1] != null) {
          countMap.put((UUID) row[0], ((Number) row[1]).longValue());
        }
      }
    }
    List<RecruitmentResponse> items = result.getContent().stream()
      .map(r -> mapToAdminItemResponse(r, countMap.getOrDefault(r.getId(), 0L)))
      .toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional
  public RecruitmentResponse getAdminRecruitmentById(UUID id) {
    autoCloseExpiredRecruitments();
    Recruitment r = recruitmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Không tìm thấy tin tuyển dụng"));
    return mapToResponse(r);
  }
  private static void validateCleanText(String val, String fieldName) {
    if (val == null) {
      throw AppException.badRequest(fieldName + " không được để trống");
    }
    String plainText = val.replaceAll("<[^>]*>", "").replace("&nbsp;", " ");
    if (plainText.trim().isEmpty()) {
      throw AppException.badRequest(fieldName + " không được để trống hoặc chỉ chứa khoảng trắng/tab");
    }
    if (plainText.contains("\t")) {
      throw AppException.badRequest(fieldName + " không được chứa phím Tab");
    }
    if (java.util.regex.Pattern.compile("\\s{2,}").matcher(plainText).find()) {
      throw AppException.badRequest(fieldName + " không được chứa nhiều dấu cách liên tiếp");
    }
  }

  private void validateWorkingHours(String workingHours) {
    if (workingHours == null || workingHours.isBlank()) {
      return;
    }
    var matcher = java.util.regex.Pattern.compile("\\((\\d{2}:\\d{2})\\s*-\\s*(\\d{2}:\\d{2})\\)").matcher(workingHours);
    if (matcher.find()) {
      String start = matcher.group(1);
      String end = matcher.group(2);
      if (start.compareTo(end) >= 0) {
        throw AppException.badRequest("Thời gian kết thúc phải lớn hơn thời gian bắt đầu");
      }
    }
  }
  @Transactional
  public RecruitmentResponse createRecruitment(CreateRecruitmentRequest request) {
    if (request.status() == RecruitmentStatus.closed) {
      throw AppException.badRequest("Không thể tạo mới tin tuyển dụng với trạng thái Đã đóng");
    }
    validateWorkingHours(request.workingHours());
    validateCleanText(request.jobTitle(), "Vị trí tuyển dụng");
    validateCleanText(request.location(), "Địa điểm làm việc");
    validateCleanText(request.description(), "Mô tả công việc");
    validateCleanText(request.requirements(), "Yêu cầu ứng viên");
    validateCleanText(request.benefits(), "Quyền lợi được hưởng");
    if (request.minSalary() != null && request.minSalary().compareTo(BigDecimal.ZERO) <= 0) {
      throw AppException.badRequest("Mức lương tối thiểu phải lớn hơn 0");
    }
    if (request.minSalary() != null && request.maxSalary() != null && request.maxSalary().compareTo(request.minSalary()) <= 0) {
      throw AppException.badRequest("Lương tối đa phải lớn hơn lương tối thiểu");
    }
    if (request.expiresAt() != null) {
      LocalDate today = LocalDate.now(ZoneId.of("Asia/Ho_Chi_Minh"));
      LocalDate expDate = request.expiresAt().atZone(ZoneId.of("Asia/Ho_Chi_Minh")).toLocalDate();
      if (!expDate.isAfter(today)) {
        throw AppException.badRequest("Hạn ứng tuyển phải lớn hơn ngày hiện tại");
      }
    }
    UUID userId = SecurityUtils.getCurrentUserId();
    User recruiter = userRepository.findById(userId).orElseThrow(() -> AppException.notFound("Không tìm thấy người tuyển dụng"));
    Department dept = null;
    if (request.departmentId() != null) {
      dept = departmentRepository.findById(request.departmentId()).orElseThrow(() -> AppException.notFound("Không tìm thấy phòng ban"));
    }
    String slug = generateSlug(request.jobTitle());
    Recruitment r = Recruitment.builder()
      .recruiter(recruiter)
      .department(dept)
      .jobTitle(request.jobTitle().trim())
      .slug(slug)
      .location(request.location().trim())
      .employmentType(request.employmentType())
      .workingHours(request.workingHours().trim())
      .description(request.description().trim())
      .requirements(request.requirements().trim())
      .benefits(request.benefits().trim())
      .coverImageURL(request.coverImageURL())
      .status(request.status() != null ? request.status() : RecruitmentStatus.draft)
      .minSalary(request.minSalary())
      .maxSalary(request.maxSalary())
      .isNegotiable(Boolean.TRUE.equals(request.isNegotiable()))
      .requiredCandidateNum(request.requiredCandidateNum() != null ? request.requiredCandidateNum() : 1)
      .expiresAt(request.expiresAt())
      .build();
    r = recruitmentRepository.save(r);
    return mapToResponse(r);
  }
  @Transactional
  public RecruitmentResponse updateRecruitment(UUID id, UpdateRecruitmentRequest request) {
    if (request.minSalary() != null && request.minSalary().compareTo(BigDecimal.ZERO) <= 0) {
      throw AppException.badRequest("Mức lương tối thiểu phải lớn hơn 0");
    }
    if (request.minSalary() != null && request.maxSalary() != null && request.maxSalary().compareTo(request.minSalary()) <= 0) {
      throw AppException.badRequest("Lương tối đa phải lớn hơn lương tối thiểu");
    }
    if (request.expiresAt() != null) {
      LocalDate today = LocalDate.now(ZoneId.of("Asia/Ho_Chi_Minh"));
      LocalDate expDate = request.expiresAt().atZone(ZoneId.of("Asia/Ho_Chi_Minh")).toLocalDate();
      if (!expDate.isAfter(today)) {
        throw AppException.badRequest("Hạn ứng tuyển phải lớn hơn ngày hiện tại");
      }
    }
    Recruitment r = recruitmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Không tìm thấy tin tuyển dụng"));
    if (request.departmentId() != null) {
      Department dept = departmentRepository.findById(request.departmentId()).orElseThrow(() -> AppException.notFound("Không tìm thấy phòng ban"));
      r.setDepartment(dept);
    }
    if (request.jobTitle() != null) {
      validateCleanText(request.jobTitle(), "Vị trí tuyển dụng");
      r.setJobTitle(request.jobTitle().trim());
    }
    if (request.location() != null) {
      validateCleanText(request.location(), "Địa điểm làm việc");
      r.setLocation(request.location().trim());
    }
    if (request.employmentType() != null) {
      r.setEmploymentType(request.employmentType());
    }
    if (request.workingHours() != null) {
      validateWorkingHours(request.workingHours());
      validateCleanText(request.workingHours(), "Thời gian làm việc");
      r.setWorkingHours(request.workingHours().trim());
    }
    if (request.description() != null) {
      validateCleanText(request.description(), "Mô tả công việc");
      r.setDescription(request.description().trim());
    }
    if (request.requirements() != null) {
      validateCleanText(request.requirements(), "Yêu cầu ứng viên");
      r.setRequirements(request.requirements().trim());
    }
    if (request.benefits() != null) {
      validateCleanText(request.benefits(), "Quyền lợi được hưởng");
      r.setBenefits(request.benefits().trim());
    }
    if (request.coverImageURL() != null && !request.coverImageURL().isBlank()) {
      r.setCoverImageURL(request.coverImageURL().trim());
    }
    if (request.status() != null) {
      r.setStatus(request.status());
    }
    if (request.minSalary() != null) {
      r.setMinSalary(request.minSalary());
    }
    if (request.maxSalary() != null) {
      r.setMaxSalary(request.maxSalary());
    }
    if (r.getMinSalary() != null && r.getMinSalary().compareTo(BigDecimal.ZERO) <= 0) {
      throw AppException.badRequest("Mức lương tối thiểu phải lớn hơn 0");
    }
    if (r.getMinSalary() != null && r.getMaxSalary() != null && r.getMaxSalary().compareTo(r.getMinSalary()) <= 0) {
      throw AppException.badRequest("Lương tối đa phải lớn hơn lương tối thiểu");
    }
    if (request.isNegotiable() != null) {
      r.setIsNegotiable(request.isNegotiable());
    }
    if (request.requiredCandidateNum() != null) {
      r.setRequiredCandidateNum(request.requiredCandidateNum());
    }
    if (request.expiresAt() != null) {
      LocalDate today = LocalDate.now(ZoneId.of("Asia/Ho_Chi_Minh"));
      LocalDate expDate = request.expiresAt().atZone(ZoneId.of("Asia/Ho_Chi_Minh")).toLocalDate();
      if (!expDate.isAfter(today)) {
        throw AppException.badRequest("Hạn ứng tuyển phải lớn hơn ngày hiện tại");
      }
      r.setExpiresAt(request.expiresAt());
    }
    r = recruitmentRepository.save(r);
    return mapToResponse(r);
  }
  @Transactional
  public void deleteRecruitment(UUID id) {
    Recruitment r = recruitmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Không tìm thấy tin tuyển dụng"));
    candidateRepository.deleteByRecruitmentId(id);
    recruitmentRepository.delete(r);
  }
  @Transactional(readOnly = true)
  public List<DepartmentResponse> getAdminDepartments() {
    return departmentRepository.findAll().stream()
      .map(d -> new DepartmentResponse(d.getId(), d.getName()))
      .toList();
  }
  @Transactional(readOnly = true)
  public byte[] exportRecruitmentsExcel(RecruitmentStatus status, UUID departmentId, EmploymentType employmentType, String search, Instant fromDate, Instant toDate) {
    List<Recruitment> list = recruitmentRepository.findAll(RecruitmentSpecs.adminFilter(status, departmentId, employmentType, null, null, null, search, fromDate, toDate), Sort.by("createdAt").descending());
    List<String> headers = List.of("ID", "Job Title", "Department", "Location", "Employment Type", "Status", "View Count", "Expires At", "Created At");
    List<List<Object>> rows = new ArrayList<>();
    for (Recruitment r : list) {
      rows.add(List.of(
        r.getId().toString(),
        r.getJobTitle(),
        r.getDepartment() != null ? r.getDepartment().getName() : "",
        r.getLocation() != null ? r.getLocation() : "",
        r.getEmploymentType() != null ? r.getEmploymentType().name() : "",
        r.getStatus().name(),
        r.getViewCount() != null ? r.getViewCount() : 0,
        r.getExpiresAt() != null ? r.getExpiresAt().toString() : "",
        r.getCreatedAt().toString()
      ));
    }
    return excelExportService.exportToExcel("Recruitments", headers, rows);
  }
  @Transactional(readOnly = true)
  public byte[] exportCandidatesExcel(UUID recruitmentId, CandidateStatus status, Instant fromDate, Instant toDate) {
    List<Candidate> list = candidateRepository.findAll(CandidateSpecs.filter(recruitmentId, status, null, fromDate, toDate), Sort.by("appliedAt").descending());
    List<String> headers = List.of("ID", "Recruitment", "Fullname", "Email", "Phone", "Status", "Resume URL", "Feedback", "Feedback Sent At", "Applied At", "Note");
    List<List<Object>> rows = new ArrayList<>();
    for (Candidate c : list) {
      rows.add(List.of(
        c.getId().toString(),
        c.getRecruitment() != null ? c.getRecruitment().getJobTitle() : "",
        c.getFullname(),
        c.getEmail() != null ? c.getEmail() : "",
        c.getPhone() != null ? c.getPhone() : "",
        c.getStatus() != null ? c.getStatus().name() : "",
        c.getResumeURL() != null ? c.getResumeURL() : "",
        c.getFeedbackContent() != null ? c.getFeedbackContent() : "",
        c.getFeedbackSentAt() != null ? c.getFeedbackSentAt().toString() : "",
        c.getAppliedAt().toString(),
        c.getNote() != null ? c.getNote() : ""
      ));
    }
    return excelExportService.exportToExcel("Candidates", headers, rows);
  }
  @Transactional(readOnly = true)
  public List<DepartmentResponse> getDepartments(String search) {
    List<Department> list = (search != null && !search.isBlank())
      ? departmentRepository.findBySearch(search)
      : departmentRepository.findAll();
    return list.stream()
      .map(d -> new DepartmentResponse(d.getId(), d.getName()))
      .toList();
  }
  @Transactional(readOnly = true)
  public List<PublicDepartmentResponse> getPublicDepartments() {
    return departmentRepository.findAll().stream()
      .map(d -> new PublicDepartmentResponse(d.getId(), d.getName()))
      .toList();
  }
  public List<EmploymentType> getEmploymentTypes() {
    return recruitmentRepository.findDistinctEmploymentTypes();
  }
  @Transactional
  public DepartmentResponse createDepartment(DepartmentRequest request) {
    if (departmentRepository.findByName(request.name()).isPresent()) {
      throw AppException.conflict("Tên phòng ban đã tồn tại");
    }
    Department d = Department.builder().name(request.name()).build();
    d = departmentRepository.save(d);
    return new DepartmentResponse(d.getId(), d.getName());
  }
  @Transactional
  public DepartmentResponse updateDepartment(UUID id, DepartmentRequest request) {
    Department d = departmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Không tìm thấy phòng ban"));
    if (request.name() != null && !request.name().isBlank()) {
      d.setName(request.name().trim());
    }
    d = departmentRepository.save(d);
    return new DepartmentResponse(d.getId(), d.getName());
  }
  @Transactional
  public void deleteDepartment(UUID id) {
    Department d = departmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Không tìm thấy phòng ban"));
    if (recruitmentRepository.existsByDepartmentId(id)) {
      throw AppException.conflict("Phòng ban này đang được sử dụng bởi tin tuyển dụng, không thể xóa!");
    }
    departmentRepository.delete(d);
  }
  @Transactional(readOnly = true)
  public PageResponse<CandidateDTO> getCandidates(int page, int size, UUID recruitmentId, CandidateStatus status, String search, Instant fromDate, Instant toDate) {
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("appliedAt").descending());
    Page<Candidate> result = candidateRepository.findAll(CandidateSpecs.filter(recruitmentId, status, search, fromDate, toDate), pageable);
    List<CandidateDTO> items = result.getContent().stream().map(this::mapToCandidateListItemDTO).toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional(readOnly = true)
  public CandidateDTO getCandidateById(UUID id) {
    Candidate c = candidateRepository.findById(id).orElseThrow(() -> AppException.notFound("Không tìm thấy ứng viên"));
    return mapToCandidateDTO(c);
  }
  @Transactional
  public CandidateDTO respondCandidate(UUID id, CandidateRespondAdminRequest request) {
    Candidate c = candidateRepository.findById(id)
      .orElseThrow(() -> AppException.notFound("Không tìm thấy ứng viên"));
    if (c.getStatus() == request.status()) {
      throw AppException.badRequest("Ứng viên hiện đã ở trạng thái này");
    }
    if (c.getStatus() == CandidateStatus.interview_passed) {
      throw AppException.badRequest("Ứng viên đã trúng tuyển, quy trình tuyển dụng đã hoàn tất");
    }
    if (c.getStatus() == CandidateStatus.failed) {
      throw AppException.badRequest("Ứng viên đã bị từ chối, quy trình tuyển dụng đã kết thúc");
    }
    if (c.getStatus() == CandidateStatus.pending && request.status() == CandidateStatus.interview_passed) {
      throw AppException.badRequest("Ứng viên đang ở trạng thái chờ duyệt, phải đạt vòng hồ sơ trước khi trúng tuyển");
    }
    if (c.getStatus() == CandidateStatus.passed && request.status() == CandidateStatus.pending) {
      throw AppException.badRequest("Không thể chuyển lùi trạng thái ứng viên về chờ duyệt");
    }
    c.setStatus(request.status());
    c.setFeedbackContent(request.feedbackContent());
    c.setFeedbackAttachmentURL(request.feedbackAttachmentURL());
    c.setFeedbackSentAt(Instant.now());
    c = candidateRepository.save(c);

    if (c.getEmail() != null && !c.getEmail().isBlank()) {
      try {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(c.getEmail());
        String subject;
        if (request.status() == CandidateStatus.passed) {
          subject = "Thông Báo Kết Quả Ứng Tuyển - Thư Mời Phỏng Vấn (ADA Group)";
        } else if (request.status() == CandidateStatus.interview_passed) {
          subject = "Thông Báo Kết Quả Ứng Tuyển - Thư Mời Nhận Việc (ADA Group)";
        } else {
          subject = "Thông Báo Kết Quả Ứng Tuyển (ADA Group)";
        }
        message.setSubject(subject);
        message.setText(request.feedbackContent());
        mailSender.send(message);
      } catch (Exception e) {
        log.warn("Failed To Send Email Feedback To Candidate {}: {}", c.getEmail(), e.getMessage());
      }
    }

    String statusText;
    if (request.status() == CandidateStatus.passed) {
      statusText = "Đạt Vòng Hồ Sơ";
    } else if (request.status() == CandidateStatus.interview_passed) {
      statusText = "Trúng Tuyển / Đạt Phỏng Vấn";
    } else {
      statusText = "Từ Chối";
    }
    notificationService.createAndBroadcast(
      "Phản Hồi Ứng Viên Đã Được Gửi",
      "Bạn Đã Phản Hồi Hồ Sơ Ứng Viên " + c.getFullname() + " (" + statusText + ").",
      NotificationType.recruitments
    );

    return mapToCandidateDTO(c);
  }
  @Transactional
  public CandidateNoteResponse updateCandidateNote(UUID id, CandidateNoteRequest request) {
    Candidate c = candidateRepository.findById(id).orElseThrow(() -> AppException.notFound("Không tìm thấy ứng viên"));
    c.setNote(request.note());
    c.setUpdatedAt(Instant.now());
    c = candidateRepository.save(c);
    return new CandidateNoteResponse(c.getId(), c.getNote(), c.getUpdatedAt());
  }

  public record CandidateCvResource(Resource resource, String filename, String mimeType) {}

  @Transactional(readOnly = true)
  public CandidateCvResource getCandidateCv(UUID id) {
    Candidate c = candidateRepository.findById(id).orElseThrow(() -> AppException.notFound("Không tìm thấy ứng viên"));
    if (c.getResumeURL() == null || c.getResumeURL().isBlank()) {
      throw AppException.notFound("Ứng viên chưa có file CV đính kèm");
    }
    String resumeUrl = c.getResumeURL();
    String rawFilename = resumeUrl.substring(resumeUrl.lastIndexOf('/') + 1);
    Path filePath = Paths.get(storagePath, "resumes", rawFilename);
    if (!Files.exists(filePath)) {
      try (var stream = Files.list(Paths.get(storagePath, "resumes"))) {
        var match = stream.filter(p -> p.getFileName().toString().startsWith(rawFilename)).findFirst();
        if (match.isPresent()) {
          filePath = match.get();
        }
      } catch (IOException ignored) {}
    }
    if (!Files.exists(filePath)) {
      throw AppException.notFound("Không tìm thấy file CV trên hệ thống");
    }
    Resource resource = new FileSystemResource(filePath.toFile());
    String mimeType = "application/pdf";
    try {
      byte[] bytes = Files.readAllBytes(filePath);
      String detected = fileUtils.detectMIMEType(bytes);
      if (detected != null && !detected.isBlank()) {
        mimeType = detected;
      }
    } catch (IOException ignored) {}

    String extension = fileUtils.getExtensionFromMimeType(mimeType);
    String downloadFilename = rawFilename;
    if (!downloadFilename.contains(".") && !extension.isBlank()) {
      downloadFilename = downloadFilename + extension;
    }
    return new CandidateCvResource(resource, downloadFilename, mimeType);
  }
  @Transactional
  public PageResponse<RecruitmentResponse> getPublicRecruitments(
    int page,
    int size,
    UUID departmentId,
    EmploymentType employmentType,
    String location,
    String search
  ) {
    autoCloseExpiredRecruitments();
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("createdAt").descending());
    Page<Recruitment> result = recruitmentRepository.findAll(RecruitmentSpecs.publicFilter(departmentId, employmentType, location, search), pageable);
    List<RecruitmentResponse> items = result.getContent().stream().map(this::mapToPublicItemResponse).toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional
  public RecruitmentResponse getPublicRecruitmentBySlug(String slug) {
    autoCloseExpiredRecruitments();
    Recruitment r = recruitmentRepository.findBySlug(slug)
      .orElseThrow(() -> AppException.notFound("Không tìm thấy tin tuyển dụng"));
    if (r.getStatus() == RecruitmentStatus.draft) {
      throw AppException.notFound("Không tìm thấy tin tuyển dụng");
    }
    redisTemplate.opsForValue().increment("viewCount:recruitment:" + r.getId());
    return mapToPublicDetailResponse(r);
  }
  @Transactional
  public void applyCandidate(ApplyCandidateRequest request) {
    autoCloseExpiredRecruitments();
    Recruitment r = recruitmentRepository.findById(request.recruitmentId())
      .orElseThrow(() -> AppException.notFound("Không tìm thấy tin tuyển dụng"));
    if (r.getStatus() == RecruitmentStatus.closed || (r.getExpiresAt() != null && r.getExpiresAt().isBefore(Instant.now()))) {
      if (r.getStatus() != RecruitmentStatus.closed) {
        r.setStatus(RecruitmentStatus.closed);
        recruitmentRepository.save(r);
      }
      throw AppException.badRequest("Tin tuyển dụng này đã hết hạn nhận hồ sơ ứng tuyển.");
    }
    if (r.getStatus() != RecruitmentStatus.hiring) {
      throw AppException.badRequest("Tin tuyển dụng này không ở trạng thái nhận hồ sơ.");
    }
    if (request.fullname() == null || !request.fullname().trim().matches("^[\\p{L}\\s]+$")) {
      throw AppException.badRequest("Họ và tên chỉ được chứa chữ cái và khoảng trắng");
    }
    if (request.email() == null || !request.email().trim().matches("^(?!\\.)(?!.*\\.\\.)[a-zA-Z0-9._%+-]+@(?i)[a-z0-9-]+(\\.[a-z0-9-]+)*\\.[a-z]{2,}$")) {
      throw AppException.badRequest("Địa chỉ email không hợp lệ");
    }
    if (request.phone() != null && !request.phone().trim().matches("^(?!0{10})\\d{10}$")) {
      throw AppException.badRequest("Số điện thoại phải gồm đúng 10 chữ số hợp lệ");
    }
    if (candidateRepository.existsByRecruitmentIdAndEmail(r.getId(), request.email().trim()) || (request.phone() != null && candidateRepository.existsByRecruitmentIdAndPhone(r.getId(), request.phone().trim()))) {
      throw AppException.badRequest("Bạn đã ứng tuyển công việc này trước đó rồi. Vui lòng gửi lại CV qua email ada.agency.group@gmail.com nếu cần cập nhật!");
    }
    Candidate candidate = Candidate.builder()
      .recruitment(r)
      .fullname(request.fullname().trim())
      .email(request.email().trim())
      .phone(request.phone() != null ? request.phone().trim() : null)
      .resumeURL(request.resumeURL())
      .message(request.message())
      .build();
    try {
      candidateRepository.save(candidate);
    } catch (org.springframework.dao.DataIntegrityViolationException e) {
      throw AppException.badRequest("Bạn đã ứng tuyển công việc này trước đó rồi. Vui lòng gửi lại CV qua email ada.agency.group@gmail.com nếu cần cập nhật!");
    }
    notificationService.createAndBroadcast(
      "Tin Nhắn Từ Ứng Viên Mới",
      "Ứng Viên " + request.fullname() + " Đã Ứng Tuyển Vị Trí " + r.getJobTitle() + ".",
      NotificationType.recruitments
    );
  }
  @Transactional
  public void applyJob(UUID recruitmentId, String fullname, String email, String phone, String message, MultipartFile resume) {
    autoCloseExpiredRecruitments();
    Recruitment r = recruitmentRepository.findById(recruitmentId)
      .orElseThrow(() -> AppException.notFound("Không tìm thấy tin tuyển dụng"));
    if (r.getStatus() == RecruitmentStatus.closed || (r.getExpiresAt() != null && r.getExpiresAt().isBefore(Instant.now()))) {
      if (r.getStatus() != RecruitmentStatus.closed) {
        r.setStatus(RecruitmentStatus.closed);
        recruitmentRepository.save(r);
      }
      throw AppException.badRequest("Tin tuyển dụng này đã hết hạn nhận hồ sơ ứng tuyển.");
    }
    if (r.getStatus() != RecruitmentStatus.hiring) {
      throw AppException.badRequest("Tin tuyển dụng này không ở trạng thái nhận hồ sơ.");
    }
    if (fullname == null || !fullname.trim().matches("^[\\p{L}\\s]+$")) {
      throw AppException.badRequest("Họ và tên chỉ được chứa chữ cái và khoảng trắng");
    }
    if (email == null || !email.trim().matches("^(?!\\.)(?!.*\\.\\.)[a-zA-Z0-9._%+-]+@(?i)[a-z0-9-]+(\\.[a-z0-9-]+)*\\.[a-z]{2,}$")) {
      throw AppException.badRequest("Địa chỉ email không hợp lệ");
    }
    if (phone == null || !phone.trim().matches("^(?!0{10})\\d{10}$")) {
      throw AppException.badRequest("Số điện thoại phải gồm đúng 10 chữ số hợp lệ");
    }
    if (candidateRepository.existsByRecruitmentIdAndEmail(recruitmentId, email.trim()) || candidateRepository.existsByRecruitmentIdAndPhone(recruitmentId, phone.trim())) {
      throw AppException.badRequest("Bạn đã ứng tuyển công việc này trước đó rồi. Vui lòng gửi lại CV qua email ada.agency.group@gmail.com nếu cần cập nhật!");
    }
    String resumeURL = fileUtils.uploadFile(resume, "resumes");
    Candidate candidate = Candidate.builder()
      .recruitment(r)
      .fullname(fullname.trim())
      .email(email.trim())
      .phone(phone.trim())
      .resumeURL(resumeURL)
      .message(message)
      .build();
    try {
      candidateRepository.save(candidate);
    } catch (org.springframework.dao.DataIntegrityViolationException e) {
      throw AppException.badRequest("Bạn đã ứng tuyển công việc này trước đó rồi. Vui lòng gửi lại CV qua email ada.agency.group@gmail.com nếu cần cập nhật!");
    }
    notificationService.createAndBroadcast(
      "Tin Nhắn Từ Ứng Viên Mới",
      "Ứng Viên " + fullname + " Đã Ứng Tuyển Vị Trí " + r.getJobTitle() + ".",
      NotificationType.recruitments
    );
  }
  @Scheduled(fixedDelay = 60000)
  @Transactional
  public void syncViewCountsToDatabase() {
    var keys = redisTemplate.keys("viewCount:recruitment:*");
    if (keys != null) {
      for (String key : keys) {
        String val = redisTemplate.opsForValue().getAndDelete(key);
        if (val != null) {
          int count = Integer.parseInt(val);
          String idStr = key.substring("viewCount:recruitment:".length());
          recruitmentRepository.incrementViewCount(UUID.fromString(idStr), count);
        }
      }
    }
  }
  private RecruitmentResponse mapToPublicItemResponse(Recruitment r) {
    return new RecruitmentResponse(
      r.getId(),
      r.getJobTitle(),
      r.getSlug(),
      r.getDepartment() != null ? r.getDepartment().getId() : null,
      r.getDepartment() != null ? r.getDepartment().getName() : null,
      null,
      null,
      r.getLocation(),
      r.getEmploymentType(),
      null,
      r.getDescription(),
      null,
      null,
      r.getCoverImageURL(),
      r.getStatus(),
      r.getMinSalary(),
      r.getMaxSalary(),
      r.getIsNegotiable(),
      null,
      null,
      null,
      r.getExpiresAt(),
      r.getUpdatedAt(),
      r.getCreatedAt()
    );
  }
  private RecruitmentResponse mapToPublicDetailResponse(Recruitment r) {
    return new RecruitmentResponse(
      r.getId(),
      r.getJobTitle(),
      r.getSlug(),
      r.getDepartment() != null ? r.getDepartment().getId() : null,
      r.getDepartment() != null ? r.getDepartment().getName() : null,
      null,
      null,
      r.getLocation(),
      r.getEmploymentType(),
      r.getWorkingHours(),
      r.getDescription(),
      r.getRequirements(),
      r.getBenefits(),
      r.getCoverImageURL(),
      r.getStatus(),
      r.getMinSalary(),
      r.getMaxSalary(),
      r.getIsNegotiable(),
      r.getRequiredCandidateNum(),
      null,
      r.getViewCount(),
      r.getExpiresAt(),
      r.getUpdatedAt(),
      r.getCreatedAt()
    );
  }
  private RecruitmentResponse mapToAdminItemResponse(Recruitment r, Long applicantCount) {
    return new RecruitmentResponse(
      r.getId(),
      r.getJobTitle(),
      r.getSlug(),
      r.getDepartment() != null ? r.getDepartment().getId() : null,
      r.getDepartment() != null ? r.getDepartment().getName() : null,
      null,
      null,
      r.getLocation(),
      r.getEmploymentType(),
      null,
      null,
      null,
      null,
      null,
      r.getStatus(),
      null,
      null,
      null,
      null,
      applicantCount,
      null,
      r.getExpiresAt(),
      null,
      r.getCreatedAt()
    );
  }
  private RecruitmentResponse mapToResponse(Recruitment r) {
    long count = candidateRepository.countByRecruitmentId(r.getId());
    return mapToResponseWithCount(r, count);
  }
  private RecruitmentResponse mapToResponseWithCount(Recruitment r, Long applicantCount) {
    return new RecruitmentResponse(
      r.getId(),
      r.getJobTitle(),
      r.getSlug(),
      r.getDepartment() != null ? r.getDepartment().getId() : null,
      r.getDepartment() != null ? r.getDepartment().getName() : null,
      r.getRecruiter() != null ? r.getRecruiter().getId() : null,
      r.getRecruiter() != null ? r.getRecruiter().getFullname() : null,
      r.getLocation(),
      r.getEmploymentType(),
      r.getWorkingHours(),
      r.getDescription(),
      r.getRequirements(),
      r.getBenefits(),
      r.getCoverImageURL(),
      r.getStatus(),
      r.getMinSalary(),
      r.getMaxSalary(),
      r.getIsNegotiable(),
      r.getRequiredCandidateNum(),
      applicantCount,
      r.getViewCount(),
      r.getExpiresAt(),
      r.getUpdatedAt(),
      r.getCreatedAt()
    );
  }
  private CandidateDTO mapToCandidateListItemDTO(Candidate c) {
    return new CandidateDTO(
      c.getId(),
      c.getRecruitment() != null ? c.getRecruitment().getId() : null,
      c.getRecruitment() != null ? c.getRecruitment().getJobTitle() : null,
      null,
      null,
      c.getFullname(),
      c.getEmail(),
      null,
      null,
      null,
      c.getStatus(),
      c.getFeedbackContent(),
      c.getFeedbackAttachmentURL(),
      c.getFeedbackSentAt(),
      c.getNote(),
      c.getAppliedAt(),
      null,
      null,
      c.getUpdatedAt()
    );
  }
  private CandidateDTO mapToCandidateDTO(Candidate c) {
    Recruitment r = c.getRecruitment();
    return new CandidateDTO(
      c.getId(),
      r != null ? r.getId() : null,
      r != null ? r.getJobTitle() : null,
      r != null ? r.getLocation() : null,
      r != null ? r.getEmploymentType() : null,
      c.getFullname(),
      c.getEmail(),
      c.getPhone(),
      c.getResumeURL(),
      c.getMessage(),
      c.getStatus(),
      c.getFeedbackContent(),
      c.getFeedbackAttachmentURL(),
      c.getFeedbackSentAt(),
      c.getNote(),
      c.getAppliedAt(),
      r != null ? r.getExpiresAt() : null,
      r != null ? r.getCreatedAt() : null,
      c.getUpdatedAt()
    );
  }
  private String generateSlug(String title) {
    String text = title.replace("đ", "d").replace("Đ", "d");
    String normalized = Normalizer.normalize(text, Normalizer.Form.NFD);
    String clean = nonLatin.matcher(normalized).replaceAll(" ");
    String[] words = whitespace.matcher(clean).replaceAll(" ").trim().split("\\s+");
    StringBuilder sb = new StringBuilder();
    for (String w : words) {
      String word = w.toLowerCase(Locale.ENGLISH);
      if (word.isEmpty()) {
        continue;
      }
      if (sb.length() == 0) {
        sb.append(word);
      } else {
        sb.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1));
      }
    }
    String baseSlug = sb.toString();
    if (baseSlug.isBlank()) {
      baseSlug = "job" + UUID.randomUUID().toString().replaceAll("[^a-zA-Z0-9]", "").substring(0, 8);
    }
    String finalSlug = baseSlug;
    int counter = 1;
    while (recruitmentRepository.existsBySlug(finalSlug)) {
      finalSlug = baseSlug + counter++;
    }
    return finalSlug;
  }
}