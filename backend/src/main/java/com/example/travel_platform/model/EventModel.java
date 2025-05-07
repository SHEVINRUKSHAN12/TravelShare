package com.example.travel_platform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "events")
public class EventModel {
    
    @Id
    private String id;
    
    @Indexed
    private String title;
    
    private String description;
    private LocalDate date;
    private String time;
    
    @Indexed
    private String location;
    
    private String meetingPoint;
    
    @Indexed
    private String category;
    
    private int maxAttendees;
    private int currentAttendees;
    private String organizer;
    private String contactEmail;
    private String contactPhone;
    private String difficulty;
    private String duration;
    private List<String> whatToBring = new ArrayList<>();
    private String imageUrl;
    
    // Itinerary information
    private List<ItineraryItem> itinerary = new ArrayList<>();
    
    // Reviews
    private List<Review> reviews = new ArrayList<>();
    
    // Attendees list
    private List<String> attendeeIds = new ArrayList<>();
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // User who created the event
    private String userId;
    
    // Nested classes
    public static class ItineraryItem {
        private String day;
        private String activities;
        
        // Getters and setters
        public String getDay() { return day; }
        public void setDay(String day) { this.day = day; }
        
        public String getActivities() { return activities; }
        public void setActivities(String activities) { this.activities = activities; }
    }
    
    public static class Review {
        private String user;
        private int rating;
        private String comment;
        private LocalDateTime datePosted;
        
        // Getters and setters
        public String getUser() { return user; }
        public void setUser(String user) { this.user = user; }
        
        public int getRating() { return rating; }
        public void setRating(int rating) { this.rating = rating; }
        
        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }
        
        public LocalDateTime getDatePosted() { return datePosted; }
        public void setDatePosted(LocalDateTime datePosted) { this.datePosted = datePosted; }
    }
    
    // Getters and setters for main class
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getMeetingPoint() { return meetingPoint; }
    public void setMeetingPoint(String meetingPoint) { this.meetingPoint = meetingPoint; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getMaxAttendees() { return maxAttendees; }
    public void setMaxAttendees(int maxAttendees) { this.maxAttendees = maxAttendees; }

    public int getCurrentAttendees() { return currentAttendees; }
    public void setCurrentAttendees(int currentAttendees) { this.currentAttendees = currentAttendees; }

    public String getOrganizer() { return organizer; }
    public void setOrganizer(String organizer) { this.organizer = organizer; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public List<String> getWhatToBring() { return whatToBring; }
    public void setWhatToBring(List<String> whatToBring) { this.whatToBring = whatToBring; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<ItineraryItem> getItinerary() { return itinerary; }
    public void setItinerary(List<ItineraryItem> itinerary) { this.itinerary = itinerary; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    public List<String> getAttendeeIds() { return attendeeIds; }
    public void setAttendeeIds(List<String> attendeeIds) { this.attendeeIds = attendeeIds; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}
