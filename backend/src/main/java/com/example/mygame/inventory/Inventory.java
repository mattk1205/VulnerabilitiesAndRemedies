package com.example.mygame.inventory;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.PersistenceCreator;

import com.example.mygame.item.GameItems;

public class Inventory {
    
    private int maxCapacity;
    private int currentSize;
    private final Map<String,Integer> items;

    public Inventory() {
        maxCapacity = 1;
        items = new HashMap<>();
        currentSize = 0;
        items.put(GameItems.RUSTY_SWORD.getName(), 1);
    }

    // MongoDB needs to know how to construct the inventory from saved data
    @PersistenceCreator
    public Inventory(Map<String, Integer> items, int maxCapacity, int currentSize){
        this.items = items;
        this.maxCapacity = maxCapacity;
        this.currentSize = currentSize;
    }

    public int getCurrentSize() {
        return currentSize;
    }

    public void setCurrentSize(int currentSize) {
        this.currentSize = currentSize;
    }

    
    public Map<String,Integer> getItems() {
        return items;
    }

    public void removeItem(String itemName) {
        removeItem(itemName, 1);
    }
    public void removeItem(String itemName, int n) {
        if (items.isEmpty()) {
            System.err.println("Inventory Empty");
            return;
        }
        if (n <= 0 ) {
            System.err.println("Removing 0 or negative value");
            return;
        }
        if (n > maxCapacity || n > currentSize){
            System.err.println("Quantity larger than possible");
            return;
        }
        if (items.getOrDefault(itemName, 0) == 0) {
            System.err.println("Item not in inventory");
            return;
        }
        int currentAmt = items.getOrDefault(itemName, 0);
        if (n >= currentAmt) {
            items.remove(itemName);
            currentSize -= currentAmt;
        }
        else {
            items.put(itemName, currentAmt - n);
            currentSize -=n;
        }
        System.out.println("You removed " + n + " " + itemName + "(s)");
    }

    public void addItem(String itemName) {
       addItem(itemName, 1);
    }
    public void addItem(String itemName, int n) {
        if (n <= 0) {
            System.err.println("Added 0 or negative value");
            return;
        }
        if (currentSize + n > maxCapacity) {
            int currentFit = (-maxCapacity + currentSize);
            System.out.println("Your inventory is full. Adding " + currentFit + " " + itemName + "(s)");
            currentSize = maxCapacity;
            return;
        } 
        items.put(itemName, items.getOrDefault(itemName, 0) + n);
        System.out.println("You received " + n + " " + itemName + "(s)");
        currentSize += n;
    }

    public int getMaxCapacity() {
        return maxCapacity;
    }

    public void setMaxCapacity(int maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    @Override
    public String toString() {
        return "Inventory [maxCapacity=" + maxCapacity + ", currentSize=" + currentSize + ", items=" + items.toString() + "]";
    }
    
}
