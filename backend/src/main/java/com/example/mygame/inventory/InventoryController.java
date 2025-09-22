package com.example.mygame.inventory;

import com.example.mygame.dto.InventoryView;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<InventoryView> getInventory() {
        InventoryView inventory = inventoryService.getInventoryView();
        if (inventory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(inventory);
    }

    @DeleteMapping("/items/{itemId}")
    @CrossOrigin
    public ResponseEntity<InventoryView> removeItem(@PathVariable String itemId) {
        InventoryView inventory = inventoryService.removeItem(itemId);
        if (inventory == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(inventory);
    }

    @PostMapping("/items/{itemId}")
    @CrossOrigin
    public ResponseEntity<InventoryView> addItem(
            @PathVariable String itemId, 
            @RequestParam(defaultValue = "1") int quantity) {
        InventoryView inventory = inventoryService.addItem(itemId, quantity);
        if (inventory == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(inventory);
    }
}