package com.example.travel_platform.model;

import java.util.List; // ✅ Import List
import java.util.Objects; // ✅ Import Objects

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "guides")
public class GuideModel {

    @Id
    private String id;
    private String title;
    private String destination;
    private String category;
    private String content;
    private String userId;
    private List<String> tags;
    private int likes = 0;

    public GuideModel() {}

    public GuideModel(String id, String title, String destination, String category, String content, String userId, List<String> tags, int likes) {
        this.id = id;
        this.title = title;
        this.destination = destination;
        this.category = category;
        this.content = content;
        this.userId = userId;
        this.tags = tags;
        this.likes = likes;
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

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }

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
                ", tags=" + tags +
                ", likes=" + likes +
                '}';
    }
}
