package com.example.destinationguides;

import com.example.destinationguides.model.GuideModel;
import com.example.destinationguides.repository.GuideRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class DestinationguidesApplication {

    public static void main(String[] args) {
        SpringApplication.run(DestinationguidesApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(GuideRepository repository) {
        return args -> {
            try {
                if (repository.count() == 0) { // Avoid duplicate entries on restart
                    repository.save(new GuideModel(null, "Beach Adventure", "Sri Lanka", "Relaxation", "Enjoy sun and sea!", "1"));
                    repository.save(new GuideModel(null, "Mountain Hiking", "Nepal", "Adventure", "Climb the Himalayas!", "1"));
                    repository.save(new GuideModel(null, "City Tour", "Paris", "Culture", "Explore museums and cafes.", "1"));
                    System.out.println("✅ Dummy data inserted into MongoDB");
                }
            } catch (Exception e) {
                System.err.println("❌ Failed to initialize database: " + e.getMessage());
            }
        };
    }
}
