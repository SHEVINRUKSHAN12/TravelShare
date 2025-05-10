package com.example.travel_platform.repository;

import org.springframework.data.mongodb.repository.MongoRepository; // ✅ Import MongoRepository
import org.springframework.stereotype.Repository;

import com.example.travel_platform.model.GuideModel;

@Repository
public interface GuideRepository extends MongoRepository<GuideModel, String> {
    // You can add custom query methods here if needed
}
