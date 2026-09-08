package com.ada.app.modules.dashboard.dto;
import java.util.List;
public record AdminDashboardResponse(
  long totalNews,
  long totalRecruitments,
  long totalContacts,
  List<ContactStatDTO> contactStats,
  List<TopRecruitmentStatDTO> topRecruitments,
  List<TopNewsStatDTO> topNews
) {}