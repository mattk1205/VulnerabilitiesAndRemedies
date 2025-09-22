package com.example.mygame.item;

import com.example.mygame.inventory.Inventory;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public final class ItemRegistry {
    
    public static final Map<String, Item> REGISTRY = new HashMap<>();

    static {
        register(GameItems.HEALTH_POTION);
        register(GameItems.RUSTY_SWORD);
        register(GameItems.BARE_HANDS);

    }

    public static void register(Item item){
        REGISTRY.put(item.getId(), item);
    }

    public static Item get(String id) {
        return REGISTRY.get(id);
    }

    public static Map<String, Item> getAll() {
        return Collections.unmodifiableMap(REGISTRY);
    }

    public static int getQuantity(String itemId, Inventory inv) {
        if (inv.getItems().containsKey(itemId)) {
            return inv.getQuantity(itemId);
        }
        else {
            throw new IllegalArgumentException("Item not found in registry");
        }
    }
}
