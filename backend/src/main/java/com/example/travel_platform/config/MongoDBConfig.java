package com.example.travel_platform.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoDBConfig {
    
    private static final Logger logger = LoggerFactory.getLogger(MongoDBConfig.class);
    
    @Autowired
    private MongoTemplate mongoTemplate;
    
    @Bean
    public CommandLineRunner commandLineRunner() {
        return _ -> {
            logger.info("======================================");
            logger.info("MongoDB connection established successfully!");
            logger.info("======================================");
            logger.info("Available collections: {}", mongoTemplate.getCollectionNames());
            logger.info("MongoDB connection established successfully!");
            
        };
    }
}
