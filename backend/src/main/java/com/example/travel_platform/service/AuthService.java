package com.example.travel_platform.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.travel_platform.model.User;
import com.example.travel_platform.repository.UserRepository;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String uploadDir = "./uploads/profile-photos";

    public User registerUser(String name, String username, String email, String password, MultipartFile profilePhoto) throws IOException {
        logger.info("Registering user: name={}, username={}, email={}", name, username, email);

        // Validate input
        if (!isValidEmail(email)) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        if (!isValidUsername(username)) {
            throw new IllegalArgumentException("Invalid username format.");
        }

        // Check if username or email already exists
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username is already taken.");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        // Handle profile photo upload
        String profilePhotoPath = null;
        if (profilePhoto != null && !profilePhoto.isEmpty()) {
            String fileName = storeFile(profilePhoto);
            profilePhotoPath = fileName;
        }

        // Create and save the user
        User user = new User();
        user.setName(name);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setProfilePicturePath(profilePhotoPath);

        return userRepository.save(user);
    }

    public boolean usernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    private String storeFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null; // Or throw an exception, depending on your requirements
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            throw new IllegalArgumentException("File must have a valid name.");
        }

        String filename = StringUtils.cleanPath(originalFilename);
        Path uploadPath = Paths.get(uploadDir);

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
        return uniqueFilename;
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    private boolean isValidUsername(String username) {
        String usernameRegex = "^[a-zA-Z0-9._-]{3,20}$";
        Pattern pattern = Pattern.compile(usernameRegex);
        return pattern.matcher(username).matches();
    }
}

