package com.example.travel_platform.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.travel_platform.config.FileUploadProperties;
import com.example.travel_platform.model.User;
import com.example.travel_platform.repository.UserRepository;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private FileUploadProperties fileUploadProperties;
    
    public User registerUser(String name, String username, String email, String password, MultipartFile profilePhoto) throws IOException {
        logger.info("Validating user inputs...");
        if (!StringUtils.hasText(name)) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        
        if (!StringUtils.hasText(email) || !EMAIL_PATTERN.matcher(email).matches()) {
            throw new IllegalArgumentException("Invalid email format");
        }
        
        if (!StringUtils.hasText(username)) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        
        if (!StringUtils.hasText(password)) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        
        logger.info("Checking if username or email already exists...");
        if (usernameExists(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        
        if (emailExists(email)) {
            throw new IllegalArgumentException("Email already exists");
        }
        
        logger.info("Creating new user...");
        User user = new User();
        user.setName(name);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setProvider(User.AuthProvider.LOCAL);
        
        if (profilePhoto != null && !profilePhoto.isEmpty()) {
            logger.info("Processing profile photo...");
            String fileName = processProfilePhoto(profilePhoto);
            user.setProfilePicturePath("/uploads/" + fileName);
        } else {
            logger.info("No profile photo provided. Using default profile picture.");
            user.setProfilePicturePath("/uploads/default-profile.png");
        }
        
        logger.info("Saving user to database...");
        User savedUser = userRepository.save(user);
        logger.info("User saved successfully with ID: {}", savedUser.getId());
        return savedUser;
    }
    
    private String processProfilePhoto(MultipartFile file) throws IOException {
        logger.info("Validating profile photo...");
        String contentType = file.getContentType();
        if (contentType == null || !(contentType.equals("image/jpeg") || contentType.equals("image/png") || 
                contentType.equals("image/gif") || contentType.equals("image/webp"))) {
            throw new IllegalArgumentException("Only JPEG, PNG, GIF, and WebP images are allowed");
        }
        
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File size should not exceed 5MB");
        }
        
        logger.info("Generating unique filename...");
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) {
            throw new IllegalArgumentException("File must have a valid name");
        }
        originalFileName = StringUtils.cleanPath(originalFileName);
        String fileExtension = "";
        int lastDot = originalFileName.lastIndexOf('.');
        if (lastDot > 0) {
            fileExtension = originalFileName.substring(lastDot);
        }
        String fileName = UUID.randomUUID().toString() + fileExtension;
        
        logger.info("Saving profile photo to directory...");
        Path uploadDir = Paths.get(fileUploadProperties.getUploadDir()).normalize();
        if (!Files.exists(uploadDir)) {
            logger.info("Upload directory does not exist. Creating directory: {}", uploadDir);
            Files.createDirectories(uploadDir);
        }
        
        Path targetLocation = uploadDir.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        
        logger.info("Profile photo saved: {}", targetLocation);
        return fileName;
    }
    
    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public User processOAuthUser(@NonNull String email, String name, String pictureUrl, @NonNull User.AuthProvider provider) {
        // Email and provider are required, but we don't need redundant null checks
        return userRepository.findByEmail(email)
            .map(existingUser -> {
                // Update existing user if name or picture URL has changed
                if (name != null && !name.equals(existingUser.getName())) {
                    existingUser.setName(name);
                }
                if (pictureUrl != null && !pictureUrl.equals(existingUser.getProfilePicturePath())) {
                    existingUser.setProfilePicturePath(pictureUrl);
                }
                return userRepository.save(existingUser);
            })
            .orElseGet(() -> {
                // Create new user
                User newUser = new User();
                newUser.setEmail(email);
                // Generate safe name from email if name is null
                String defaultName = email.substring(0, email.indexOf('@'));
                newUser.setName(name != null ? name : defaultName);
                // Generate username safely
                newUser.setUsername(generateUsername(defaultName, email));
                newUser.setProvider(provider);
                newUser.setProfilePicturePath(pictureUrl);
                return userRepository.save(newUser);
            });
    }
    
    private String generateUsername(String namePart, String email) {
        // Generate a username based on name or email
        String baseUsername;
        // Since email is @NonNull from the calling method, we can rely on it
        if (namePart != null && !namePart.isEmpty()) {
            baseUsername = namePart.replaceAll("\\s+", "").toLowerCase();
        } else {
            baseUsername = email.substring(0, email.indexOf('@'));
        }
        
        String username = baseUsername;
        int counter = 1;
        while (usernameExists(username)) {
            username = baseUsername + counter++;
        }
        return username;
    }
}

