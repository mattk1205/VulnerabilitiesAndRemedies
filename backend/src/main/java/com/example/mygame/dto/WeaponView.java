package com.example.mygame.dto;

import com.example.mygame.inventory.Inventory;
import com.example.mygame.item.Item;
import com.example.mygame.item.ItemRegistry;
import com.example.mygame.item.Weapon;

public class WeaponView extends ItemView {

    private final int durability;
    private final double critChance;
    private final double damage;

    public WeaponView(String id, String name, String description, int quantity, boolean known, int durability,
            double critChance, double damage) {
        super(id, name, description, quantity, known);
        this.durability = durability;
        this.critChance = critChance;
        this.damage = damage;
    }

    public WeaponView(String itemId, Inventory inv) {
        super(itemId, inv);
        Item item = ItemRegistry.get(itemId);
        if (item == null) {
            throw new IllegalArgumentException("Item not found in registry");
        }
        if (!(item instanceof Weapon)) {
            throw new IllegalArgumentException("Item is not weapon");
        }
        Weapon weapon = (Weapon) item;
        this.critChance = weapon.getCritChance();
        this.damage = weapon.getDamage();
        this.durability = weapon.getDurability();

    }

    public WeaponView(String itemId, Inventory inv, int durability, double critChance, double damage) {
        super(itemId, inv);
        this.durability = durability;
        this.critChance = critChance;
        this.damage = damage;
    }

    public int getDurability() {
        return durability;
    }

    public double getCritChance() {
        return critChance;
    }

    public double getDamage() {
        return damage;
    }
    
}
