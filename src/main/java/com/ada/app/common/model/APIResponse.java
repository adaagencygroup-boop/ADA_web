package com.ada.app.common.model;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.Instant;
@JsonInclude(JsonInclude.Include.NON_NULL)
public record APIResponse<T>(
  boolean success,
  String message,
  T data,
  Instant timestamp
) {
  public static <T> APIResponse<T> ok(String message, T data) {
    return new APIResponse<>(true, message, data, Instant.now());
  }
  public static <T> APIResponse<T> ok(T data) {
    return new APIResponse<>(true, "Success", data, Instant.now());
  }
  public static <T> APIResponse<T> created(String message, T data) {
    return new APIResponse<>(true, message, data, Instant.now());
  }
  public static <T> APIResponse<T> error(String message) {
    return new APIResponse<>(false, message, null, Instant.now());
  }
  public static <T> APIResponse<T> error(String message, T data) {
    return new APIResponse<>(false, message, data, Instant.now());
  }
}