package com.ada.app.common.security;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service
public class JWTService {
  @Value("${app.jwt.secret}")
  private String jwtSecret;
  @Value("${app.jwt.accessExpirationSeconds}")
  private long accessExpirationSeconds;
  @Value("${app.jwt.refreshExpirationSeconds}")
  private long refreshExpirationSeconds;
  public String generateAccessToken(UUID userId, String role, String jti) {
    return buildToken(userId, role, jti, accessExpirationSeconds);
  }
  public String generateRefreshToken(UUID userId, String jti) {
    return buildToken(userId, null, jti, refreshExpirationSeconds);
  }
  private String buildToken(UUID userId, String role, String jti, long expirationSeconds) {
    try {
      JWSSigner signer = new MACSigner(jwtSecret.getBytes(StandardCharsets.UTF_8));
      Instant now = Instant.now();
      JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder()
        .subject(userId.toString())
        .jwtID(jti)
        .issueTime(Date.from(now))
        .expirationTime(Date.from(now.plusSeconds(expirationSeconds)));
      if (role != null) {
        builder.claim("role", role);
      }
      SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), builder.build());
      signedJWT.sign(signer);
      return signedJWT.serialize();
    } catch (Exception e) {
      throw com.ada.app.common.exception.AppException.internal("Failed To Generate JWT Token: " + e.getMessage());
    }
  }
  public JWTClaimsSet parseAndValidateToken(String token) {
    try {
      SignedJWT signedJWT = SignedJWT.parse(token);
      JWSVerifier verifier = new MACVerifier(jwtSecret.getBytes(StandardCharsets.UTF_8));
      if (!signedJWT.verify(verifier)) {
        return null;
      }
      JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
      if (claims.getExpirationTime().before(new Date())) {
        return null;
      }
      return claims;
    } catch (Exception e) {
      return null;
    }
  }
}