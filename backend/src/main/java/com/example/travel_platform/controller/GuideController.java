package com.example.travel_platform.controller;

import java.util.List; // ✅ Import List
import org.springframework.http.HttpStatus; // ✅ Import HttpStatus
import org.springframework.http.ResponseEntity; // ✅ Import ResponseEntity
import org.springframework.web.bind.annotation.*; // ✅ Import Spring Web annotations
import org.springframework.web.server.ResponseStatusException;

import com.example.travel_platform.model.GuideModel;
import com.example.travel_platform.service.GuideService;

/**
 * REST controller for managing destination guides.
 */
@RestController
@RequestMapping("/api/guides")
@CrossOrigin(origins = "${cors.allowed-origins:http://localhost:3000}")
public class GuideController {

    private final GuideService guideService;

    public GuideController(GuideService guideService) {
        this.guideService = guideService;
    }

    /**
     * Create a new guide.
     */
    @PostMapping
    public ResponseEntity<GuideModel> createGuide(@RequestBody GuideModel guide) {
        try {
            return ResponseEntity.ok(guideService.createGuide(guide));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create guide", e);
        }
    }

    /**
     * Get all guides.
     */
    @GetMapping
    public ResponseEntity<List<GuideModel>> getAllGuides() {
        try {
            return ResponseEntity.ok(guideService.getAllGuides());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve guides", e);
        }
    }

    /**
     * Get a single guide by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<GuideModel> getGuideById(@PathVariable String id) {
        return guideService.getGuideById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Guide not found with id: " + id));
    }

    /**
     * Update an existing guide.
     */
    @PutMapping("/{id}")
    public ResponseEntity<GuideModel> updateGuide(@PathVariable String id,
                                                  @RequestBody GuideModel guideDetails) {
        try {
            return ResponseEntity.ok(guideService.updateGuide(id, guideDetails));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update guide", e);
        }
    }

    /**
     * Delete a guide by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuide(@PathVariable String id) {
        try {
            guideService.deleteGuide(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete guide", e);
        }
    }
}
