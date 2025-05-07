package com.example.destinationguides.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Objects;

@Document(collection = "guides")
public class GuideModel {

    @Id
    private String id;
    private String title;
    private String destination;
    private String category;
    private String content;
    private String userId;

    public GuideModel() {}

    public GuideModel(String id, String title, String destination, String category, String content, String userId) {
        this.id = id;
        this.title = title;
        this.destination = destination;
        this.category = category;
        this.content = content;
        this.userId = userId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GuideModel that = (GuideModel) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "GuideModel{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", destination='" + destination + '\'' +
                ", category='" + category + '\'' +
                ", content='" + content + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
