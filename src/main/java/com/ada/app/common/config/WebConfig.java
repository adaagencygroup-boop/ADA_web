package com.ada.app.common.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Value("${app.storage.path}")
  private String storagePath;
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOriginPatterns("*")
      .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
      .allowedHeaders("*")
      .allowCredentials(true)
      .maxAge(3600);
  }
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    String normalized = storagePath.replace("\\", "/");
    if (!normalized.endsWith("/")) {
      normalized += "/";
    }
    String locationPrefix = normalized.startsWith("file:") ? normalized : "file:" + normalized;
    registry.addResourceHandler("/files/media/**")
      .addResourceLocations(locationPrefix + "media/");
    registry.addResourceHandler("/files/resumes/**")
      .addResourceLocations(locationPrefix + "resumes/");
  }
}