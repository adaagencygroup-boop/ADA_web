package com.ada.app.common.util;
import com.ada.app.common.exception.AppException;
import jakarta.servlet.http.HttpServletRequest;
public final class IPUtils {
  private static final String[] ipHeaders = {
    "CF-Connecting-IP",
    "X-Forwarded-For",
    "X-Real-IP",
    "Proxy-Client-IP",
    "WL-Proxy-Client-IP",
    "HTTP_X_FORWARDED_FOR",
    "HTTP_CLIENT_IP"
  };
  private IPUtils() {}
  public static String getClientIP(HttpServletRequest request) {
    if (request == null) {
      throw AppException.badRequest("HTTP Request Context Missing");
    }
    String clientIP = null;
    for (String header : ipHeaders) {
      String value = request.getHeader(header);
      if (value != null && !value.isBlank() && !"unknown".equalsIgnoreCase(value.trim())) {
        clientIP = value;
        break;
      }
    }
    if (clientIP == null || clientIP.isBlank() || "unknown".equalsIgnoreCase(clientIP.trim())) {
      clientIP = request.getRemoteAddr();
    }
    if (clientIP != null && clientIP.contains(",")) {
      clientIP = clientIP.split(",")[0].trim();
    }
    if (clientIP == null || clientIP.isBlank()) {
      throw AppException.badRequest("Unable To Resolve Client IP Address");
    }
    String cleanIP = clientIP.trim();
    if ("0:0:0:0:0:0:0:1".equals(cleanIP) || "::1".equals(cleanIP)) {
      return "127.0.0.1";
    }
    return cleanIP;
  }
}