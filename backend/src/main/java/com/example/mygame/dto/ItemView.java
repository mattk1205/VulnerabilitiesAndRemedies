package com.example.mygame.dto;

import com.example.mygame.inventory.Inventory;
import com.example.mygame.item.Item;
import com.example.mygame.item.ItemRegistry;

public class ItemView {
    private final String id;
    private final String name;
    private final String description;
    private final int quantity;
    private final boolean known;

    public ItemView(String id, String name, String description, int quantity, boolean known) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.known = known;
    }

    public ItemView(String itemId, Inventory inv) {
        Item item = ItemRegistry.get(itemId);
        if (item == null) {
            throw new IllegalArgumentException("Item not found in registry");
        }
        this.id = itemId;
        this.name = item.getName();
        this.description = item.getDescription();
        this.quantity = inv.getQuantity(item);
        this.known = (item != null);
}

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getQuantity() {
        return quantity;
    }

    public boolean isKnown() {
        return known;
    }

   
}
