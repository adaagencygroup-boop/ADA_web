package com.ada.app.modules.auth.dto;
public record TokenResult(
  String accessToken,
  String refreshToken,
  String tokenType
) {
  public static TokenResult of(String accessToken, String refreshToken) {
    return new TokenResult(accessToken, refreshToken, "Bearer");
  }
}