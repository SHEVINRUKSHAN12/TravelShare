package com.example.travel_platform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "itineraries")
public class ItineraryModel {
    
    @Id
    private String id;
    
    private String title;
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private String type; // city, beach, mountain, road
    private String imageUrl;
    private int shared;
    
    // Activity structure
    private List<DayActivity> activities = new ArrayList<>();
    
    // Sharing information
    private List<SharedWith> sharedWith = new ArrayList<>();
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // User information (simplified - would normally come from auth system)
    private String userId;
    private String username;

    // Nested classes for activities
    public static class DayActivity {
        private int day;
        private List<ActivityItem> items = new ArrayList<>();
        
        // Getters and setters
        public int getDay() { return day; }
        public void setDay(int day) { this.day = day; }
        
        public List<ActivityItem> getItems() { return items; }
        public void setItems(List<ActivityItem> items) { this.items = items; }
    }
    
    public static class ActivityItem {
        private String time;
        private String description;
        
        // Getters and setters
        public String getTime() { return time; }
        public void setTime(String time) { this.time = time; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
    
    // Nested class for sharing
    public static class SharedWith {
        private String email;
        private String permission; // view, edit
        private LocalDate dateShared;
        
        // Getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPermission() { return permission; }
        public void setPermission(String permission) { this.permission = permission; }
        
        public LocalDate getDateShared() { return dateShared; }
        public void setDateShared(LocalDate dateShared) { this.dateShared = dateShared; }
    }
    
    // Getters and setters for main class
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public int getShared() { return shared; }
    public void setShared(int shared) { this.shared = shared; }

    public List<DayActivity> getActivities() { return activities; }
    public void setActivities(List<DayActivity> activities) { this.activities = activities; }

    public List<SharedWith> getSharedWith() { return sharedWith; }
    public void setSharedWith(List<SharedWith> sharedWith) { this.sharedWith = sharedWith; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
