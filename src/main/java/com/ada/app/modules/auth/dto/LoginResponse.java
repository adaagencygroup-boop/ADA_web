package com.ada.app.modules.auth.dto;
import com.ada.app.modules.user.dto.UserProfileResponse;
public record LoginResponse(
  String accessToken,
  String tokenType,
  UserProfileResponse user
) {}