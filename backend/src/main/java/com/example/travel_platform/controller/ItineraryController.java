package com.example.travel_platform.controller;

import com.example.travel_platform.model.ItineraryModel;
import com.example.travel_platform.service.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {
    
    @Autowired
    private ItineraryService itineraryService;
    
    // Create a new itinerary
    @PostMapping
    public ResponseEntity<ItineraryModel> createItinerary(@RequestBody ItineraryModel itinerary) {
        ItineraryModel createdItinerary = itineraryService.createItinerary(itinerary);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdItinerary);
    }
    
    // Get all itineraries
    @GetMapping
    public ResponseEntity<List<ItineraryModel>> getAllItineraries() {
        List<ItineraryModel> itineraries = itineraryService.getAllItineraries();
        return ResponseEntity.ok(itineraries);
    }
    
    // Get itinerary by ID
    @GetMapping("/{id}")
    public ResponseEntity<ItineraryModel> getItineraryById(@PathVariable String id) {
        Optional<ItineraryModel> itinerary = itineraryService.getItineraryById(id);
        
        return itinerary.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }
    
    // Get itineraries by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ItineraryModel>> getItinerariesByUserId(@PathVariable String userId) {
        List<ItineraryModel> itineraries = itineraryService.getItinerariesByUserId(userId);
        return ResponseEntity.ok(itineraries);
    }
    
    // Get itineraries by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<ItineraryModel>> getItinerariesByType(@PathVariable String type) {
        List<ItineraryModel> itineraries = itineraryService.getItinerariesByType(type);
        return ResponseEntity.ok(itineraries);
    }
    
    // Update an itinerary
    @PutMapping("/{id}")
    public ResponseEntity<ItineraryModel> updateItinerary(
            @PathVariable String id, 
            @RequestBody ItineraryModel itinerary) {
        
        ItineraryModel updatedItinerary = itineraryService.updateItinerary(id, itinerary);
        
        if (updatedItinerary != null) {
            return ResponseEntity.ok(updatedItinerary);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Delete an itinerary
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable String id) {
        boolean deleted = itineraryService.deleteItinerary(id);
        
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Share an itinerary
    @PostMapping("/{id}/share")
    public ResponseEntity<ItineraryModel> shareItinerary(
            @PathVariable String id, 
            @RequestBody ItineraryModel.SharedWith sharedInfo) {
        
        ItineraryModel updatedItinerary = itineraryService.shareItinerary(id, sharedInfo);
        
        if (updatedItinerary != null) {
            return ResponseEntity.ok(updatedItinerary);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Remove sharing from an itinerary
    @DeleteMapping("/{id}/share")
    public ResponseEntity<ItineraryModel> removeSharing(
            @PathVariable String id, 
            @RequestParam String email) {
        
        ItineraryModel updatedItinerary = itineraryService.removeSharing(id, email);
        
        if (updatedItinerary != null) {
            return ResponseEntity.ok(updatedItinerary);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Get itineraries shared with a user
    @GetMapping("/shared/{email}")
    public ResponseEntity<List<ItineraryModel>> getSharedItineraries(@PathVariable String email) {
        List<ItineraryModel> itineraries = itineraryService.getSharedItineraries(email);
        return ResponseEntity.ok(itineraries);
    }
    
    // Search itineraries
    @GetMapping("/search")
    public ResponseEntity<List<ItineraryModel>> searchItineraries(@RequestParam String query) {
        List<ItineraryModel> itineraries = itineraryService.searchItineraries(query);
        return ResponseEntity.ok(itineraries);
    }
}
