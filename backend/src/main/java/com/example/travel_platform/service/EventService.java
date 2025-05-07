package com.example.travel_platform.service;

import com.example.travel_platform.model.EventModel;
import com.example.travel_platform.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    // Create a new event
    public EventModel createEvent(EventModel event) {
        // Set default values if needed
        if (event.getCreatedAt() == null) {
            event.setCreatedAt(LocalDateTime.now());
        }
        event.setUpdatedAt(LocalDateTime.now());
        
        // Initialize attendees count
        event.setCurrentAttendees(0);
        
        // Save and return the created event
        return eventRepository.save(event);
    }
    
    // Get all events
    public List<EventModel> getAllEvents() {
        return eventRepository.findAll();
    }
    
    // Get events by category
    public List<EventModel> getEventsByCategory(String category) {
        return eventRepository.findByCategory(category);
    }
    
    // Get event by ID
    public Optional<EventModel> getEventById(String id) {
        return eventRepository.findById(id);
    }
    
    // Update an existing event
    public EventModel updateEvent(String id, EventModel updatedEvent) {
        // Check if event exists
        Optional<EventModel> existingEvent = eventRepository.findById(id);
        
        if (existingEvent.isPresent()) {
            EventModel event = existingEvent.get();
            
            // Update fields
            event.setTitle(updatedEvent.getTitle());
            event.setDescription(updatedEvent.getDescription());
            event.setDate(updatedEvent.getDate());
            event.setTime(updatedEvent.getTime());
            event.setLocation(updatedEvent.getLocation());
            event.setMeetingPoint(updatedEvent.getMeetingPoint());
            event.setCategory(updatedEvent.getCategory());
            event.setMaxAttendees(updatedEvent.getMaxAttendees());
            event.setOrganizer(updatedEvent.getOrganizer());
            event.setContactEmail(updatedEvent.getContactEmail());
            event.setContactPhone(updatedEvent.getContactPhone());
            event.setDifficulty(updatedEvent.getDifficulty());
            event.setDuration(updatedEvent.getDuration());
            event.setWhatToBring(updatedEvent.getWhatToBring());
            
            // Only update image if provided
            if (updatedEvent.getImageUrl() != null && !updatedEvent.getImageUrl().isEmpty()) {
                event.setImageUrl(updatedEvent.getImageUrl());
            }
            
            // Update itinerary if provided
            if (updatedEvent.getItinerary() != null && !updatedEvent.getItinerary().isEmpty()) {
                event.setItinerary(updatedEvent.getItinerary());
            }
            
            event.setUpdatedAt(LocalDateTime.now());
            
            // Save and return the updated event
            return eventRepository.save(event);
        }
        
        // If event doesn't exist, return null
        return null;
    }
    
    // Delete an event
    public boolean deleteEvent(String id) {
        Optional<EventModel> event = eventRepository.findById(id);
        
        if (event.isPresent()) {
            eventRepository.deleteById(id);
            return true;
        }
        
        return false;
    }
    
    // Register attendance for an event
    public EventModel attendEvent(String eventId, String userId) {
        Optional<EventModel> existingEvent = eventRepository.findById(eventId);
        
        if (existingEvent.isPresent()) {
            EventModel event = existingEvent.get();
            
            // Check if max attendees reached
            if (event.getMaxAttendees() > 0 && event.getCurrentAttendees() >= event.getMaxAttendees()) {
                return null; // Event is full
            }
            
            // Check if user already attending
            if (!event.getAttendeeIds().contains(userId)) {
                event.getAttendeeIds().add(userId);
                event.setCurrentAttendees(event.getAttendeeIds().size());
                event.setUpdatedAt(LocalDateTime.now());
                
                // Save and return the updated event
                return eventRepository.save(event);
            }
        }
        
        return null;
    }
    
    // Cancel attendance for an event
    public EventModel cancelAttendance(String eventId, String userId) {
        Optional<EventModel> existingEvent = eventRepository.findById(eventId);
        
        if (existingEvent.isPresent()) {
            EventModel event = existingEvent.get();
            
            // Remove user from attendees
            if (event.getAttendeeIds().contains(userId)) {
                event.getAttendeeIds().remove(userId);
                event.setCurrentAttendees(event.getAttendeeIds().size());
                event.setUpdatedAt(LocalDateTime.now());
                
                // Save and return the updated event
                return eventRepository.save(event);
            }
        }
        
        return null;
    }
    
    // Add a review to an event
    public EventModel addReview(String eventId, EventModel.Review review) {
        Optional<EventModel> existingEvent = eventRepository.findById(eventId);
        
        if (existingEvent.isPresent()) {
            EventModel event = existingEvent.get();
            
            // Set review date
            review.setDatePosted(LocalDateTime.now());
            
            // Add review
            event.getReviews().add(review);
            event.setUpdatedAt(LocalDateTime.now());
            
            // Save and return the updated event
            return eventRepository.save(event);
        }
        
        return null;
    }
    
    // Search events
    public List<EventModel> searchEvents(String searchTerm) {
        return eventRepository.searchEvents(searchTerm);
    }
    
    // Get upcoming events
    public List<EventModel> getUpcomingEvents() {
        return eventRepository.findByDateAfter(LocalDate.now());
    }
    
    // Get events with available spots
    public List<EventModel> getEventsWithAvailableSpots() {
        return eventRepository.findEventsWithAvailableSpots();
    }
    
    // Get events a user is attending
    public List<EventModel> getEventsByAttendeeId(String userId) {
        return eventRepository.findEventsByAttendeeId(userId);
    }
}
