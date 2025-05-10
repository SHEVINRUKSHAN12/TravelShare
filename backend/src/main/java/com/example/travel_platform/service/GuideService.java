package com.example.travel_platform.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.travel_platform.model.GuideModel;
import com.example.travel_platform.repository.GuideRepository;

@Service
public class GuideService {

    private final GuideRepository guideRepository;

    public GuideService(GuideRepository guideRepository) {
        this.guideRepository = guideRepository;
    }

    public GuideModel createGuide(GuideModel guide) {
        return guideRepository.save(guide);
    }

    public List<GuideModel> getAllGuides() {
        return guideRepository.findAll();
    }

    public Optional<GuideModel> getGuideById(String id) {
        return guideRepository.findById(id);
    }

    public GuideModel updateGuide(String id, GuideModel guideDetails) {
        return guideRepository.findById(id).map(guide -> {
            guide.setTitle(guideDetails.getTitle());
            guide.setDestination(guideDetails.getDestination());
            guide.setCategory(guideDetails.getCategory());
            guide.setContent(guideDetails.getContent());
            guide.setUserId(guideDetails.getUserId());
            guide.setTags(guideDetails.getTags());
            guide.setLikes(guideDetails.getLikes());
            return guideRepository.save(guide);
        }).orElseThrow(() -> new RuntimeException("Guide not found with id: " + id));
    }

    public void deleteGuide(String id) {
        guideRepository.deleteById(id);
    }
}
