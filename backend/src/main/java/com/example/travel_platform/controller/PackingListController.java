package com.example.travel_platform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.travel_platform.model.PackingListModel;
import com.example.travel_platform.model.PackingItemModel;
import com.example.travel_platform.service.PackingListService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/packing-lists")
public class PackingListController {
    
    @Autowired
    private PackingListService packingListService;
    
    // Get all packing lists
    @GetMapping
    public ResponseEntity<List<PackingListModel>> getAllPackingLists() {
        List<PackingListModel> packingLists = packingListService.getAllPackingLists();
        return ResponseEntity.ok(packingLists);
    }
    
    // Get packing list by ID
    @GetMapping("/{id}")
    public ResponseEntity<PackingListModel> getPackingListById(@PathVariable String id) {
        Optional<PackingListModel> packingList = packingListService.getPackingListById(id);
        return packingList.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    // Create a new packing list
    @PostMapping
    public ResponseEntity<PackingListModel> createPackingList(@RequestBody PackingListModel packingList) {
        PackingListModel createdList = packingListService.createPackingList(packingList);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdList);
    }
    
    // Update a packing list
    @PutMapping("/{id}")
    public ResponseEntity<PackingListModel> updatePackingList(
            @PathVariable String id, 
            @RequestBody PackingListModel packingList) {
        
        PackingListModel updatedList = packingListService.updatePackingList(id, packingList);
        if (updatedList != null) {
            return ResponseEntity.ok(updatedList);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Delete a packing list
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackingList(@PathVariable String id) {
        boolean deleted = packingListService.deletePackingList(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // Get items for a packing list
    @GetMapping("/{listId}/items")
    public ResponseEntity<List<PackingItemModel>> getPackingItems(@PathVariable String listId) {
        List<PackingItemModel> items = packingListService.getPackingItems(listId);
        return ResponseEntity.ok(items);
    }
    
    // Add an item to a packing list
    @PostMapping("/{listId}/items")
    public ResponseEntity<PackingItemModel> addPackingItem(
            @PathVariable String listId,
            @RequestBody PackingItemModel item) {
        
        PackingItemModel addedItem = packingListService.addPackingItem(listId, item);
        if (addedItem != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(addedItem);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Update a packing item
    @PutMapping("/{listId}/items/{itemId}")
    public ResponseEntity<PackingItemModel> updatePackingItem(
            @PathVariable String listId,
            @PathVariable String itemId,
            @RequestBody PackingItemModel item) {
        
        PackingItemModel updatedItem = packingListService.updatePackingItem(listId, itemId, item);
        if (updatedItem != null) {
            return ResponseEntity.ok(updatedItem);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Delete a packing item
    @DeleteMapping("/{listId}/items/{itemId}")
    public ResponseEntity<Void> deletePackingItem(
            @PathVariable String listId,
            @PathVariable String itemId) {
        
        boolean deleted = packingListService.deletePackingItem(listId, itemId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
