package com.ada.app.common.security;
import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {
  private final JWTService jwtService;
  private final StringRedisTemplate redisTemplate;
  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
  ) throws ServletException, IOException {
    String token = null;
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (request.getParameter("token") != null) {
      token = request.getParameter("token");
    }
    if (token == null) {
      filterChain.doFilter(request, response);
      return;
    }
    JWTClaimsSet claims = jwtService.parseAndValidateToken(token);
    if (claims != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      String jti = claims.getJWTID();
      if (jti != null && Boolean.TRUE.equals(redisTemplate.hasKey("blacklist:" + jti))) {
        filterChain.doFilter(request, response);
        return;
      }
      String userId = claims.getSubject();
      String role = (String) claims.getClaim("role");
      List<SimpleGrantedAuthority> authorities = role != null
        ? Collections.singletonList(new SimpleGrantedAuthority(role))
        : Collections.emptyList();
      UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
        userId,
        null,
        authorities
      );
      authToken.setDetails(new JWTAuthenticationDetails(request.getRemoteAddr(), jti));
      SecurityContextHolder.getContext().setAuthentication(authToken);
    }
    filterChain.doFilter(request, response);
  }
}