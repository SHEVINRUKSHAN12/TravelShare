package com.example.travel_platform;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.example.travel_platform.model.GuideModel;
import com.example.travel_platform.repository.GuideRepository;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.travel_platform",
    "com.example.destinationguides" // Added to include GuideController and related components
})
@ConfigurationPropertiesScan("com.example.travel_platform.config")
public class TravelPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(TravelPlatformApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(GuideRepository repository) {
        return args -> {
            repository.save(new GuideModel(
                    "1", // Explicitly set the ID to "1"
                    "Explore Ella",
                    "Ella, Sri Lanka",
                    "Nature",
                    "Ella is a beautiful place with waterfalls and hiking trails.",
                    "user1",
                    Arrays.asList("#nature", "#hiking"),
                    0 // likes
            ));

            repository.save(new GuideModel(
                    "2", // Explicitly set the ID to "2"
                    "Colombo Food Tour",
                    "Colombo, Sri Lanka",
                    "Food",
                    "Enjoy authentic Sri Lankan street food in the capital city.",
                    "user2",
                    Arrays.asList("#foodie", "#colombo"),
                    0 // likes
            ));

            repository.save(new GuideModel(
                    "3", // Explicitly set the ID to "3"
                    "Sigiriya Rock Fortress",
                    "Sigiriya, Sri Lanka",
                    "History",
                    "Climb the ancient rock fortress of Sigiriya and explore its rich history.",
                    "user3",
                    Arrays.asList("#history", "#sigiriya"),
                    0 // likes
            ));
        };
    }
}
