package com.example.travel_platform.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.travel_platform.model.Post;
import com.example.travel_platform.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    private final String uploadDir = "./uploads/posts";

    public Post createPost(String title, String description, String tags, List<MultipartFile> photos, List<MultipartFile> videos, String userId) throws IOException {
        List<String> photoPaths = new ArrayList<>();
        List<String> videoPaths = new ArrayList<>();

        // Handle photo uploads
        if (photos != null) {
            for (MultipartFile photo : photos) {
                String photoPath = storeFile(photo, "photos");
                if (photoPath != null) {
                    photoPaths.add(photoPath);
                }
            }
        }

        // Handle video uploads
        if (videos != null) {
            for (MultipartFile video : videos) {
                String videoPath = storeFile(video, "videos");
                if (videoPath != null) {
                    videoPaths.add(videoPath);
                }
            }
        }

        // Create and save the post
        Post post = new Post();
        post.setTitle(title);
        post.setDescription(description);
        post.setTags(tags != null ? List.of(tags.split(",")) : new ArrayList<>());
        post.setPhotoUrls(photoPaths);
        post.setVideoUrls(videoPaths);
        post.setUserId(userId); // Set userId

        return postRepository.save(post);
    }

    // For backward compatibility
    public Post createPost(String title, String description, String tags, List<MultipartFile> photos, List<MultipartFile> videos) throws IOException {
        return createPost(title, description, tags, photos, videos, null);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByUserId(String userId) {
        return postRepository.findByUserId(userId); // Ensure this line matches the repository method
    }

    public Post updatePost(String id, String title, String description, String tags) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
        
        post.setTitle(title);
        post.setDescription(description);
        post.setTags(tags != null ? List.of(tags.split(",")) : post.getTags());
        
        return postRepository.save(post);
    }

    public void deletePost(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
        
        // Delete associated media files if needed
        // For photos
        for (String photoUrl : post.getPhotoUrls()) {
            try {
                Path photoPath = Paths.get(uploadDir, photoUrl);
                Files.deleteIfExists(photoPath);
            } catch (IOException e) {
                // Log error but continue
                System.err.println("Error deleting photo: " + e.getMessage());
            }
        }
        
        // For videos
        for (String videoUrl : post.getVideoUrls()) {
            try {
                Path videoPath = Paths.get(uploadDir, videoUrl);
                Files.deleteIfExists(videoPath);
            } catch (IOException e) {
                // Log error but continue
                System.err.println("Error deleting video: " + e.getMessage());
            }
        }
        
        postRepository.deleteById(id);
    }

    private String storeFile(MultipartFile file, String subDir) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            throw new IllegalArgumentException("File must have a valid name.");
        }

        String filename = StringUtils.cleanPath(originalFilename);
        Path uploadPath = Paths.get(uploadDir, subDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileExtension = "";
        int i = filename.lastIndexOf('.');
        if (i > 0) {
            fileExtension = filename.substring(i + 1);
        }

        String uniqueFilename = UUID.randomUUID().toString() + "." + fileExtension;
        Path filePath = uploadPath.resolve(uniqueFilename);

        Files.copy(file.getInputStream(), filePath);
        System.out.println("File saved to: " + filePath.toAbsolutePath());

        return Paths.get(subDir, uniqueFilename).toString();
    }
}
