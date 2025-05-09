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

    public Post createPost(String title, String description, String tags, List<MultipartFile> photos, List<MultipartFile> videos) throws IOException {
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

        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
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
