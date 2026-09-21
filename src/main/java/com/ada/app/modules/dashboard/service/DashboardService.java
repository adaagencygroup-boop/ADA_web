package com.ada.app.modules.dashboard.service;
import com.ada.app.modules.contact.enums.ContactStatus;
import com.ada.app.modules.contact.repository.ContactRepository;
import com.ada.app.modules.dashboard.dto.AdminDashboardResponse;
import com.ada.app.modules.dashboard.dto.ContactStatDTO;
import com.ada.app.modules.dashboard.dto.TopNewsStatDTO;
import com.ada.app.modules.dashboard.dto.TopRecruitmentStatDTO;
import com.ada.app.modules.news.entity.News;
import com.ada.app.modules.news.enums.NewsStatus;
import com.ada.app.modules.news.repository.NewsRepository;
import com.ada.app.modules.recruitment.entity.Recruitment;
import com.ada.app.modules.recruitment.enums.RecruitmentStatus;
import com.ada.app.modules.recruitment.repository.RecruitmentRepository;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class DashboardService {
  private final ContactRepository contactRepository;
  private final NewsRepository newsRepository;
  private final RecruitmentRepository recruitmentRepository;
  private static final DateTimeFormatter isoDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
  @Transactional(readOnly = true)
  public AdminDashboardResponse getDashboard(String range) {
    return getDashboard(range, null, null);
  }
  @Transactional(readOnly = true)
  public AdminDashboardResponse getDashboard(String range, String fromDate, String toDate) {
    LocalDate startLocalDate;
    LocalDate endLocalDate;
    int days;

    boolean isCustomDateRange = (fromDate != null && !fromDate.isBlank() && toDate != null && !toDate.isBlank());

    if (isCustomDateRange) {
      startLocalDate = parseLocalDate(fromDate);
      endLocalDate = parseLocalDate(toDate);
      if (startLocalDate.isAfter(endLocalDate)) {
        LocalDate tmp = startLocalDate;
        startLocalDate = endLocalDate;
        endLocalDate = tmp;
      }
      days = (int) ChronoUnit.DAYS.between(startLocalDate, endLocalDate) + 1;
    } else {
      days = parseRangeToDays(range);
      endLocalDate = LocalDate.now(ZoneOffset.UTC);
      startLocalDate = endLocalDate.minusDays(days - 1);
    }

    var startInstant = startLocalDate.atStartOfDay().toInstant(ZoneOffset.UTC);
    var endInstant = endLocalDate.plusDays(1).atStartOfDay().toInstant(ZoneOffset.UTC);

    List<Object[]> nativeResults = contactRepository.countDailyContactsBetweenNative(startInstant, endInstant);
    Map<String, Long> countMap = new HashMap<>();
    if (nativeResults != null) {
      for (Object[] row : nativeResults) {
        if (row != null && row.length >= 2 && row[0] != null && row[1] != null) {
          String dayStr = row[0].toString();
          long count = ((Number) row[1]).longValue();
          countMap.put(dayStr, count);
        }
      }
    }
    List<ContactStatDTO> contactStats = new ArrayList<>();
    for (int i = 0; i < days; i++) {
      LocalDate cur = startLocalDate.plusDays(i);
      String dateKey = cur.format(isoDateFormat);
      long count = countMap.getOrDefault(dateKey, 0L);
      contactStats.add(new ContactStatDTO(dateKey, count));
    }

    long totalNews;
    long totalRecruitments;
    long totalContacts;
    List<Recruitment> topRecruitList;
    List<News> topNewsList;

    if (isCustomDateRange) {
      totalNews = newsRepository.countByStatusAndCreatedAtBetween(NewsStatus.published, startInstant, endInstant);
      totalRecruitments = recruitmentRepository.countByStatusAndCreatedAtBetween(RecruitmentStatus.hiring, startInstant, endInstant);
      totalContacts = contactRepository.countByDeletedAtIsNullAndCreatedAtBetween(startInstant, endInstant);
      topRecruitList = recruitmentRepository.findByStatusAndCreatedAtBetweenOrderByViewCountDesc(RecruitmentStatus.hiring, startInstant, endInstant, PageRequest.of(0, 5));
      topNewsList = newsRepository.findByStatusAndCreatedAtBetweenOrderByViewCountDesc(NewsStatus.published, startInstant, endInstant, PageRequest.of(0, 5));
    } else {
      totalNews = newsRepository.countByStatus(NewsStatus.published);
      totalRecruitments = recruitmentRepository.countByStatus(RecruitmentStatus.hiring);
      totalContacts = contactRepository.countByDeletedAtIsNull();
      topRecruitList = recruitmentRepository.findByStatusOrderByViewCountDesc(RecruitmentStatus.hiring, PageRequest.of(0, 5));
      topNewsList = newsRepository.findByStatusOrderByViewCountDesc(NewsStatus.published, PageRequest.of(0, 5));
    }

    long totalRecruitViews = topRecruitList.stream().mapToLong(Recruitment::getViewCount).sum();
    List<TopRecruitmentStatDTO> topRecruitments = topRecruitList.stream().map(r -> {
      double percentage = totalRecruitViews > 0 ? Math.round((r.getViewCount() * 1000.0) / totalRecruitViews) / 10.0 : 0.0;
      return new TopRecruitmentStatDTO(r.getId(), r.getJobTitle(), r.getViewCount(), percentage);
    }).toList();
    List<TopNewsStatDTO> topNews = topNewsList.stream().map(n -> new TopNewsStatDTO(n.getId(), n.getTitle(), n.getViewCount())).toList();
    return new AdminDashboardResponse(
      totalNews,
      totalRecruitments,
      totalContacts,
      contactStats,
      topRecruitments,
      topNews
    );
  }
  private LocalDate parseLocalDate(String str) {
    try {
      if (str.contains("T")) {
        return OffsetDateTime.parse(str).toLocalDate();
      }
      return LocalDate.parse(str.substring(0, 10));
    } catch (Exception e) {
      return LocalDate.now(ZoneOffset.UTC);
    }
  }
  private int parseRangeToDays(String range) {
    if (range == null) {
      return 7;
    }
    return switch (range.trim().toLowerCase()) {
      case "30d", "30days", "month" -> 30;
      case "90d", "90days", "3m", "3months" -> 90;
      default -> 7;
    };
  }
}