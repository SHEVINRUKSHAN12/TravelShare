package com.example.travel_platform.service;

import com.example.travel_platform.model.ItineraryModel;
import com.example.travel_platform.repository.ItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ItineraryService {
    
    @Autowired
    private ItineraryRepository itineraryRepository;
    
    // Create a new itinerary
    public ItineraryModel createItinerary(ItineraryModel itinerary) {
        // Set default values if needed
        if (itinerary.getCreatedAt() == null) {
            itinerary.setCreatedAt(LocalDateTime.now());
        }
        itinerary.setUpdatedAt(LocalDateTime.now());
        
        // Save and return the created itinerary
        return itineraryRepository.save(itinerary);
    }
    
    // Get all itineraries
    public List<ItineraryModel> getAllItineraries() {
        return itineraryRepository.findAll();
    }
    
    // Get itinerary by ID
    public Optional<ItineraryModel> getItineraryById(String id) {
        return itineraryRepository.findById(id);
    }
    
    // Update an existing itinerary
    public ItineraryModel updateItinerary(String id, ItineraryModel updatedItinerary) {
        // Check if itinerary exists
        Optional<ItineraryModel> existingItinerary = itineraryRepository.findById(id);
        
        if (existingItinerary.isPresent()) {
            ItineraryModel itinerary = existingItinerary.get();
            
            // Update fields
            itinerary.setTitle(updatedItinerary.getTitle());
            itinerary.setDestination(updatedItinerary.getDestination());
            itinerary.setStartDate(updatedItinerary.getStartDate());
            itinerary.setEndDate(updatedItinerary.getEndDate());
            itinerary.setDescription(updatedItinerary.getDescription());
            itinerary.setType(updatedItinerary.getType());
            itinerary.setImageUrl(updatedItinerary.getImageUrl());
            itinerary.setActivities(updatedItinerary.getActivities());
            
            // Don't update sharing information if not provided
            if (updatedItinerary.getSharedWith() != null && !updatedItinerary.getSharedWith().isEmpty()) {
                itinerary.setSharedWith(updatedItinerary.getSharedWith());
                itinerary.setShared(updatedItinerary.getSharedWith().size());
            }
            
            itinerary.setUpdatedAt(LocalDateTime.now());
            
            // Save and return the updated itinerary
            return itineraryRepository.save(itinerary);
        }
        
        // If itinerary doesn't exist, return null
        return null;
    }
    
    // Delete an itinerary
    public boolean deleteItinerary(String id) {
        Optional<ItineraryModel> itinerary = itineraryRepository.findById(id);
        
        if (itinerary.isPresent()) {
            itineraryRepository.deleteById(id);
            return true;
        }
        
        return false;
    }
    
    // Get itineraries by user ID
    public List<ItineraryModel> getItinerariesByUserId(String userId) {
        return itineraryRepository.findByUserId(userId);
    }
    
    // Get itineraries by type
    public List<ItineraryModel> getItinerariesByType(String type) {
        return itineraryRepository.findByType(type);
    }
    
    // Share an itinerary with a user
    public ItineraryModel shareItinerary(String id, ItineraryModel.SharedWith sharedInfo) {
        Optional<ItineraryModel> existingItinerary = itineraryRepository.findById(id);
        
        if (existingItinerary.isPresent()) {
            ItineraryModel itinerary = existingItinerary.get();
            
            // Add the current date if not provided
            if (sharedInfo.getDateShared() == null) {
                sharedInfo.setDateShared(LocalDate.now());
            }
            
            // Add to shared list
            itinerary.getSharedWith().add(sharedInfo);
            itinerary.setShared(itinerary.getSharedWith().size());
            itinerary.setUpdatedAt(LocalDateTime.now());
            
            // Save and return the updated itinerary
            return itineraryRepository.save(itinerary);
        }
        
        return null;
    }
    
    // Remove sharing from an itinerary
    public ItineraryModel removeSharing(String id, String email) {
        Optional<ItineraryModel> existingItinerary = itineraryRepository.findById(id);
        
        if (existingItinerary.isPresent()) {
            ItineraryModel itinerary = existingItinerary.get();
            
            // Remove from shared list
            itinerary.setSharedWith(
                itinerary.getSharedWith().stream()
                    .filter(shared -> !shared.getEmail().equals(email))
                    .toList()
            );
            
            itinerary.setShared(itinerary.getSharedWith().size());
            itinerary.setUpdatedAt(LocalDateTime.now());
            
            // Save and return the updated itinerary
            return itineraryRepository.save(itinerary);
        }
        
        return null;
    }
    
    // Get itineraries shared with a user
    public List<ItineraryModel> getSharedItineraries(String email) {
        return itineraryRepository.findSharedWithEmail(email);
    }
    
    // Search itineraries
    public List<ItineraryModel> searchItineraries(String searchTerm) {
        return itineraryRepository.searchItineraries(searchTerm);
    }
}
