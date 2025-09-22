package com.example.mygame.item;

import com.example.mygame.entity.Entity;

public abstract class Weapon implements Item {
    private double damage;
    private String description;
    private double critChance;
    private int durability;
    private String name;
    private String id;
    
    public Weapon(String name, String description, double damage, double critChange, int durability, String id) {
        this.name = name;
        this.description = description;
        this.damage = damage;
        this.critChance = critChange;
        this.durability = durability;
        this.id = "wp_" + id;
    }


    @Override
    public String toString() {
        return "Weapon [damage=" + damage + ", description=" + description + ", critChance=" + critChance
                + ", durability=" + durability + ", name=" + name + ", id=" + id + "]";
    }
    public double getDamage() {
        return damage;
    }
    public void setDamage(double damage) {
        this.damage = damage;
    }
    public double getCritChance() {
        return critChance;
    }
    public void setCritChance(double critChange) {
        this.critChance = critChange;
    }
    public int getDurability() {
        return durability;
    }
    public void setDurability(int durability) {
        this.durability = durability;
    }
    @Override
    public String getDescription() {
        return this.description;
    }
    @Override
    public String getName() {
        return name;
    }
    @Override
    public int use(Entity target) {
        System.out.println("You used the " + name);
        durability--;
        if (durability <= 0){
            System.out.println("Your " + this.name + " just broke!");
            target.getInventory().removeItem(this.name, 1);
        }
        return 0;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
