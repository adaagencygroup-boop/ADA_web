package com.ada.app.functional;
import com.ada.app.common.model.APIResponse;
import com.ada.app.modules.dashboard.controller.AdminDashboardController;
import com.ada.app.modules.dashboard.dto.AdminDashboardResponse;
import com.ada.app.modules.dashboard.dto.ContactStatDTO;
import com.ada.app.modules.dashboard.dto.TopNewsStatDTO;
import com.ada.app.modules.dashboard.dto.TopRecruitmentStatDTO;
import com.ada.app.modules.dashboard.service.DashboardService;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
public class AdminDashboardControllerFunctionalTest {
  private DashboardService dashboardService;
  private AdminDashboardController adminDashboardController;
  @BeforeEach
  public void setUp() {
    dashboardService = Mockito.mock(DashboardService.class);
    adminDashboardController = new AdminDashboardController(dashboardService);
  }
  @Test
  public void testGetDashboardEndpoint() {
    ContactStatDTO stat = new ContactStatDTO("2026-09-01", 5L);
    TopRecruitmentStatDTO topRecruit = new TopRecruitmentStatDTO(UUID.randomUUID(), "Backend Engineer", 150, 60.0);
    TopNewsStatDTO topNews = new TopNewsStatDTO(UUID.randomUUID(), "Annual Report 2026", 300);
    AdminDashboardResponse dashboardData = new AdminDashboardResponse(10, 5, 20, List.of(stat), List.of(topRecruit), List.of(topNews));
    Mockito.when(dashboardService.getDashboard("7d")).thenReturn(dashboardData);
    ResponseEntity<APIResponse<AdminDashboardResponse>> response = adminDashboardController.getDashboard("7d");
    Assertions.assertEquals(200, response.getStatusCode().value());
    Assertions.assertNotNull(response.getBody());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals(10, response.getBody().data().totalNews());
    Assertions.assertEquals(5, response.getBody().data().totalRecruitments());
    Assertions.assertEquals(20, response.getBody().data().totalContacts());
    Assertions.assertEquals(1, response.getBody().data().contactStats().size());
  }
}