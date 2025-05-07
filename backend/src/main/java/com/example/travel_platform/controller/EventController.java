package com.example.travel_platform.controller;

import com.example.travel_platform.model.EventModel;
import com.example.travel_platform.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {
    
    @Autowired
    private EventService eventService;
    
    // Create a new event
    @PostMapping
    public ResponseEntity<EventModel> createEvent(@RequestBody EventModel event) {
        EventModel createdEvent = eventService.createEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }
    
    // Get all events
    @GetMapping
    public ResponseEntity<List<EventModel>> getAllEvents() {
        List<EventModel> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    
    // Get event by ID
    @GetMapping("/{id}")
    public ResponseEntity<EventModel> getEventById(@PathVariable String id) {
        Optional<EventModel> event = eventService.getEventById(id);
        
        return event.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // Get events by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<EventModel>> getEventsByCategory(@PathVariable String category) {
        List<EventModel> events = eventService.getEventsByCategory(category);
        return ResponseEntity.ok(events);
    }
    
    // Update an event
    @PutMapping("/{id}")
    public ResponseEntity<EventModel> updateEvent(
            @PathVariable String id, 
            @RequestBody EventModel event) {
        
        EventModel updatedEvent = eventService.updateEvent(id, event);
        
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Delete an event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        boolean deleted = eventService.deleteEvent(id);
        
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Register attendance for an event
    @PostMapping("/{id}/attend")
    public ResponseEntity<EventModel> attendEvent(
            @PathVariable String id, 
            @RequestParam(defaultValue = "default-user") String userId) {
        
        EventModel updatedEvent = eventService.attendEvent(id, userId);
        
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        }
        
        return ResponseEntity.badRequest().body(null);
    }
    
    // Cancel attendance for an event
    @PostMapping("/{id}/cancel")
    public ResponseEntity<EventModel> cancelAttendance(
            @PathVariable String id, 
            @RequestParam(defaultValue = "default-user") String userId) {
        
        EventModel updatedEvent = eventService.cancelAttendance(id, userId);
        
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        }
        
        return ResponseEntity.badRequest().body(null);
    }
    
    // Add a review to an event
    @PostMapping("/{id}/reviews")
    public ResponseEntity<EventModel> addReview(
            @PathVariable String id, 
            @RequestBody EventModel.Review review) {
        
        EventModel updatedEvent = eventService.addReview(id, review);
        
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Search events
    @GetMapping("/search")
    public ResponseEntity<List<EventModel>> searchEvents(@RequestParam String query) {
        List<EventModel> events = eventService.searchEvents(query);
        return ResponseEntity.ok(events);
    }
    
    // Get upcoming events
    @GetMapping("/upcoming")
    public ResponseEntity<List<EventModel>> getUpcomingEvents() {
        List<EventModel> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(events);
    }
    
    // Get events with available spots
    @GetMapping("/available")
    public ResponseEntity<List<EventModel>> getEventsWithAvailableSpots() {
        List<EventModel> events = eventService.getEventsWithAvailableSpots();
        return ResponseEntity.ok(events);
    }
    
    // Get events a user is attending
    @GetMapping("/attending/{userId}")
    public ResponseEntity<List<EventModel>> getEventsByAttendeeId(@PathVariable String userId) {
        List<EventModel> events = eventService.getEventsByAttendeeId(userId);
        return ResponseEntity.ok(events);
    }
}
