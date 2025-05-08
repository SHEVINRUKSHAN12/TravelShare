package com.example.travel_platform.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private FileUploadProperties fileUploadProperties;

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // Expose the uploaded files directory
        Path uploadDir = Paths.get(fileUploadProperties.getUploadDir()).toAbsolutePath().normalize();
        String resourcePath = "file:" + uploadDir.toString() + "/";
        
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(resourcePath);
    }

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        // Configure CORS for frontend
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Add your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
