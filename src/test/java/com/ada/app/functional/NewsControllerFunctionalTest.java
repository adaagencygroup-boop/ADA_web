package com.ada.app.functional;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.util.FileUtils;
import com.ada.app.modules.news.controller.AdminNewsController;
import com.ada.app.modules.news.controller.PublicNewsController;
import com.ada.app.modules.news.dto.CategoryResponse;
import com.ada.app.modules.news.dto.CreateCategoryRequest;
import com.ada.app.modules.news.dto.CreateNewsAdminRequest;
import com.ada.app.modules.news.dto.NewsResponse;
import com.ada.app.modules.news.dto.PublicCategoryResponse;
import com.ada.app.modules.news.dto.UpdateCategoryRequest;
import com.ada.app.modules.news.dto.UpdateNewsRequest;
import com.ada.app.modules.news.enums.NewsStatus;
import com.ada.app.modules.news.service.NewsService;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
public class NewsControllerFunctionalTest {
  private NewsService newsService;
  private FileUtils fileUtils;
  private AdminNewsController adminNewsController;
  private PublicNewsController publicNewsController;
  @BeforeEach
  public void setUp() {
    newsService = Mockito.mock(NewsService.class);
    fileUtils = Mockito.mock(FileUtils.class);
    adminNewsController = new AdminNewsController(newsService, fileUtils);
    publicNewsController = new PublicNewsController(newsService);
  }
  @Test
  public void testAdminNewsEndpoints() {
    UUID newsId = UUID.randomUUID();
    NewsResponse newsData = new NewsResponse(newsId, "Kiến Trúc Backend AI 2026", "kienTrucBackendAI2026", "Tối Ưu Hiệu Năng Backend Với AI", "https://ada.com/files/media/backendCover.jpg", NewsStatus.published, 10, true, UUID.randomUUID(), "Backend & AI", "Alexander Nguyen", Instant.now(), Instant.now());
    PageResponse<NewsResponse> pageResponse = new PageResponse<>(List.of(newsData), new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(newsService.getAdminNews(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(pageResponse);
    ResponseEntity<APIResponse<PageResponse<NewsResponse>>> getPage = adminNewsController.getNews(1, 10, null, null, null, null, null, null);
    Assertions.assertEquals(200, getPage.getStatusCode().value());
    Assertions.assertEquals(1, getPage.getBody().data().items().size());
    Mockito.when(newsService.getAdminNewsById(newsId)).thenReturn(newsData);
    ResponseEntity<APIResponse<NewsResponse>> getDetail = adminNewsController.getNewsById(newsId);
    Assertions.assertEquals(200, getDetail.getStatusCode().value());
    Assertions.assertEquals("kienTrucBackendAI2026", getDetail.getBody().data().slug());
    CreateNewsAdminRequest createRequest = new CreateNewsAdminRequest("Kiến Trúc Backend AI 2026", UUID.randomUUID(), "Tối Ưu Hiệu Năng Backend Với AI", "https://ada.com/files/media/backendCover.jpg", NewsStatus.published, true);
    Mockito.when(newsService.createNews(createRequest)).thenReturn(newsData);
    ResponseEntity<APIResponse<NewsResponse>> createResp = adminNewsController.createNews(createRequest);
    Assertions.assertEquals(201, createResp.getStatusCode().value());
    UpdateNewsRequest updateRequest = new UpdateNewsRequest("Kiến Trúc Backend AI 2026 - Cập Nhật", UUID.randomUUID(), "Tích Hợp CI/CD DevOps Cho Backend", "https://ada.com/files/media/backendCover2.jpg", NewsStatus.published, true);
    Mockito.when(newsService.updateNews(newsId, updateRequest)).thenReturn(newsData);
    ResponseEntity<APIResponse<NewsResponse>> updateResp = adminNewsController.updateNews(newsId, updateRequest);
    Assertions.assertEquals(200, updateResp.getStatusCode().value());
    Mockito.doNothing().when(newsService).deleteNews(newsId);
    ResponseEntity<APIResponse<Void>> deleteResp = adminNewsController.deleteNews(newsId);
    Assertions.assertEquals(200, deleteResp.getStatusCode().value());
    byte[] excelBytes = new byte[]{0x50, 0x4B, 0x03, 0x04};
    Mockito.when(newsService.exportNewsExcel(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(excelBytes);
    ResponseEntity<byte[]> exportResp = adminNewsController.exportNewsExcel(null, null, null, null, null, null);
    Assertions.assertEquals(200, exportResp.getStatusCode().value());
    Assertions.assertTrue(exportResp.getHeaders().getFirst(HttpHeaders.CONTENT_DISPOSITION).contains("news.xlsx"));
  }
  @Test
  public void testAdminNewsCategoriesEndpoints() {
    UUID categoryId = UUID.randomUUID();
    CategoryResponse catResponse = new CategoryResponse(categoryId, "DevOps", true, Instant.now());
    Mockito.when(newsService.getAdminCategories(ArgumentMatchers.any())).thenReturn(List.of(catResponse));
    ResponseEntity<APIResponse<List<CategoryResponse>>> getCats = adminNewsController.getCategories(null);
    Assertions.assertEquals(200, getCats.getStatusCode().value());
    Assertions.assertEquals(1, getCats.getBody().data().size());
    CreateCategoryRequest createCatReq = new CreateCategoryRequest("DevOps", true);
    Mockito.when(newsService.createCategory(createCatReq)).thenReturn(catResponse);
    ResponseEntity<APIResponse<CategoryResponse>> createCat = adminNewsController.createCategory(createCatReq);
    Assertions.assertEquals(201, createCat.getStatusCode().value());
    UpdateCategoryRequest updateCatReq = new UpdateCategoryRequest("Trí Tuệ Nhân Tạo AI", true);
    Mockito.when(newsService.updateCategory(categoryId, updateCatReq)).thenReturn(catResponse);
    ResponseEntity<APIResponse<CategoryResponse>> updateCat = adminNewsController.updateCategory(categoryId, updateCatReq);
    Assertions.assertEquals(200, updateCat.getStatusCode().value());
    Mockito.doNothing().when(newsService).deleteCategory(categoryId);
    ResponseEntity<APIResponse<Void>> deleteCat = adminNewsController.deleteCategory(categoryId);
    Assertions.assertEquals(200, deleteCat.getStatusCode().value());
  }
  @Test
  public void testAdminMediaUploadEndpoint() {
    MockMultipartFile file = new MockMultipartFile("file", "devopsDiagram.png", "image/png", new byte[]{(byte) 0x89, 0x50, 0x4E, 0x47});
    Mockito.when(fileUtils.uploadFile(ArgumentMatchers.any(), ArgumentMatchers.eq("media"))).thenReturn("https://ada.com/files/media/devopsDiagram.png");
    ResponseEntity<APIResponse<Map<String, Object>>> uploadResp = adminNewsController.uploadMedia(file);
    Assertions.assertEquals(200, uploadResp.getStatusCode().value());
    Assertions.assertNotNull(uploadResp.getBody());
    Assertions.assertEquals("https://ada.com/files/media/devopsDiagram.png", uploadResp.getBody().data().get("fileURL"));
  }
  @Test
  public void testPublicNewsEndpoints() {
    NewsResponse publicNews = new NewsResponse(UUID.randomUUID(), "Tự Động Hóa DevOps Với AI", "tuDongHoaDevOpsVoiAI", "Ứng Dụng AI Trong Vận Hành DevOps", "https://ada.com/files/media/devopsCover.png", null, 100, null, UUID.randomUUID(), "DevOps", null, Instant.now(), Instant.now());
    PageResponse<NewsResponse> page = new PageResponse<>(List.of(publicNews), new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(newsService.getPublicNews(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(page);
    ResponseEntity<APIResponse<PageResponse<NewsResponse>>> getPublic = publicNewsController.getPublicNews(1, 10, null, null);
    Assertions.assertEquals(200, getPublic.getStatusCode().value());
    Mockito.when(newsService.getFeaturedNews(3)).thenReturn(List.of(publicNews));
    ResponseEntity<APIResponse<List<NewsResponse>>> getFeatured = publicNewsController.getFeaturedNews(3);
    Assertions.assertEquals(200, getFeatured.getStatusCode().value());
    Mockito.when(newsService.getRelevantNews(3)).thenReturn(List.of(publicNews));
    ResponseEntity<APIResponse<List<NewsResponse>>> getRelevant = publicNewsController.getRelevantNews(3);
    Assertions.assertEquals(200, getRelevant.getStatusCode().value());
    PublicCategoryResponse publicCat = new PublicCategoryResponse(UUID.randomUUID(), "DevOps");
    Mockito.when(newsService.getPublicCategories()).thenReturn(List.of(publicCat));
    ResponseEntity<APIResponse<List<PublicCategoryResponse>>> getPublicCats = publicNewsController.getPublicCategories();
    Assertions.assertEquals(200, getPublicCats.getStatusCode().value());
    Mockito.when(newsService.getPublicNewsBySlug("tuDongHoaDevOpsVoiAI")).thenReturn(publicNews);
    ResponseEntity<APIResponse<NewsResponse>> getBySlug = publicNewsController.getNewsBySlug("tuDongHoaDevOpsVoiAI");
    Assertions.assertEquals(200, getBySlug.getStatusCode().value());
    Assertions.assertEquals("tuDongHoaDevOpsVoiAI", getBySlug.getBody().data().slug());
  }
}