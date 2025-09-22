package com.example.mygame.dto;

import java.util.List;
import com.example.mygame.inventory.Inventory;

public class InventoryView {
    private final int capacity;
    private final int totalUnits;
    private final int spaceLeft;
    private final List<ItemView> items;

    public InventoryView(int capacity, int totalUnits, int spaceLeft, List<ItemView> items) {
        this.capacity = capacity;
        this.totalUnits = totalUnits;
        this.spaceLeft = spaceLeft;
        this.items = items;
    }

    public InventoryView(Inventory inv) {
        this.capacity = inv.getCapacity();
        this.totalUnits = inv.total();
        this.spaceLeft = inv.spaceLeft();
        this.items = inv.getListView();
        }
    
    public int getCapacity() {
        return capacity;
    }
    public int getTotalUnits() {
        return totalUnits;
    }
    public int getSpaceLeft() {
        return spaceLeft;
    }
    public List<ItemView> getItems() {
        return items;
    }
}