package com.example.destinationguides.repository;

import com.example.destinationguides.model.GuideModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuideRepository extends MongoRepository<GuideModel, String> {
    // You can add custom query methods here if needed
}