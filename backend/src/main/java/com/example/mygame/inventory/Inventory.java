package com.example.mygame.inventory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import com.example.mygame.dto.ItemView;
import com.example.mygame.item.GameItems;
import com.example.mygame.item.HealthPotion;
import com.example.mygame.item.Item;
import com.example.mygame.item.ItemRegistry;
import com.example.mygame.item.RustySword;

@Component
public class Inventory {
    
    private int capacity;
    @Field
    private final Map<String,Integer> items;

    public Inventory() {
        this.capacity = 5;
        this.items = new HashMap<>();
        RustySword startingRustySword = GameItems.RUSTY_SWORD;
        HealthPotion startingHealthPotion = GameItems.HEALTH_POTION;
        addItem(startingRustySword, 1);
        addItem(startingHealthPotion, 1);
    }

    // MongoDB needs to know how to construct the inventory from saved data
    @PersistenceCreator
    public Inventory(Map<String, Integer> items, int capacity){
        this.items = new HashMap<>();
        this.capacity = capacity;
        if (items != null) {
            for (Map.Entry<String,Integer> e : items.entrySet()) {
                Integer qty = e.getValue();
                if (qty != null && qty > 0) {
                    addItem(e.getKey(), qty);
                }
            }
        }
    }

    public int total() {
        int total = 0;
        for (Integer v : items.values()) {
            if (v != null) total += v;
        }
        return total;
    }
    
    public Map<String, Integer> getItems() {
        return Collections.unmodifiableMap(items);
    } 

    public boolean removeItem(String itemId, int n) {
        if (itemId == null || itemId.isEmpty() || n <= 0) return false;
      
        Integer current = items.get(itemId);
        if (current == null || current == 0) return false;

        int toRemove = Math.min(n, current);
        int remain = current - toRemove;
        if (remain == 0) items.remove(itemId);
        else items.put(itemId, remain);
        return true;
    }

   
    public void removeItem(Item item, int n) {
        removeItem(item.getName(), n);
    }
    
    public int spaceLeft() {
        int left = capacity - total();
        if (left <= 0)
            return 0;
        else 
            return left;
    }
   
    
    public boolean addItem(String itemId, int n) {
        if (itemId == null || itemId.isEmpty() || n <= 0) return false;

        int free = spaceLeft(); 
        if (free == 0) return false;

        int toAdd = Math.min(n, free);
        Integer current = items.get(itemId);
        items.put(itemId, (current == null ? 0 : current) + toAdd);
        return true;
    }

    public boolean addItem(Item item, int n) {
       if (item == null || n <= 0) return false;
        return addItem(item.getId(), n); 
    }

    public void setCapacity(int capacity) {
        if (capacity < 0) throw new IllegalArgumentException("capacity cannot be negative");
        this.capacity = capacity;
    }

     @Override
    public String toString() {
        return "Inventory[maxCapacity=" + capacity +
               ", totalUnits=" + total() +
               ", items=" + items + "]";
    }

     public int getCapacity() {
         return capacity;
     }

     public List<ItemView> getListView() {
        List<ItemView> detailed = new ArrayList<>();
        for (Map.Entry<String, Integer> e : getItems().entrySet()) {
            String itemId = e.getKey();
            int qty = e.getValue() == null ? 0 : e.getValue();

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
                detailed.add(new ItemView(
                        itemId,
                        itemId,
                        "Unknown item",
                        qty,
                        false
                ));
            }
        }
        return detailed;
    }

    public int getQuantity(String itemId) {
        if (!items.containsKey(itemId))
            return 0;
        return items.get(itemId);
    }

    public int getQuantity(Item item) {
       return getQuantity(item.getId());
    }
    
}
