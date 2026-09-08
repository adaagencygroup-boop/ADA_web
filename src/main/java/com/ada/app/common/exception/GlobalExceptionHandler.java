package com.ada.app.common.exception;
import com.ada.app.common.model.APIResponse;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(AppException.class)
  public ResponseEntity<APIResponse<Void>> handleAppException(AppException ex) {
    if (ex.getStatus().is5xxServerError()) {
      log.error("Application Server Error [HTTP {}]: {}", ex.getStatus().value(), ex.getMessage(), ex);
    } else {
      log.warn("Application Client Error [HTTP {}]: {}", ex.getStatus().value(), ex.getMessage());
    }
    return ResponseEntity.status(ex.getStatus()).body(APIResponse.error(ex.getMessage()));
  }
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<APIResponse<Map<String, String>>> handleValidationException(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    for (FieldError error : ex.getBindingResult().getFieldErrors()) {
      errors.put(error.getField(), error.getDefaultMessage());
    }
    log.warn("Validation Failed: {}", errors);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponse.error("Validation Failed", errors));
  }
  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<APIResponse<Void>> handleAuthenticationException(AuthenticationException ex) {
    String msg = ex.getMessage() != null && !ex.getMessage().isBlank() ? ex.getMessage() : "Authentication Failed";
    log.warn("Authentication Exception: {}", msg);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(APIResponse.error(msg));
  }
  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<APIResponse<Void>> handleAccessDeniedException(AccessDeniedException ex) {
    log.warn("Access Denied: {}", ex.getMessage());
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(APIResponse.error("Access Denied"));
  }
  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ResponseEntity<APIResponse<Void>> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException ex) {
    log.warn("Max Upload Size Exceeded: {}", ex.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponse.error("File Size Exceeds Maximum Limit"));
  }
  @ExceptionHandler(Exception.class)
  public ResponseEntity<APIResponse<Void>> handleGenericException(Exception ex) {
    log.error("Unhandled Exception Caught: {}", ex.getMessage(), ex);
    String msg = ex.getMessage() != null && !ex.getMessage().isBlank() ? ex.getMessage() : "Internal Server Error: " + ex.getClass().getSimpleName();
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(APIResponse.error(msg));
  }
}