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
import com.ada.app.modules.recruitment.enums.EmploymentType;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
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
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
@Service
@RequiredArgsConstructor
public class RecruitmentService {
  private final RecruitmentRepository recruitmentRepository;
  private final CandidateRepository candidateRepository;
  private final DepartmentRepository departmentRepository;
  private final UserRepository userRepository;
  private final NotificationService notificationService;
  private final ExcelExportService excelExportService;
  private final FileUtils fileUtils;
  private final StringRedisTemplate redisTemplate;
  private static final Pattern nonLatin = Pattern.compile("[^a-zA-Z0-9\\s]");
  private static final Pattern whitespace = Pattern.compile("\\s+");
  @Transactional(readOnly = true)
  public DashboardMetricsResponse getDashboardMetrics() {
    long activeCount = recruitmentRepository.countByStatus(RecruitmentStatus.hiring);
    long closedCount = recruitmentRepository.countByStatus(RecruitmentStatus.closed);
    long totalCandidatesCount = candidateRepository.count();
    Instant now = Instant.now();
    Instant soon = now.plus(7, ChronoUnit.DAYS);
    long expiringSoonCount = recruitmentRepository.countExpiringSoon(now, soon);
    return new DashboardMetricsResponse(activeCount, totalCandidatesCount, expiringSoonCount, closedCount);
  }
  @Transactional(readOnly = true)
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
  @Transactional(readOnly = true)
  public RecruitmentResponse getAdminRecruitmentById(UUID id) {
    Recruitment r = recruitmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Recruitment Not Found"));
    return mapToResponse(r);
  }
  @Transactional
  public RecruitmentResponse createRecruitment(CreateRecruitmentRequest request) {
    UUID userId = SecurityUtils.getCurrentUserId();
    User recruiter = userRepository.findById(userId).orElseThrow(() -> AppException.notFound("Recruiter User Not Found"));
    Department dept = null;
    if (request.departmentId() != null) {
      dept = departmentRepository.findById(request.departmentId()).orElseThrow(() -> AppException.notFound("Department Not Found"));
    }
    String slug = generateSlug(request.jobTitle());
    Recruitment r = Recruitment.builder()
      .recruiter(recruiter)
      .department(dept)
      .jobTitle(request.jobTitle())
      .slug(slug)
      .location(request.location())
      .employmentType(request.employmentType())
      .workingHours(request.workingHours())
      .description(request.description())
      .requirements(request.requirements())
      .benefits(request.benefits())
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
    Recruitment r = recruitmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Recruitment Not Found"));
    if (request.departmentId() != null) {
      Department dept = departmentRepository.findById(request.departmentId()).orElseThrow(() -> AppException.notFound("Department Not Found"));
      r.setDepartment(dept);
    }
    if (request.jobTitle() != null && !request.jobTitle().isBlank()) {
      r.setJobTitle(request.jobTitle().trim());
    }
    if (request.location() != null && !request.location().isBlank()) {
      r.setLocation(request.location().trim());
    }
    if (request.employmentType() != null) {
      r.setEmploymentType(request.employmentType());
    }
    if (request.workingHours() != null && !request.workingHours().isBlank()) {
      r.setWorkingHours(request.workingHours().trim());
    }
    if (request.description() != null && !request.description().isBlank()) {
      r.setDescription(request.description().trim());
    }
    if (request.requirements() != null && !request.requirements().isBlank()) {
      r.setRequirements(request.requirements().trim());
    }
    if (request.benefits() != null && !request.benefits().isBlank()) {
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
    if (request.isNegotiable() != null) {
      r.setIsNegotiable(request.isNegotiable());
    }
    if (request.requiredCandidateNum() != null) {
      r.setRequiredCandidateNum(request.requiredCandidateNum());
    }
    if (request.expiresAt() != null) {
      r.setExpiresAt(request.expiresAt());
    }
    r = recruitmentRepository.save(r);
    return mapToResponse(r);
  }
  @Transactional
  public void deleteRecruitment(UUID id) {
    Recruitment r = recruitmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Recruitment Not Found"));
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
  public byte[] exportCandidatesExcel(UUID recruitmentId, Instant fromDate, Instant toDate) {
    List<Candidate> list = candidateRepository.findAll(CandidateSpecs.filter(recruitmentId, null, fromDate, toDate), Sort.by("appliedAt").descending());
    List<String> headers = List.of("ID", "Recruitment", "Fullname", "Email", "Phone", "Resume URL", "Applied At", "Note");
    List<List<Object>> rows = new ArrayList<>();
    for (Candidate c : list) {
      rows.add(List.of(
        c.getId().toString(),
        c.getRecruitment() != null ? c.getRecruitment().getJobTitle() : "",
        c.getFullname(),
        c.getEmail() != null ? c.getEmail() : "",
        c.getPhone() != null ? c.getPhone() : "",
        c.getResumeURL() != null ? c.getResumeURL() : "",
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
      throw AppException.conflict("Department Name Already Exists");
    }
    Department d = Department.builder().name(request.name()).build();
    d = departmentRepository.save(d);
    return new DepartmentResponse(d.getId(), d.getName());
  }
  @Transactional
  public DepartmentResponse updateDepartment(UUID id, DepartmentRequest request) {
    Department d = departmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Department Not Found"));
    if (request.name() != null && !request.name().isBlank()) {
      d.setName(request.name().trim());
    }
    d = departmentRepository.save(d);
    return new DepartmentResponse(d.getId(), d.getName());
  }
  @Transactional
  public void deleteDepartment(UUID id) {
    Department d = departmentRepository.findById(id).orElseThrow(() -> AppException.notFound("Department Not Found"));
    departmentRepository.delete(d);
  }
  @Transactional(readOnly = true)
  public PageResponse<CandidateDTO> getCandidates(int page, int size, UUID recruitmentId, String search, Instant fromDate, Instant toDate) {
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("appliedAt").descending());
    Page<Candidate> result = candidateRepository.findAll(CandidateSpecs.filter(recruitmentId, search, fromDate, toDate), pageable);
    List<CandidateDTO> items = result.getContent().stream().map(this::mapToCandidateListItemDTO).toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional(readOnly = true)
  public CandidateDTO getCandidateById(UUID id) {
    Candidate c = candidateRepository.findById(id).orElseThrow(() -> AppException.notFound("Candidate Not Found"));
    return mapToCandidateDTO(c);
  }
  @Transactional
  public CandidateNoteResponse updateCandidateNote(UUID id, CandidateNoteRequest request) {
    Candidate c = candidateRepository.findById(id).orElseThrow(() -> AppException.notFound("Candidate Not Found"));
    c.setNote(request.note());
    c.setUpdatedAt(Instant.now());
    c = candidateRepository.save(c);
    return new CandidateNoteResponse(c.getId(), c.getNote(), c.getUpdatedAt());
  }
  @Transactional(readOnly = true)
  public PageResponse<RecruitmentResponse> getPublicRecruitments(
    int page,
    int size,
    UUID departmentId,
    EmploymentType employmentType,
    String location,
    String search
  ) {
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("createdAt").descending());
    Page<Recruitment> result = recruitmentRepository.findAll(RecruitmentSpecs.publicFilter(departmentId, employmentType, location, search), pageable);
    List<RecruitmentResponse> items = result.getContent().stream().map(this::mapToPublicItemResponse).toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  public RecruitmentResponse getPublicRecruitmentBySlug(String slug) {
    Recruitment r = recruitmentRepository.findBySlugAndStatus(slug, RecruitmentStatus.hiring)
      .orElseThrow(() -> AppException.notFound("Recruitment Not Found"));
    redisTemplate.opsForValue().increment("viewCount:recruitment:" + r.getId());
    return mapToPublicDetailResponse(r);
  }
  @Transactional
  public void applyCandidate(ApplyCandidateRequest request) {
    Recruitment r = recruitmentRepository.findById(request.recruitmentId())
      .orElseThrow(() -> AppException.notFound("Recruitment Not Found"));
    if (r.getStatus() != RecruitmentStatus.hiring) {
      throw AppException.badRequest("Recruitment Is Not Currently Open");
    }
    Candidate candidate = Candidate.builder()
      .recruitment(r)
      .fullname(request.fullname())
      .email(request.email())
      .phone(request.phone())
      .resumeURL(request.resumeURL())
      .message(request.message())
      .build();
    candidateRepository.save(candidate);
    notificationService.createAndBroadcast(
      "Tin Nhắn Từ Ứng Viên Mới",
      "Ứng Viên " + request.fullname() + " Đã Ứng Tuyển Vị Trí " + r.getJobTitle() + ".",
      NotificationType.recruitments
    );
  }
  @Transactional
  public void applyJob(UUID recruitmentId, String fullname, String email, String phone, String message, MultipartFile resume) {
    Recruitment r = recruitmentRepository.findById(recruitmentId)
      .orElseThrow(() -> AppException.notFound("Recruitment Not Found"));
    if (r.getStatus() != RecruitmentStatus.hiring) {
      throw AppException.badRequest("Recruitment Is Not Currently Open");
    }
    String resumeURL = fileUtils.uploadFile(resume, "resumes");
    Candidate candidate = Candidate.builder()
      .recruitment(r)
      .fullname(fullname)
      .email(email)
      .phone(phone)
      .resumeURL(resumeURL)
      .message(message)
      .build();
    candidateRepository.save(candidate);
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
      null,
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
      null,
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
      null,
      c.getAppliedAt(),
      null,
      null,
      null
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