package com.example.mygame.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.mygame.inventory.Inventory;
import com.example.mygame.item.GameItems;
import com.example.mygame.item.Weapon;

@Document(collection = "player")
public class Player implements Entity{

    @Id
    private String id;
    private String name;    
    private final Inventory inventory;  
    private double health;
    private double baseDamage;
    private double maxHealth;
    private Weapon equippedWeapon;
    private boolean isAlive;

    public void setId(String id) {
        this.id = id;
    }

    public Weapon getEquippedWeapon() {
        return equippedWeapon;
    }

    public void setEquippedWeapon(Weapon equippedWeapon) {
        this.equippedWeapon = equippedWeapon;
    }

    public boolean isAlive() {
        return isAlive;
    }

    // Initial constructor call one at beginning of game
    public Player() {
        this.id = null;
        this.inventory = new Inventory();
        this.health = 100.0;
        this.baseDamage = 25.0;
        this.maxHealth = 100.0;
        this.equippedWeapon = ((Weapon) GameItems.RUSTY_SWORD);
        this.isAlive = true;
    }

    // Mongo DB needs to know how to construct the Player from saved data
    // Called whenever reloading game state
    @PersistenceCreator
    public Player(String id, String name, Inventory inventory, double health, double baseDamage, double maxHealth, Weapon equippedWeapon, boolean isAlive) {
        this.id = id;
        this.name = name;
        this.inventory = inventory;
        this.health = health;
        this.baseDamage = baseDamage;
        this.maxHealth = maxHealth;
        this.equippedWeapon = equippedWeapon;
        this.isAlive = isAlive;
    }

     
    public String getName() {
        return this.name;
    }

     
    public String getId() {
        return this.id;
    }

    public void equipWeapon(Weapon weapon) {
        if (!inventory.getItems().containsKey(weapon.getName())) {
            System.out.println("Weapon not in inventory");
            return;
        }
        this.equippedWeapon = weapon;
        System.out.println(this.name + " equipped " + weapon.getName());
    }

     
    public void attack(Entity target) {
        equippedWeapon.use(target);
        if (Math.random() > equippedWeapon.getCritChance())
            target.takeDamage((equippedWeapon.getDamage() + baseDamage) * 2);
        target.takeDamage(equippedWeapon.getDamage() + baseDamage);
    }

     
    @Override
    public String toString() {
        return name  +  "\n Inventory=" + inventory + ", Health="
                + health + ", Base Damage=" + baseDamage + ", Equipped Weapon:" + equippedWeapon;
    }

     
    public void heal(double amount) {
        if (health + amount <= maxHealth)
            health += amount;
        else
            health = maxHealth;
    }

     
    public void takeDamage(double amount) {
        if (health - amount <= 0)
            health = 0;
        else
            health -= amount;
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
        // TODO Auto-generated method stub
        
    }

     
    public void setAlive(boolean isAlive) {
        this.isAlive = isAlive;
    }

}
