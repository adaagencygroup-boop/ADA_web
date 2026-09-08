package com.ada.app.modules.user.dto;
import com.ada.app.modules.user.enums.UserRole;
import java.time.Instant;
import java.util.UUID;
public record UserProfileResponse(
  UUID id,
  String username,
  String fullname,
  String email,
  String phone,
  UserRole role,
  Instant emailVerifiedAt,
  Instant createdAt
) {}