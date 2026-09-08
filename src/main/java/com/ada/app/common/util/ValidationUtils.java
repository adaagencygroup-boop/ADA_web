package com.ada.app.common.util;
import com.ada.app.common.exception.AppException;
import java.util.regex.Pattern;
public final class ValidationUtils {
  private static final Pattern usernamePattern = Pattern.compile("^[a-zA-Z0-9_]{3,50}$");
  private static final Pattern emailPattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  private static final Pattern phonePattern = Pattern.compile("^[0-9+()\\s-]{8,20}$");
  private ValidationUtils() {}
  public static void validateUsername(String username) {
    if (username == null || username.isBlank()) {
      throw AppException.badRequest("Username Is Required");
    }
    if (!usernamePattern.matcher(username.trim()).matches()) {
      throw AppException.badRequest("Username Must Be 3-50 Chars Long & Contain Only Alphanumeric Chars Or Underscores");
    }
  }
  public static void validateEmail(String email) {
    if (email == null || email.isBlank()) {
      throw AppException.badRequest("Email Address Is Required");
    }
    if (!emailPattern.matcher(email.trim()).matches()) {
      throw AppException.badRequest("Invalid Email Address Format");
    }
  }
  public static void validatePassword(String password) {
    if (password == null || password.isBlank()) {
      throw AppException.badRequest("Password Is Required");
    }
    if (password.length() < 8) {
      throw AppException.badRequest("Password Must Be At Least 8 Chars");
    }
    if (!password.chars().anyMatch(Character::isUpperCase)) {
      throw AppException.badRequest("Password Must Contain At Least 1 Uppercase Letter");
    }
    if (!password.chars().anyMatch(Character::isLowerCase)) {
      throw AppException.badRequest("Password Must Contain At Least 1 Lowercase Letter");
    }
    if (password.chars().anyMatch(Character::isWhitespace)) {
      throw AppException.badRequest("Password Cannot Contain Whitespace");
    }
    if (!password.chars().anyMatch(Character::isDigit)) {
      throw AppException.badRequest("Password Must Contain At Least 1 Digit");
    }
  }
  public static void validatePhone(String phone) {
    if (phone != null && !phone.isBlank() && !phonePattern.matcher(phone.trim()).matches()) {
      throw AppException.badRequest("Invalid Phone Number Format");
    }
  }
}