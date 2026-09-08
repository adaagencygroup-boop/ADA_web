package com.ada.app.common.util;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import com.ada.app.modules.user.enums.DeviceType;
import jakarta.servlet.http.HttpServletRequest;
import nl.basjes.parse.useragent.UserAgent;
import nl.basjes.parse.useragent.UserAgentAnalyzer;
public final class DeviceFingerprintUtils {
  private static final UserAgentAnalyzer analyzer = UserAgentAnalyzer.newBuilder()
    .withCache(2500)
    .withField(UserAgent.DEVICE_CLASS)
    .withField(UserAgent.DEVICE_NAME)
    .withField(UserAgent.OPERATING_SYSTEM_NAME)
    .withField(UserAgent.AGENT_NAME)
    .build();
  private static final String[] osHeaders = {
    "Sec-CH-UA-Platform",
    "X-Device-OS",
    "X-Client-OS",
    "X-App-OS"
  };
  private static final String[] browserHeaders = {
    "X-Device-Browser",
    "X-Client-Browser",
    "X-App-Browser"
  };
  private static final String[] deviceTypeHeaders = {
    "X-Device-Type",
    "X-Client-Device-Type",
    "X-App-Device-Type"
  };
  private static final String[] deviceNameHeaders = {
    "X-Device-Name",
    "X-Client-Device-Name",
    "X-App-Device-Name"
  };
  private DeviceFingerprintUtils() {}
  public static UserAgent parseUserAgent(HttpServletRequest request) {
    if (request == null) {
      return analyzer.parse("");
    }
    Map<String, String> headers = new HashMap<>();
    Enumeration<String> headerNames = request.getHeaderNames();
    if (headerNames != null) {
      Collections.list(headerNames).forEach(headerName -> {
        if (headerName != null) {
          headers.put(headerName, request.getHeader(headerName));
        }
      });
    }
    if (headers.isEmpty()) {
      String userAgentHeader = request.getHeader("User-Agent");
      if (userAgentHeader != null && !userAgentHeader.isBlank()) {
        return analyzer.parse(userAgentHeader);
      }
    }
    return analyzer.parse(headers);
  }
  public static String getBrowser(HttpServletRequest request) {
    if (request == null) {
      return "Unknown";
    }
    for (String header : browserHeaders) {
      String val = request.getHeader(header);
      if (val != null && !val.isBlank()) {
        return val.trim();
      }
    }
    UserAgent parsed = parseUserAgent(request);
    String browser = parsed.getValue(UserAgent.AGENT_NAME);
    if (browser != null && !browser.isBlank() && !"Unknown".equalsIgnoreCase(browser)) {
      return browser;
    }
    return "Other";
  }
  public static String getOS(HttpServletRequest request) {
    if (request == null) {
      return "Unknown";
    }
    for (String header : osHeaders) {
      String val = request.getHeader(header);
      if (val != null && !val.isBlank()) {
        String clean = val.replace("\"", "").trim();
        if (!clean.isBlank()) {
          return clean;
        }
      }
    }
    UserAgent parsed = parseUserAgent(request);
    String os = parsed.getValue(UserAgent.OPERATING_SYSTEM_NAME);
    if (os != null && !os.isBlank() && !"Unknown".equalsIgnoreCase(os)) {
      return os;
    }
    return "Other";
  }
  public static DeviceType getDeviceType(HttpServletRequest request) {
    if (request == null) {
      return DeviceType.desktop;
    }
    for (String header : deviceTypeHeaders) {
      String val = request.getHeader(header);
      if (val != null && !val.isBlank()) {
        try {
          return DeviceType.valueOf(val.trim().toLowerCase());
        } catch (IllegalArgumentException ignored) {}
      }
    }
    UserAgent parsed = parseUserAgent(request);
    String deviceClass = parsed.getValue(UserAgent.DEVICE_CLASS);
    if (deviceClass != null) {
      String dc = deviceClass.toLowerCase();
      if (dc.contains("phone") || dc.contains("mobile") || dc.contains("watch") || dc.contains("handheld")) {
        return DeviceType.mobile;
      }
      if (dc.contains("tablet") || dc.contains("ereader")) {
        return DeviceType.tablet;
      }
    }
    return DeviceType.desktop;
  }
  public static String getDeviceName(HttpServletRequest request) {
    if (request == null) {
      return "Unknown Device";
    }
    for (String header : deviceNameHeaders) {
      String val = request.getHeader(header);
      if (val != null && !val.isBlank()) {
        return val.trim();
      }
    }
    UserAgent parsed = parseUserAgent(request);
    String devName = parsed.getValue(UserAgent.DEVICE_NAME);
    if (devName != null && !devName.isBlank() && !"Unknown".equalsIgnoreCase(devName)) {
      return devName;
    }
    return getBrowser(request) + " on " + getOS(request);
  }
}