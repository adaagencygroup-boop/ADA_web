package com.ada.app.modules.news.controller;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.news.dto.NewsResponse;
import com.ada.app.modules.news.dto.PublicCategoryResponse;
import com.ada.app.modules.news.service.NewsService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/public")
@RequiredArgsConstructor
public class PublicNewsController {
  private final NewsService newsService;
  @GetMapping("/news")
  public ResponseEntity<APIResponse<PageResponse<NewsResponse>>> getPublicNews(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) UUID categoryId,
    @RequestParam(required = false) String search
  ) {
    return ResponseEntity.ok(APIResponse.ok("News Articles Retrieved Successfully", newsService.getPublicNews(page, size, categoryId, search)));
  }
  @GetMapping("/news/featured")
  public ResponseEntity<APIResponse<List<NewsResponse>>> getFeaturedNews(@RequestParam(defaultValue = "3") int limit) {
    return ResponseEntity.ok(APIResponse.ok("Featured News Retrieved Successfully", newsService.getFeaturedNews(limit)));
  }
  @GetMapping("/news/relevant")
  public ResponseEntity<APIResponse<List<NewsResponse>>> getRelevantNews(@RequestParam(defaultValue = "3") int limit) {
    return ResponseEntity.ok(APIResponse.ok("Relevant News Retrieved Successfully", newsService.getRelevantNews(limit)));
  }
  @GetMapping({"/newsCategories", "/news-categories"})
  public ResponseEntity<APIResponse<List<PublicCategoryResponse>>> getPublicCategories() {
    return ResponseEntity.ok(APIResponse.ok("Categories Retrieved Successfully", newsService.getPublicCategories()));
  }
  @GetMapping("/news/{slug}")
  public ResponseEntity<APIResponse<NewsResponse>> getNewsBySlug(@PathVariable String slug) {
    return ResponseEntity.ok(APIResponse.ok("News Article Retrieved Successfully", newsService.getPublicNewsBySlug(slug)));
  }
}