package com.example.travel_platform.repository;

import com.example.travel_platform.model.ItineraryModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryRepository extends MongoRepository<ItineraryModel, String> {
    
    // Find all itineraries by user ID
    List<ItineraryModel> findByUserId(String userId);
    
    // Find itineraries by type
    List<ItineraryModel> findByType(String type);
    
    // Find itineraries by destination (case insensitive)
    List<ItineraryModel> findByDestinationContainingIgnoreCase(String destination);
    
    // Find itineraries shared with a specific email
    @Query("{'sharedWith.email': ?0}")
    List<ItineraryModel> findSharedWithEmail(String email);
    
    // Search itineraries by title, destination, or description (for search functionality)
    @Query("{ $or: [ {'title': {$regex: ?0, $options: 'i'}}, {'destination': {$regex: ?0, $options: 'i'}}, {'description': {$regex: ?0, $options: 'i'}} ] }")
    List<ItineraryModel> searchItineraries(String searchTerm);
}
