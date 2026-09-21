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
      throw AppException.badRequest("Vui lòng nhập tên đăng nhập");
    }
    if (!usernamePattern.matcher(username.trim()).matches()) {
      throw AppException.badRequest("Tên đăng nhập phải dài 3-50 ký tự và chỉ chứa chữ cái, chữ số hoặc dấu gạch dưới");
    }
  }
  public static void validateEmail(String email) {
    if (email == null || email.isBlank()) {
      throw AppException.badRequest("Vui lòng nhập địa chỉ email");
    }
    if (!emailPattern.matcher(email.trim()).matches()) {
      throw AppException.badRequest("Định dạng địa chỉ email không hợp lệ");
    }
  }
  public static void validatePassword(String password) {
    if (password == null || password.isBlank()) {
      throw AppException.badRequest("Vui lòng nhập mật khẩu");
    }
    if (password.length() < 8) {
      throw AppException.badRequest("Mật khẩu phải có ít nhất 8 ký tự");
    }
    if (!password.chars().anyMatch(Character::isUpperCase)) {
      throw AppException.badRequest("Mật khẩu phải chứa ít nhất 1 chữ hoa");
    }
    if (!password.chars().anyMatch(Character::isLowerCase)) {
      throw AppException.badRequest("Mật khẩu phải chứa ít nhất 1 chữ thường");
    }
    if (password.chars().anyMatch(Character::isWhitespace)) {
      throw AppException.badRequest("Mật khẩu không được chứa khoảng trắng");
    }
    if (!password.chars().anyMatch(Character::isDigit)) {
      throw AppException.badRequest("Mật khẩu phải chứa ít nhất 1 chữ số");
    }
  }
  public static void validatePhone(String phone) {
    if (phone != null && !phone.isBlank() && !phonePattern.matcher(phone.trim()).matches()) {
      throw AppException.badRequest("Định dạng số điện thoại không hợp lệ");
    }
  }
}