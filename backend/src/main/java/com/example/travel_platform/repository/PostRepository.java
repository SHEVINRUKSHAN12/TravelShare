package com.example.travel_platform.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.travel_platform.model.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

     // Add this method to find posts by userId
    List<Post> findByUserId(String userId);
}
