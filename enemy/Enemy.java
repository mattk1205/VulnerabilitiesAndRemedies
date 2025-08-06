package com.example.mygame.entity.enemy;

import com.example.mygame.entity.Entity;
import com.example.mygame.inventory.Inventory;

public abstract class Enemy implements Entity{
    double health;
    double baseDamage;
    double maxHealth;
    private final Inventory inventory;

    public Enemy(double health, double baseDamage, Inventory inventory, double maxHealth) {
        this.health = health;
        this.baseDamage = baseDamage;
        this.inventory = inventory;
        this.maxHealth = maxHealth;
    }

    @Override
    public void die() {
        // TODO Auto-generated method stub
        
    }

    public double getHealth() {
        return health;
    }
    public void setHealth(int health) {
        this.health = health;
    }
    public double getBaseDamage() {
        return baseDamage;
    }
    public void setBaseDamage(int baseDamage) {
        this.baseDamage = baseDamage;
    }
    public Inventory getInventory() {
        return inventory;
    }

    public abstract void attack(Entity target);

    @Override
    public double getMaxHealth() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public String getName() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void heal(double amount) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void setBaseDamage(double baseDamage) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void takeDamage(double amount) {
        // TODO Auto-generated method stub
        
    }
}
