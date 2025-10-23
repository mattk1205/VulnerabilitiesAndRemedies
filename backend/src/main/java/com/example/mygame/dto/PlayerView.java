// src/main/java/com/example/mygame/dto/PlayerView.java (Refined)

package com.example.mygame.dto;

public class PlayerView {
    private final String id;
    private final String name;
    private final double health;
    private final double maxHealth;
    private final double baseDamage;
    private final String equippedWeaponId;
    private final boolean isAlive;

    public PlayerView(String id, String name, double health, double maxHealth, double baseDamage, String equippedWeaponId, boolean isAlive) {
        this.id = id;
        this.name = name;
        this.health = health;
        this.maxHealth = maxHealth;
        this.baseDamage = baseDamage;
        this.equippedWeaponId = equippedWeaponId;
        this.isAlive = isAlive;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getHealth() {
        return health;
    }

    public double getMaxHealth() {
        return maxHealth;
    }

    public double getBaseDamage() {
        return baseDamage;
    }

    public String getEquippedWeaponId() {
        return equippedWeaponId;
    }

    public boolean isAlive() {
        return isAlive;
    }

    @Override
    public String toString() {
        return "PlayerView [id=" + id + ", name=" + name + ", health=" + health + ", maxHealth=" + maxHealth
                + ", baseDamage=" + baseDamage + ", equippedWeaponId=" + equippedWeaponId + ", isAlive=" + isAlive
                + "]";
    }

}