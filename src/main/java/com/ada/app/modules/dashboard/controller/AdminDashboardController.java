package com.ada.app.modules.dashboard.controller;
import com.ada.app.common.model.APIResponse;
import com.ada.app.modules.dashboard.dto.AdminDashboardResponse;
import com.ada.app.modules.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {
  private final DashboardService dashboardService;
  @GetMapping({"", "/analytics"})
  public ResponseEntity<APIResponse<AdminDashboardResponse>> getDashboard(
    @RequestParam(defaultValue = "7d") String range
  ) {
    return ResponseEntity.ok(APIResponse.ok("Dashboard Data Retrieved Successfully", dashboardService.getDashboard(range)));
  }
}