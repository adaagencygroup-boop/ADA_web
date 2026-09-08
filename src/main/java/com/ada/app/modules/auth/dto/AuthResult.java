package com.ada.app.modules.auth.dto;
import com.ada.app.modules.user.dto.UserProfileResponse;
public record AuthResult(
  String accessToken,
  String refreshToken,
  String tokenType,
  UserProfileResponse user
) {}