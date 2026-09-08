package com.ada.app.modules.news.service;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.security.SecurityUtils;
import com.ada.app.common.util.ExcelExportService;
import com.ada.app.modules.news.dto.CategoryResponse;
import com.ada.app.modules.news.dto.CreateCategoryRequest;
import com.ada.app.modules.news.dto.CreateNewsAdminRequest;
import com.ada.app.modules.news.dto.NewsResponse;
import com.ada.app.modules.news.dto.PublicCategoryResponse;
import com.ada.app.modules.news.dto.UpdateCategoryRequest;
import com.ada.app.modules.news.dto.UpdateNewsRequest;
import com.ada.app.modules.news.entity.News;
import com.ada.app.modules.news.entity.NewsCategory;
import com.ada.app.modules.news.enums.NewsStatus;
import com.ada.app.modules.news.repository.NewsCategoryRepository;
import com.ada.app.modules.news.repository.NewsRepository;
import com.ada.app.modules.news.repository.NewsSpecs;
import com.ada.app.modules.notification.enums.NotificationType;
import com.ada.app.modules.notification.service.NotificationService;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.repository.UserRepository;
import java.text.Normalizer;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
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
@Service
@RequiredArgsConstructor
public class NewsService {
  private final NewsRepository newsRepository;
  private final NewsCategoryRepository categoryRepository;
  private final UserRepository userRepository;
  private final NotificationService notificationService;
  private final StringRedisTemplate redisTemplate;
  private final ExcelExportService excelExportService;
  private static final Pattern nonLatin = Pattern.compile("[^a-zA-Z0-9\\s]");
  private static final Pattern whitespace = Pattern.compile("\\s+");
  @Transactional(readOnly = true)
  public PageResponse<NewsResponse> getAdminNews(
    int page,
    int size,
    NewsStatus status,
    UUID categoryId,
    Boolean isFeatured,
    String search,
    Instant fromDate,
    Instant toDate
  ) {
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("createdAt").descending());
    Page<News> result = newsRepository.findAll(NewsSpecs.adminFilter(status, categoryId, isFeatured, search, fromDate, toDate), pageable);
    List<NewsResponse> items = result.getContent().stream().map(this::mapToAdminItemResponse).toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional(readOnly = true)
  public NewsResponse getAdminNewsById(UUID id) {
    News news = newsRepository.findById(id).orElseThrow(() -> AppException.notFound("News Article Not Found"));
    return mapToResponse(news);
  }
  @Transactional
  public NewsResponse createNews(CreateNewsAdminRequest request) {
    UUID userId = SecurityUtils.getCurrentUserId();
    User author = userRepository.findById(userId).orElseThrow(() -> AppException.notFound("Author User Not Found"));
    NewsCategory category = categoryRepository.findById(request.categoryId()).orElseThrow(() -> AppException.notFound("Category Not Found"));
    String slug = generateSlug(request.title());
    News news = News.builder()
      .author(author)
      .category(category)
      .title(request.title().trim())
      .slug(slug)
      .content(request.content().trim())
      .coverImageURL(request.coverImageURL().trim())
      .status(request.status())
      .isFeatured(Boolean.TRUE.equals(request.isFeatured()))
      .build();
    news = newsRepository.save(news);
    if (news.getStatus() == NewsStatus.published) {
      notificationService.createAndBroadcast("Bài Viết Mới Được Đăng", "Bài Viết \"" + news.getTitle() + "\" Vừa Được Đăng", NotificationType.news);
    }
    return mapToResponse(news);
  }
  @Transactional
  public NewsResponse updateNews(UUID id, UpdateNewsRequest request) {
    News news = newsRepository.findById(id).orElseThrow(() -> AppException.notFound("News Article Not Found"));
    if (request.categoryId() != null) {
      NewsCategory category = categoryRepository.findById(request.categoryId()).orElseThrow(() -> AppException.notFound("Category Not Found"));
      news.setCategory(category);
    }
    if (request.title() != null && !request.title().isBlank()) {
      news.setTitle(request.title().trim());
    }
    if (request.content() != null && !request.content().isBlank()) {
      news.setContent(request.content().trim());
    }
    if (request.coverImageURL() != null && !request.coverImageURL().isBlank()) {
      news.setCoverImageURL(request.coverImageURL().trim());
    }
    if (request.status() != null) {
      boolean isNewlyPublished = news.getStatus() != NewsStatus.published && request.status() == NewsStatus.published;
      news.setStatus(request.status());
      if (isNewlyPublished) {
        notificationService.createAndBroadcast("Bài Viết Mới Được Đăng", "Bài Viết \"" + news.getTitle() + "\" Vừa Được Đăng", NotificationType.news);
      }
    }
    if (request.isFeatured() != null) {
      news.setIsFeatured(request.isFeatured());
    }
    news = newsRepository.save(news);
    return mapToResponse(news);
  }
  @Transactional
  public void deleteNews(UUID id) {
    News news = newsRepository.findById(id).orElseThrow(() -> AppException.notFound("News Article Not Found"));
    newsRepository.delete(news);
  }
  @Transactional(readOnly = true)
  public List<CategoryResponse> getAdminCategories(String search) {
    List<NewsCategory> categories = (search != null && !search.isBlank()) ? categoryRepository.findBySearch(search) : categoryRepository.findAll();
    return categories.stream()
      .map(c -> new CategoryResponse(c.getId(), c.getName(), c.getIsActive(), c.getCreatedAt()))
      .toList();
  }
  @Transactional
  public CategoryResponse createCategory(CreateCategoryRequest request) {
    if (categoryRepository.findByName(request.name()).isPresent()) {
      throw AppException.conflict("Category Name Already Exists");
    }
    NewsCategory category = NewsCategory.builder()
      .name(request.name())
      .isActive(request.isActive() != null ? request.isActive() : true)
      .build();
    category = categoryRepository.save(category);
    return new CategoryResponse(category.getId(), category.getName(), category.getIsActive(), category.getCreatedAt());
  }
  @Transactional
  public CategoryResponse updateCategory(UUID id, UpdateCategoryRequest request) {
    NewsCategory category = categoryRepository.findById(id).orElseThrow(() -> AppException.notFound("Category Not Found"));
    if (request.name() != null && !request.name().isBlank()) {
      category.setName(request.name().trim());
    }
    if (request.isActive() != null) {
      category.setIsActive(request.isActive());
    }
    category = categoryRepository.save(category);
    return new CategoryResponse(category.getId(), category.getName(), category.getIsActive(), category.getCreatedAt());
  }
  @Transactional
  public void deleteCategory(UUID id) {
    NewsCategory category = categoryRepository.findById(id).orElseThrow(() -> AppException.notFound("Category Not Found"));
    categoryRepository.delete(category);
  }
  @Transactional(readOnly = true)
  public PageResponse<NewsResponse> getPublicNews(int page, int size, UUID categoryId, String search) {
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("createdAt").descending());
    Page<News> result = newsRepository.findAll(NewsSpecs.publicFilter(categoryId, search), pageable);
    List<NewsResponse> items = result.getContent().stream().map(this::mapToPublicItemResponse).toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional(readOnly = true)
  public List<NewsResponse> getFeaturedNews(int limit) {
    Pageable pageable = PageRequest.of(0, Math.max(1, limit));
    return newsRepository.findByStatusAndIsFeaturedTrueOrderByCreatedAtDesc(NewsStatus.published, pageable).stream()
      .map(this::mapToFeaturedResponse)
      .toList();
  }
  @Transactional(readOnly = true)
  public List<NewsResponse> getRelevantNews(int limit) {
    return newsRepository.findRandomPublishedNews(Math.max(1, limit)).stream()
      .map(this::mapToFeaturedResponse)
      .toList();
  }
  @Transactional(readOnly = true)
  public List<PublicCategoryResponse> getPublicCategories() {
    return categoryRepository.findByIsActiveTrue().stream()
      .map(c -> new PublicCategoryResponse(c.getId(), c.getName()))
      .toList();
  }
  public NewsResponse getPublicNewsBySlug(String slug) {
    News news = newsRepository.findBySlugAndStatus(slug, NewsStatus.published)
      .orElseThrow(() -> AppException.notFound("News Article Not Found"));
    redisTemplate.opsForValue().increment("viewCount:news:" + news.getId());
    return mapToPublicDetailResponse(news);
  }
  @Scheduled(fixedDelay = 60000)
  @Transactional
  public void syncViewCountsToDatabase() {
    var keys = redisTemplate.keys("viewCount:news:*");
    if (keys != null) {
      for (String key : keys) {
        String val = redisTemplate.opsForValue().getAndDelete(key);
        if (val != null) {
          int count = Integer.parseInt(val);
          String idStr = key.substring("viewCount:news:".length());
          newsRepository.incrementViewCount(UUID.fromString(idStr), count);
        }
      }
    }
  }
  private NewsResponse mapToPublicDetailResponse(News n) {
    return new NewsResponse(
      n.getId(),
      n.getTitle(),
      n.getSlug(),
      n.getContent(),
      n.getCoverImageURL(),
      null,
      n.getViewCount(),
      null,
      n.getCategory() != null ? n.getCategory().getId() : null,
      n.getCategory() != null ? n.getCategory().getName() : null,
      null,
      n.getUpdatedAt(),
      n.getCreatedAt()
    );
  }
  private NewsResponse mapToPublicItemResponse(News n) {
    return new NewsResponse(
      n.getId(),
      n.getTitle(),
      n.getSlug(),
      n.getContent(),
      n.getCoverImageURL(),
      null,
      null,
      null,
      n.getCategory() != null ? n.getCategory().getId() : null,
      n.getCategory() != null ? n.getCategory().getName() : null,
      null,
      n.getUpdatedAt(),
      n.getCreatedAt()
    );
  }
  private NewsResponse mapToFeaturedResponse(News n) {
    return new NewsResponse(
      n.getId(),
      n.getTitle(),
      n.getSlug(),
      null,
      n.getCoverImageURL(),
      null,
      null,
      null,
      null,
      null,
      null,
      n.getUpdatedAt(),
      n.getCreatedAt()
    );
  }
  private NewsResponse mapToAdminItemResponse(News n) {
    return new NewsResponse(
      n.getId(),
      n.getTitle(),
      n.getSlug(),
      null,
      n.getCoverImageURL(),
      n.getStatus(),
      n.getViewCount(),
      n.getIsFeatured(),
      n.getCategory() != null ? n.getCategory().getId() : null,
      n.getCategory() != null ? n.getCategory().getName() : null,
      null,
      n.getUpdatedAt(),
      n.getCreatedAt()
    );
  }
  private NewsResponse mapToResponse(News n) {
    return new NewsResponse(
      n.getId(),
      n.getTitle(),
      n.getSlug(),
      n.getContent(),
      n.getCoverImageURL(),
      n.getStatus(),
      n.getViewCount(),
      n.getIsFeatured(),
      n.getCategory() != null ? n.getCategory().getId() : null,
      n.getCategory() != null ? n.getCategory().getName() : null,
      n.getAuthor() != null ? n.getAuthor().getFullname() : null,
      n.getUpdatedAt(),
      n.getCreatedAt()
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
      baseSlug = "news" + UUID.randomUUID().toString().replaceAll("[^a-zA-Z0-9]", "").substring(0, 8);
    }
    String finalSlug = baseSlug;
    int counter = 1;
    while (newsRepository.existsBySlug(finalSlug)) {
      finalSlug = baseSlug + counter++;
    }
    return finalSlug;
  }
  @Transactional(readOnly = true)
  public byte[] exportNewsExcel(NewsStatus status, UUID categoryId, Boolean isFeatured, String search, Instant fromDate, Instant toDate) {
    List<News> list = newsRepository.findAll(NewsSpecs.adminFilter(status, categoryId, isFeatured, search, fromDate, toDate), Sort.by("createdAt").descending());
    List<String> headers = List.of("ID", "Title", "Slug", "Category", "Status", "Featured", "View Count", "Author", "Created At", "Updated At");
    List<List<Object>> rows = new ArrayList<>();
    for (News n : list) {
      rows.add(List.of(
        n.getId().toString(),
        n.getTitle(),
        n.getSlug(),
        n.getCategory() != null ? n.getCategory().getName() : "",
        n.getStatus().name(),
        Boolean.TRUE.equals(n.getIsFeatured()) ? "Yes" : "No",
        n.getViewCount() != null ? n.getViewCount() : 0,
        n.getAuthor() != null ? n.getAuthor().getFullname() : "",
        n.getCreatedAt().toString(),
        n.getUpdatedAt() != null ? n.getUpdatedAt().toString() : ""
      ));
    }
    return excelExportService.exportToExcel("News", headers, rows);
  }
}