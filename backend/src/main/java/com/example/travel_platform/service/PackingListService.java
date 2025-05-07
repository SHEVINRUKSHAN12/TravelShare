package com.example.travel_platform.service;

import com.example.travel_platform.model.PackingItemModel;
import com.example.travel_platform.model.PackingListModel;
import com.example.travel_platform.repository.PackingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PackingListService {
    
    @Autowired
    private PackingListRepository packingListRepository;
    
    // Get all packing lists
    public List<PackingListModel> getAllPackingLists() {
        return packingListRepository.findAll();
    }
    
    // Get packing list by ID
    public Optional<PackingListModel> getPackingListById(String id) {
        return packingListRepository.findById(id);
    }
    
    // Create a new packing list
    public PackingListModel createPackingList(PackingListModel packingList) {
        // Set default values
        packingList.setCreatedAt(LocalDateTime.now());
        packingList.setUpdatedAt(LocalDateTime.now());
        
        // Initialize empty items list if null
        if (packingList.getItems() == null) {
            packingList.setItems(new ArrayList<>());
        }
        
        // Set a default user ID if not provided (for testing)
        if (packingList.getUserId() == null || packingList.getUserId().trim().isEmpty()) {
            packingList.setUserId("default-user");
        }
        
        return packingListRepository.save(packingList);
    }
    
    // Update a packing list
    public PackingListModel updatePackingList(String id, PackingListModel updatedList) {
        Optional<PackingListModel> existingList = packingListRepository.findById(id);
        
        if (existingList.isPresent()) {
            PackingListModel list = existingList.get();
            
            list.setTitle(updatedList.getTitle());
            list.setDestination(updatedList.getDestination());
            list.setType(updatedList.getType());
            list.setImageUrl(updatedList.getImageUrl());
            list.setUpdatedAt(LocalDateTime.now());
            
            return packingListRepository.save(list);
        }
        
        return null;
    }
    
    // Delete a packing list
    public boolean deletePackingList(String id) {
        Optional<PackingListModel> packingList = packingListRepository.findById(id);
        
        if (packingList.isPresent()) {
            packingListRepository.deleteById(id);
            return true;
        }
        
        return false;
    }
    
    // Get items for a packing list
    public List<PackingItemModel> getPackingItems(String listId) {
        Optional<PackingListModel> packingList = packingListRepository.findById(listId);
        
        return packingList.map(PackingListModel::getItems)
                        .orElse(new ArrayList<>());
    }
    
    // Add an item to a packing list
    public PackingItemModel addPackingItem(String listId, PackingItemModel item) {
        Optional<PackingListModel> packingList = packingListRepository.findById(listId);
        
        if (packingList.isPresent()) {
            PackingListModel list = packingList.get();
            
            // Generate an ID for the item if it doesn't have one
            if (item.getId() == null || item.getId().trim().isEmpty()) {
                item.setId(UUID.randomUUID().toString());
            }
            
            list.getItems().add(item);
            list.setUpdatedAt(LocalDateTime.now());
            
            packingListRepository.save(list);
            return item;
        }
        
        return null;
    }
    
    // Update a packing item
    public PackingItemModel updatePackingItem(String listId, String itemId, PackingItemModel updatedItem) {
        Optional<PackingListModel> packingList = packingListRepository.findById(listId);
        
        if (packingList.isPresent()) {
            PackingListModel list = packingList.get();
            
            for (int i = 0; i < list.getItems().size(); i++) {
                PackingItemModel item = list.getItems().get(i);
                
                if (item.getId().equals(itemId)) {
                    // Update item properties
                    item.setDescription(updatedItem.getDescription());
                    item.setChecked(updatedItem.isChecked());
                    item.setCategory(updatedItem.getCategory());
                    
                    list.setUpdatedAt(LocalDateTime.now());
                    packingListRepository.save(list);
                    
                    return item;
                }
            }
        }
        
        return null;
    }
    
    // Delete a packing item
    public boolean deletePackingItem(String listId, String itemId) {
        Optional<PackingListModel> packingList = packingListRepository.findById(listId);
        
        if (packingList.isPresent()) {
            PackingListModel list = packingList.get();
            
            boolean removed = list.getItems().removeIf(item -> item.getId().equals(itemId));
            
            if (removed) {
                list.setUpdatedAt(LocalDateTime.now());
                packingListRepository.save(list);
                return true;
            }
        }
        
        return false;
    }
}
