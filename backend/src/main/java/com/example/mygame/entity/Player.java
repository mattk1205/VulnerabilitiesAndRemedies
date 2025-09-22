package com.example.mygame.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.mongodb.core.mapping.Document;


import com.example.mygame.inventory.Inventory;
import com.example.mygame.item.GameItems;
import com.example.mygame.item.ItemRegistry;
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
    private String equippedWeaponId;
    private boolean isAlive;

    // Initial constructor call one at beginning of game
    public Player(String name) {
        this.id = null;
        this.name = name;
        this.inventory = new Inventory();
        this.health = 75.0;
        this.baseDamage = 25.0;
        this.maxHealth = 100.0;
        this.equippedWeaponId = "wp_bare_hands";
        this.isAlive = true;
        System.out.println("Creating new player with ID: " + id + " and name: " + name);
    }

    // Mongo DB needs to know how to construct the Player from saved data
    // Called whenever reloading game state
    @PersistenceCreator
    public Player(String id, String name, Inventory inventory, double health, double baseDamage, double maxHealth, String equippedWeaponId, boolean isAlive) {
        this.id = id;
        this.name = name;
        this.inventory = inventory != null ? inventory : new Inventory();
        this.health = health;
        this.baseDamage = baseDamage;
        this.maxHealth = maxHealth;
        this.equippedWeaponId = equippedWeaponId;
        this.isAlive = isAlive;
        System.out.println("Persistence Creating player with ID: " + id + " and name: " + name);

    } 

    public void setId(String id) {
        this.id = id;
    }

    public String getEquippedWeaponId() {
        return equippedWeaponId;
    }

    public void setEquippedWeapon(String weaponId) {
        this.equippedWeaponId = weaponId;
    }

    public boolean isAlive() {
        return isAlive;
    }
    
    public String getName() {
        return this.name;
    }

     
    public String getId() {
        return this.id;
    }

    public void equipWeapon(String weaponId) {
        if (weaponId != null && weaponId.equals(GameItems.BARE_HANDS.getId())) {
            this.equippedWeaponId = weaponId;
            return;
        }
        if (ItemRegistry.get(weaponId) instanceof Weapon == false) {
            System.out.println(weaponId + "is not a weapon");
            return;
        }
        if (!inventory.getItems().containsKey(weaponId)) {
            System.out.println("Weapon not in inventory");
            return;
        }
        this.equippedWeaponId = weaponId;
        System.out.println(this.name + " equipped " + weaponId);
    }

    public void unequipWeapon() {
        if (!inventory.getItems().containsKey(equippedWeaponId)) {
            System.out.println("Weapon not in inventory");
            return;
        }
        System.out.println(this.name + " unequipped " + equippedWeaponId);
        equipWeapon(GameItems.BARE_HANDS.getId());
    }

     
    public void attack(Entity target) {
        return;
    }

     
    @Override
    public String toString() {
        return name  +  "\n Inventory=" + inventory + ", Health="
                + health + ", Base Damage=" + baseDamage + "id: " + id;
    }

     
    public void heal(double amount) {
        System.out.println("Healing self: " + this.health + " + " + amount);
        if (health + amount <= maxHealth)
            health += amount;
        else
            health = maxHealth;
        System.out.println("Result: " + this.health);
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

    public void setEquippedWeaponId(String equippedWeaponId) {
        this.equippedWeaponId = equippedWeaponId;
    }

}
