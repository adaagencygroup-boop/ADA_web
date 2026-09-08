package com.ada.app.security;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.util.ValidationUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
public class InputValidationSecurityTest {
  @Test
  public void testValidateUsernameRejectsMalformedOrInjectedInputs() {
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validateUsername(null));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validateUsername(""));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validateUsername("k"));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validateUsername("admin' OR 1=1 --"));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validateUsername("<script>alert(1)</script>"));
    Assertions.assertDoesNotThrow(() -> ValidationUtils.validateUsername("vak1412"));
  }
  @Test
  public void testValidateEmailRejectsInvalidFormats() {
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validateEmail(null));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validateEmail("NahEmail"));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validateEmail("contact@"));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validateEmail("contact@adagroup"));
    Assertions.assertDoesNotThrow(() -> ValidationUtils.validateEmail("contact@ada.com.vn"));
  }
  @Test
  public void testValidatePasswordEnforcesComplexity() {
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validatePassword(null));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validatePassword("Pwd18"));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validatePassword("lowercase18"));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validatePassword("uppercase18"));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validatePassword("PascalCase"));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validatePassword("Pascal Case 18"));
    Assertions.assertDoesNotThrow(() -> ValidationUtils.validatePassword("PascalCase18"));
  }
  @Test
  public void testValidatePhoneAcceptsValidAndRejectsInvalid() {
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validatePhone("+8410 Ada"));
    Assertions.assertThrows(AppException.class, () -> ValidationUtils.validatePhone("+8410"));
    Assertions.assertDoesNotThrow(() -> ValidationUtils.validatePhone(null));
    Assertions.assertDoesNotThrow(() -> ValidationUtils.validatePhone("+84 912 045 678"));
  }
}