package com.example.mygame.item;

import com.example.mygame.entity.Entity;

public abstract class Weapon implements Item {
    private double damage;
    private String description;
    private double critChance;
    private int durability;
    private String name;
    private boolean isEquipped;
    
    public Weapon(String name, String description, double damage, double critChange, int durability, boolean isEquipped) {
        this.name = name;
        this.description = description + ":\n [damage=" + damage + ", critChange=" + critChance + ", durability=" + durability + "]";
        this.damage = damage;
        this.critChance = critChange;
        this.durability = durability;
        this.isEquipped = false;
    }

    public void equip() {
        isEquipped = true;
    }

    @Override
    public String toString() {
        return getName();
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
        return name + " " + description;
    }
    @Override
    public String getName() {
        return name;
    }
    @Override
    public int use(Entity target) {
        if(!isEquipped) {
            System.out.println("Weapon not equipped. Cannot Use");
            return 1;
        }
        System.out.println("You used the " + name);
        durability--;
        if (durability <= 0){
            System.out.println("Your " + this.name + " just broke!");
            target.getInventory().removeItem(this.name, 1);
        }
        return 0;
    }
}
