package com.ada.app.modules.user.dto;
import com.ada.app.modules.user.enums.DeviceType;
import java.time.Instant;
import java.util.UUID;
public record SessionResponse(
  UUID sessionId,
  UUID deviceId,
  String deviceName,
  DeviceType deviceType,
  String OS,
  String browser,
  String IPAddress,
  boolean isCurrentSession,
  Instant lastSeenAt,
  Instant issuedAt
) {}