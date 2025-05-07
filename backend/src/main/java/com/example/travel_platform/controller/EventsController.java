package com.example.travel_platform.controller;

import com.example.travel_platform.model.EventsModel;
import com.example.travel_platform.service.EventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class EventsController {
    
    @Autowired
    private EventsService eventsService;
    
    // Get all events
    @GetMapping
    public ResponseEntity<List<EventsModel>> getAllEvents() {
        return ResponseEntity.ok(eventsService.getAllEvents());
    }
    
    // Get event by ID
    @GetMapping("/{id}")
    public ResponseEntity<EventsModel> getEventById(@PathVariable String id) {
        Optional<EventsModel> event = eventsService.getEventById(id);
        return event.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // Create a new event
    @PostMapping
    public ResponseEntity<EventsModel> createEvent(@RequestBody EventsModel event) {
        EventsModel createdEvent = eventsService.createEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }
    
    // Update an event
    @PutMapping("/{id}")
    public ResponseEntity<EventsModel> updateEvent(@PathVariable String id, @RequestBody EventsModel event) {
        EventsModel updatedEvent = eventsService.updateEvent(id, event);
        
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Delete an event
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEvent(@PathVariable String id) {
        boolean deleted = eventsService.deleteEvent(id);
        
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        
        if (deleted) {
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Register attendance for an event
    @PostMapping("/{id}/attend")
    public ResponseEntity<EventsModel> registerAttendance(@PathVariable String id) {
        EventsModel updatedEvent = eventsService.registerAttendance(id);
        
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        }
        
        return ResponseEntity.badRequest().build();
    }
    
    // Cancel attendance for an event
    @PostMapping("/{id}/cancel")
    public ResponseEntity<EventsModel> cancelAttendance(@PathVariable String id) {
        EventsModel updatedEvent = eventsService.cancelAttendance(id);
        
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Add review to an event
    @PostMapping("/{id}/reviews")
    public ResponseEntity<EventsModel> addReview(@PathVariable String id, @RequestBody EventsModel.Review review) {
        EventsModel updatedEvent = eventsService.addReview(id, review);
        
        if (updatedEvent != null) {
            return ResponseEntity.ok(updatedEvent);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // Search events
    @GetMapping("/search")
    public ResponseEntity<List<EventsModel>> searchEvents(@RequestParam String query) {
        return ResponseEntity.ok(eventsService.searchEvents(query));
    }
    
    // Get events by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<EventsModel>> getEventsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(eventsService.getEventsByCategory(category));
    }
    
    // Get upcoming events
    @GetMapping("/upcoming")
    public ResponseEntity<List<EventsModel>> getUpcomingEvents() {
        return ResponseEntity.ok(eventsService.getUpcomingEvents());
    }
}
