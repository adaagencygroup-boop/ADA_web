package com.ada.app.security;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.security.JWTAuthenticationDetails;
import com.ada.app.common.security.SecurityUtils;
import java.util.Collections;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
public class AuthorizationSecurityTest {
  @BeforeEach
  public void setUp() {
    SecurityContextHolder.clearContext();
  }
  @Test
  public void testGetCurrentUserIdUnauthenticatedThrowsUnauthorized() {
    AppException exception = Assertions.assertThrows(AppException.class, SecurityUtils::getCurrentUserId);
    Assertions.assertEquals(401, exception.getStatus().value());
    Assertions.assertEquals("Unauthorized Access", exception.getMessage());
  }
  @Test
  public void testGetCurrentUserIdAuthenticatedReturnsUUID() {
    UUID expectedId = UUID.randomUUID();
    String jti = UUID.randomUUID().toString();
    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
      expectedId.toString(),
      null,
      Collections.singletonList(new SimpleGrantedAuthority("admin"))
    );
    auth.setDetails(new JWTAuthenticationDetails("127.0.0.1", jti));
    SecurityContextHolder.getContext().setAuthentication(auth);
    UUID actualId = SecurityUtils.getCurrentUserId();
    String actualJTI = SecurityUtils.getCurrentJTI();
    Assertions.assertEquals(expectedId, actualId);
    Assertions.assertEquals(jti, actualJTI);
  }
}