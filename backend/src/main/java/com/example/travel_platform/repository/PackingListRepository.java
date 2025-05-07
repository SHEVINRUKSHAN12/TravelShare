package com.example.travel_platform.repository;

import com.example.travel_platform.model.PackingListModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackingListRepository extends MongoRepository<PackingListModel, String> {
    
    // Find packing lists by user ID
    List<PackingListModel> findByUserId(String userId);
    
    // Find packing lists by type
    List<PackingListModel> findByType(String type);
    
    // Find packing lists by destination (case insensitive)
    List<PackingListModel> findByDestinationContainingIgnoreCase(String destination);
}
