package com.ada.app.common.util;
import java.io.File;
import java.io.InputStream;
import java.net.InetAddress;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import com.maxmind.db.CHMCache;
import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.model.CityResponse;
import jakarta.servlet.http.HttpServletRequest;
public final class GeoIPUtils {
  private static final DatabaseReader databaseReader = initDatabaseReader();
  private static final Map<String, GeoLocation> geoCache = new ConcurrentHashMap<>();
  private static final String[] countryHeaders = {
    "CF-IPCountry",
    "X-Geo-Country",
    "X-Country-Name",
    "X-Country-Code",
    "X-Country",
    "X-Client-Geo-Country",
    "X-App-Geo-Country",
    "Geo-Country"
  };
  private static final String[] cityHeaders = {
    "CF-IPCity",
    "X-Geo-City",
    "X-City-Name",
    "X-City",
    "X-Client-Geo-City",
    "X-App-Geo-City",
    "Geo-City"
  };
  private GeoIPUtils() {}
  public record GeoLocation(String country, String city) {}
  private static DatabaseReader initDatabaseReader() {
    try {
      String envPath = System.getenv("GEOIP_DATABASE_PATH");
      if (envPath != null && !envPath.isBlank()) {
        File file = new File(envPath);
        if (file.exists()) {
          return new DatabaseReader.Builder(file).withCache(new CHMCache()).build();
        }
      }
      File defaultFile = new File("GeoLite2-City.mmdb");
      if (defaultFile.exists()) {
        return new DatabaseReader.Builder(defaultFile).withCache(new CHMCache()).build();
      }
      InputStream is = GeoIPUtils.class.getResourceAsStream("/geoip/GeoLite2-City.mmdb");
      if (is != null) {
        return new DatabaseReader.Builder(is).withCache(new CHMCache()).build();
      }
    } catch (Exception ignored) {}
    return null;
  }
  public static String getCountry(HttpServletRequest request, String ip) {
    if (request != null) {
      for (String header : countryHeaders) {
        String value = request.getHeader(header);
        if (value != null && !value.isBlank() && !"XX".equalsIgnoreCase(value.trim()) && !"T1".equalsIgnoreCase(value.trim())) {
          return value.trim();
        }
      }
    }
    if (isLocalIP(ip)) {
      return "localhost";
    }
    GeoLocation location = resolve(ip);
    return location != null && location.country() != null ? location.country() : "Unknown";
  }
  public static String getCity(HttpServletRequest request, String ip) {
    if (request != null) {
      for (String header : cityHeaders) {
        String value = request.getHeader(header);
        if (value != null && !value.isBlank()) {
          return value.trim();
        }
      }
    }
    if (isLocalIP(ip)) {
      return "localhost";
    }
    GeoLocation location = resolve(ip);
    return location != null && location.city() != null ? location.city() : "Unknown";
  }
  public static GeoLocation resolve(String ip) {
    if (ip == null || ip.isBlank()) {
      return new GeoLocation("Unknown", "Unknown");
    }
    String cleanIP = ip.trim();
    if (isLocalIP(cleanIP)) {
      return new GeoLocation("localhost", "localhost");
    }
    if (geoCache.containsKey(cleanIP)) {
      return geoCache.get(cleanIP);
    }
    if (databaseReader != null) {
      try {
        InetAddress address = InetAddress.getByName(cleanIP);
        CityResponse response = databaseReader.city(address);
        if (response != null) {
          String country = response.country() != null && response.country().name() != null ? response.country().name() : "Unknown";
          String city = response.city() != null && response.city().name() != null ? response.city().name() : "Unknown";
          GeoLocation result = new GeoLocation(country, city);
          geoCache.put(cleanIP, result);
          return result;
        }
      } catch (Exception ignored) {}
    }
    GeoLocation fallback = new GeoLocation("Unknown", "Unknown");
    geoCache.put(cleanIP, fallback);
    return fallback;
  }
  public static boolean isLocalIP(String ip) {
    if (ip == null || ip.isBlank()) {
      return false;
    }
    String cleanIP = ip.trim();
    return cleanIP.equals("127.0.0.1") || cleanIP.equals("0:0:0:0:0:0:0:1") || cleanIP.equals("::1") || cleanIP.startsWith("192.168.") || cleanIP.startsWith("10.") || cleanIP.startsWith("172.");
  }
}