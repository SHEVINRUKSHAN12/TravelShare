package com.example.destinationguides.service;

import com.example.destinationguides.model.GuideModel;
import com.example.destinationguides.repository.GuideRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        return guideRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(guideDetails.getTitle());
                    existing.setDestination(guideDetails.getDestination());
                    existing.setCategory(guideDetails.getCategory());
                    existing.setContent(guideDetails.getContent());
                    existing.setUserId(guideDetails.getUserId());
                    return guideRepository.save(existing);
                })
                .orElseGet(() -> {
                    guideDetails.setId(id);
                    return guideRepository.save(guideDetails);
                });
    }

    public void deleteGuide(String id) {
        guideRepository.deleteById(id);
    }
}
