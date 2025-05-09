package com.example.travel_platform.config;

import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${spring.servlet.multipart.location:}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // Serve /uploads/** from ./uploads/
        if (uploadDir != null && !uploadDir.trim().isEmpty()) {
            String absolutePath = Paths.get(uploadDir).toAbsolutePath().normalize().toString() + "/";
            registry.addResourceHandler("/uploads/**")
                    .addResourceLocations("file:" + absolutePath);
        } else {
            registry.addResourceHandler("/uploads/**")
                    .addResourceLocations("file:./uploads/");
        }
    }

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
