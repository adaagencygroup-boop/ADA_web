package com.ada.app.common.security;
import java.io.Serializable;
public record JWTAuthenticationDetails(
  String remoteAddress,
  String jti
) implements Serializable {}