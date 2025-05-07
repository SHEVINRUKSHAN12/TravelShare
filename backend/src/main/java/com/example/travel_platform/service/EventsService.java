package com.example.travel_platform.service;

import com.example.travel_platform.model.EventsModel;
import com.example.travel_platform.repository.EventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventsService {
    
    @Autowired
    private EventsRepository eventsRepository;
    
    // Create a new event
    public EventsModel createEvent(EventsModel event) {
        event.setCreatedAt(LocalDate.now());
        event.setUpdatedAt(LocalDate.now());
        return eventsRepository.save(event);
    }
    
    // Get all events
    public List<EventsModel> getAllEvents() {
        return eventsRepository.findAll();
    }
    
    // Get event by ID
    public Optional<EventsModel> getEventById(String id) {
        return eventsRepository.findById(id);
    }
    
    // Update an event
    public EventsModel updateEvent(String id, EventsModel eventDetails) {
        Optional<EventsModel> optionalEvent = eventsRepository.findById(id);
        
        if (optionalEvent.isPresent()) {
            EventsModel existingEvent = optionalEvent.get();
            
            // Update fields
            existingEvent.setTitle(eventDetails.getTitle());
            existingEvent.setDescription(eventDetails.getDescription());
            existingEvent.setDate(eventDetails.getDate());
            existingEvent.setTime(eventDetails.getTime());
            existingEvent.setLocation(eventDetails.getLocation());
            existingEvent.setMeetingPoint(eventDetails.getMeetingPoint());
            existingEvent.setImageUrl(eventDetails.getImageUrl());
            existingEvent.setOrganizer(eventDetails.getOrganizer());
            existingEvent.setContactEmail(eventDetails.getContactEmail());
            existingEvent.setContactPhone(eventDetails.getContactPhone());
            existingEvent.setCategory(eventDetails.getCategory());
            existingEvent.setMaxAttendees(eventDetails.getMaxAttendees());
            existingEvent.setDifficulty(eventDetails.getDifficulty());
            existingEvent.setDuration(eventDetails.getDuration());
            existingEvent.setWhatToBring(eventDetails.getWhatToBring());
            existingEvent.setItinerary(eventDetails.getItinerary());
            
            // Don't overwrite reviews or current attendees from update
            
            existingEvent.setUpdatedAt(LocalDate.now());
            
            return eventsRepository.save(existingEvent);
        }
        
        return null; // Event not found
    }
    
    // Delete an event
    public boolean deleteEvent(String id) {
        if (eventsRepository.existsById(id)) {
            eventsRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Register attendance for an event
    public EventsModel registerAttendance(String eventId) {
        Optional<EventsModel> optionalEvent = eventsRepository.findById(eventId);
        
        if (optionalEvent.isPresent()) {
            EventsModel event = optionalEvent.get();
            
            // Check if event has reached max attendees
            if (event.getMaxAttendees() > 0 && event.getCurrentAttendees() >= event.getMaxAttendees()) {
                // Event is full
                return null;
            }
            
            event.setCurrentAttendees(event.getCurrentAttendees() + 1);
            return eventsRepository.save(event);
        }
        
        return null; // Event not found
    }
    
    // Cancel attendance for an event
    public EventsModel cancelAttendance(String eventId) {
        Optional<EventsModel> optionalEvent = eventsRepository.findById(eventId);
        
        if (optionalEvent.isPresent()) {
            EventsModel event = optionalEvent.get();
            
            if (event.getCurrentAttendees() > 0) {
                event.setCurrentAttendees(event.getCurrentAttendees() - 1);
                return eventsRepository.save(event);
            }
            
            return event; // Already at 0 attendees
        }
        
        return null; // Event not found
    }
    
    // Add a review to an event
    public EventsModel addReview(String eventId, EventsModel.Review review) {
        Optional<EventsModel> optionalEvent = eventsRepository.findById(eventId);
        
        if (optionalEvent.isPresent()) {
            EventsModel event = optionalEvent.get();
            
            if (event.getReviews() == null) {
                event.setReviews(List.of(review));
            } else {
                event.getReviews().add(review);
            }
            
            event.setUpdatedAt(LocalDate.now());
            return eventsRepository.save(event);
        }
        
        return null; // Event not found
    }
    
    // Search events
    public List<EventsModel> searchEvents(String query) {
        return eventsRepository.searchEvents(query);
    }
    
    // Get events by category
    public List<EventsModel> getEventsByCategory(String category) {
        return eventsRepository.findByCategory(category);
    }
    
    // Get upcoming events
    public List<EventsModel> getUpcomingEvents() {
        return eventsRepository.findByDateGreaterThanEqual(LocalDate.now());
    }
}
