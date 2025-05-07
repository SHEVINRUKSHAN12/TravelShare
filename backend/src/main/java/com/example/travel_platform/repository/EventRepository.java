package com.example.travel_platform.repository;

import com.example.travel_platform.model.EventModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<EventModel, String> {
    
    // Find events by category
    List<EventModel> findByCategory(String category);
    
    // Find events by location
    List<EventModel> findByLocationContainingIgnoreCase(String location);
    
    // Find events after a specific date
    List<EventModel> findByDateAfter(LocalDate date);
    
    // Find events by organizer
    List<EventModel> findByOrganizerContainingIgnoreCase(String organizer);
    
    // Find events with available spots
    @Query("{ $or: [{'maxAttendees': 0}, {'currentAttendees': {$lt: 'maxAttendees'}}] }")
    List<EventModel> findEventsWithAvailableSpots();
    
    // Search events by title, description, or location (for search functionality)
    @Query("{ $or: [ {'title': {$regex: ?0, $options: 'i'}}, {'description': {$regex: ?0, $options: 'i'}}, {'location': {$regex: ?0, $options: 'i'}} ] }")
    List<EventModel> searchEvents(String searchTerm);
    
    // Find events a user is attending
    @Query("{ 'attendeeIds': ?0 }")
    List<EventModel> findEventsByAttendeeId(String userId);
}
