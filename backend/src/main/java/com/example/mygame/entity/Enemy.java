package com.example.mygame.entity;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;

import com.example.mygame.inventory.Inventory;

@Component
public class Enemy implements Entity{

    @Id
    private String id;

    // @JsonProperty(value="name")
    // @Column(name = "name")
    private String name;

    // @JsonProperty(value="inventory")
    
    private final Inventory inventory;  
    private double health;
    private double baseDamage;
    private double maxHealth;
    private boolean isAlive;

    public void setId(String id) {
        this.id = id;
    }

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean isAlive) {
        this.isAlive = isAlive;
    }

    // Initial constructor call one at beginning of combat
    public Enemy() {
        this.id = null;
        this.inventory = new Inventory();
        this.health = 100.0;
        this.baseDamage = 25.0;
        this.maxHealth = 100.0;
    }

    
    public String getName() {
        return this.name;
    }

    public String getId() {
        return this.id;
    }

    
    public String toString() {
        return name  +  "\n Inventory=" + inventory + ", Health="
                + health + ", Base Damage=" + baseDamage + "]";
    }

    
    public void heal(double amount) {
        if (health + amount <= maxHealth)
            health += amount;
        else
            health = maxHealth;
    }

    
    public void takeDamage(double amount) {
        if (health - amount <= 0) {
            health = 0;
            die();
        }
        else
            health -= amount;
    }

    
    public void attack(Entity target) {
        target.takeDamage(baseDamage);
    }

    
    public double getMaxHealth() {
        return maxHealth;
    }

    
    public void setBaseDamage(double baseDamage) {
        this.baseDamage = baseDamage;
    }

    
    public double getBaseDamage() {
        return baseDamage;
    }

    
    public Inventory getInventory() {
        return inventory;
    }

    
    public double getHealth() {
        return health;
    }

    
    public void setName(String name) {
        this.name = name;
    }

    
    public void setHealth(double health) {
        this.health = health;
    }

    
    public void setMaxHealth(double maxHealth) {
        this.maxHealth = maxHealth;
    }

    
    public void die() {
        isAlive = false;
        //drop loot
    }

}
