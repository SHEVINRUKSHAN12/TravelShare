package com.example.travel_platform.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.travel_platform.model.User;
import com.example.travel_platform.repository.UserRepository;
import com.example.travel_platform.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestParam("name") String name,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "profilePhoto", required = false) MultipartFile profilePhoto) {
        try {
            User registeredUser = authService.registerUser(name, username, email, password, profilePhoto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully!");
            response.put("userId", registeredUser.getId());
            response.put("username", registeredUser.getUsername());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Failed to upload profile picture: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String password = loginData.get("password");
            
            logger.info("Logging in user with email: {}", email);
            Optional<User> user = userRepository.findByEmail(email);

            if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
                logger.info("Login successful for user: {}", email);
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful!");
                response.put("userId", user.get().getId());
                response.put("username", user.get().getUsername());
                return ResponseEntity.ok(response);
            } else {
                logger.warn("Invalid email or password for user: {}", email);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
            }
        } catch (Exception e) {
            logger.error("Unexpected error during login: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "An error occurred: " + e.getMessage()));
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<?> checkUsernameAvailability(@RequestParam("username") String username) {
        boolean isAvailable = !authService.usernameExists(username);
        return ResponseEntity.ok(Map.of("available", isAvailable));
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam("email") String email) {
        boolean isAvailable = !authService.emailExists(email);
        return ResponseEntity.ok(Map.of("available", isAvailable));
    }

    @GetMapping("/demo-login")
    public ResponseEntity<?> demoLogin() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Demo login successful!");
        response.put("userId", "demo-user-id");
        response.put("username", "demouser");
        return ResponseEntity.ok(response);
    }
}
