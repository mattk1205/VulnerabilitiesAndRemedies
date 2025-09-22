package com.example.mygame.inventory;

import com.example.mygame.dto.InventoryView;
import com.example.mygame.dto.ItemView;
import com.example.mygame.item.Item;
import com.example.mygame.item.ItemRegistry;
import com.example.mygame.entity.Player;
import com.example.mygame.entity.PlayerRepository;
import com.example.mygame.entity.PlayerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class InventoryService {

    private final PlayerService playerService;
    private final PlayerRepository playerRepository;

    public InventoryService(PlayerService playerService, PlayerRepository playerRepository) {
        this.playerService = playerService;
        this.playerRepository = playerRepository;
    }

    @Transactional
    public InventoryView removeItem(String itemId) {
        Player player = playerService.getPlayer();
        if (player == null) {
            System.out.println("No player found");
            return null;
        }
        
        Inventory inv = player.getInventory();
        if (inv == null) {
            System.out.println("Player has no inventory");
            return null;
        }
        
        //check if removing equipped weapon
        if (player.getEquippedWeaponId() != null && player.getEquippedWeaponId().equals(itemId)) {
            System.out.println("Removing equipped weapon");
            player.unequipWeapon();
        }
        
        boolean success = inv.removeItem(itemId, 1);
        if (!success) {
            System.out.println("Failed to remove item: " + itemId);
            return null;
        }
        playerRepository.save(player);
        return new InventoryView(inv);
    }

    @Transactional
    public InventoryView addItem(String itemId, int quantity) {
        Player player = playerService.getPlayer();
        if (player == null) {
            System.out.println("No player found");
            return null;
        }
        
        Inventory inv = player.getInventory();
        if (inv == null) {
            System.out.println("Player has no inventory");
            return null;
        }
        
        boolean success = inv.addItem(itemId, quantity);
        if (!success) {
            System.out.println("Failed to add item: " + itemId);
            return null;
        }
        
        return new InventoryView(inv);
    }

    public InventoryView getInventoryView() {
        Player player = playerService.getPlayer();
        if (player == null) {
            System.out.println("No player found");
            return null;
        }

        Inventory inv = player.getInventory();
        if (inv == null) {
            // Create an empty view if player has no inventory yet
            return new InventoryView(0, 0, 0, new ArrayList<ItemView>());
        }

        List<ItemView> detailed = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : inv.getItems().entrySet()) {
            String itemId = entry.getKey();
            Integer quantity = entry.getValue();
            int qty = quantity == null ? 0 : quantity;

            Item item = ItemRegistry.get(itemId);
            if (item != null) {
                detailed.add(new ItemView(
                        item.getId(),
                        item.getName(),
                        item.getDescription(),
                        qty,
                        true
                ));
            } else {
                System.out.println("Unknown item in inventory: " + itemId);
                detailed.add(new ItemView(
                        itemId,
                        "Unknown Item",
                        "Unknown item",
                        qty,
                        false
                ));
            }
        }

        return new InventoryView(
                inv.getCapacity(),
                inv.total(),
                inv.spaceLeft(),
                detailed
        );
    }
    
    public boolean hasItem(String itemId) {
        Player player = playerService.getPlayer();
        if (player == null || player.getInventory() == null) {
            return false;
        }
        return player.getInventory().getItems().containsKey(itemId);
    }
    
    public int getItemQuantity(String itemId) {
        Player player = playerService.getPlayer();
        if (player == null || player.getInventory() == null) {
            return 0;
        }
        return player.getInventory().getItems().getOrDefault(itemId, 0);
    }
}