package com.example.mygame.entity;

import com.example.mygame.inventory.Inventory;

public interface Entity {
    public String getName();
    public String getId();
    public void setId(String id);
    public void setName(String name);
    public void attack(Entity target);
    public void takeDamage(double amount);
    public void heal(double amount);
    public void die();
    public void setBaseDamage(double baseDamage);
    public void setAlive(boolean isAlive);
    public void setHealth(double health);
    public void setMaxHealth(double maxHealth);
    public double getHealth();
    public double getMaxHealth();
    public double getBaseDamage();
    public Inventory getInventory();
}
