package com.ada.app.security;
import com.ada.app.common.security.JWTAuthenticationFilter;
import com.ada.app.common.security.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.lang.reflect.Field;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
public class JTIBlacklistSecurityTest {
  private JWTService jwtService;
  private StringRedisTemplate redisTemplate;
  private JWTAuthenticationFilter jwtAuthenticationFilter;
  @BeforeEach
  public void setUp() throws Exception {
    SecurityContextHolder.clearContext();
    jwtService = new JWTService();
    Field secretField = JWTService.class.getDeclaredField("jwtSecret");
    secretField.setAccessible(true);
    byte[] secretBytes = new byte[32];
    new java.security.SecureRandom().nextBytes(secretBytes);
    secretField.set(jwtService, java.util.Base64.getEncoder().encodeToString(secretBytes));
    Field accessExpField = JWTService.class.getDeclaredField("accessExpirationSeconds");
    accessExpField.setAccessible(true);
    accessExpField.set(jwtService, 900L);
    Field refreshExpField = JWTService.class.getDeclaredField("refreshExpirationSeconds");
    refreshExpField.setAccessible(true);
    refreshExpField.set(jwtService, 604800L);
    redisTemplate = Mockito.mock(StringRedisTemplate.class);
    jwtAuthenticationFilter = new JWTAuthenticationFilter(jwtService, redisTemplate);
  }
  @Test
  public void testBlacklistedJTIIsBlockedFromAuthentication() throws Exception {
    UUID userId = UUID.randomUUID();
    String revokedJTI = UUID.randomUUID().toString();
    String realToken = jwtService.generateAccessToken(userId, "admin", revokedJTI);
    Mockito.when(redisTemplate.hasKey("blacklist:" + revokedJTI)).thenReturn(true);
    HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
    HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
    FilterChain filterChain = Mockito.mock(FilterChain.class);
    Mockito.when(request.getHeader("Authorization")).thenReturn("Bearer " + realToken);
    Mockito.when(request.getRemoteAddr()).thenReturn("127.0.0.1");
    jwtAuthenticationFilter.doFilter(request, response, filterChain);
    Assertions.assertNull(SecurityContextHolder.getContext().getAuthentication());
    Mockito.verify(filterChain).doFilter(request, response);
  }
  @Test
  public void testActiveJTIPassesAuthentication() throws Exception {
    UUID userId = UUID.randomUUID();
    String activeJTI = UUID.randomUUID().toString();
    String realToken = jwtService.generateAccessToken(userId, "admin", activeJTI);
    Mockito.when(redisTemplate.hasKey("blacklist:" + activeJTI)).thenReturn(false);
    HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
    HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
    FilterChain filterChain = Mockito.mock(FilterChain.class);
    Mockito.when(request.getHeader("Authorization")).thenReturn("Bearer " + realToken);
    Mockito.when(request.getRemoteAddr()).thenReturn("127.0.0.1");
    jwtAuthenticationFilter.doFilter(request, response, filterChain);
    Assertions.assertNotNull(SecurityContextHolder.getContext().getAuthentication());
    Assertions.assertEquals(userId.toString(), SecurityContextHolder.getContext().getAuthentication().getName());
    Assertions.assertTrue(SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("admin")));
    Mockito.verify(filterChain).doFilter(request, response);
  }
}