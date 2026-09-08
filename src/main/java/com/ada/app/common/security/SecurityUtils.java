package com.ada.app.common.security;
import com.ada.app.common.exception.AppException;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
public final class SecurityUtils {
  private SecurityUtils() {}
  public static UUID getCurrentUserId() {
    UUID userId = getCurrentUserIdOrNull();
    if (userId == null) {
      throw AppException.unauthorized("Unauthorized Access");
    }
    return userId;
  }
  public static UUID getCurrentUserIdOrNull() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || authentication.getPrincipal() == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
      return null;
    }
    try {
      return UUID.fromString(authentication.getName());
    } catch (IllegalArgumentException e) {
      return null;
    }
  }
  public static String getCurrentJTI() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.getDetails() instanceof JWTAuthenticationDetails details) {
      return details.jti();
    }
    return null;
  }
}