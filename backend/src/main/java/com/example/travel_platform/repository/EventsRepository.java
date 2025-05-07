package com.example.travel_platform.repository;

import com.example.travel_platform.model.EventsModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventsRepository extends MongoRepository<EventsModel, String> {
    
    // Find events by category
    List<EventsModel> findByCategory(String category);
    
    // Find events by date greater than or equal to specified date (upcoming events)
    List<EventsModel> findByDateGreaterThanEqual(LocalDate date);
    
    // Find events by location (partial text match)
    @Query("{ 'location' : { $regex: ?0, $options: 'i' } }")
    List<EventsModel> findByLocationContaining(String location);
    
    // Find events by title (partial text match)
    @Query("{ 'title' : { $regex: ?0, $options: 'i' } }")
    List<EventsModel> findByTitleContaining(String title);
    
    // Find events by organizer
    List<EventsModel> findByOrganizer(String organizer);
    
    // Search across multiple fields
    @Query("{ $or: [ " +
           "{ 'title' : { $regex: ?0, $options: 'i' } }, " +
           "{ 'description' : { $regex: ?0, $options: 'i' } }, " +
           "{ 'location' : { $regex: ?0, $options: 'i' } } ] }")
    List<EventsModel> searchEvents(String query);
}
