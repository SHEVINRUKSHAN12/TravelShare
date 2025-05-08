package com.example.travel_platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan("com.example.travel_platform.config")
public class TravelPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelPlatformApplication.class, args);
    }
}
