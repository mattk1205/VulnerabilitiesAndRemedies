package com.example.mygame.entity.enemy;

import com.example.mygame.entity.Entity;
import com.example.mygame.inventory.Inventory;

public class Captain extends Enemy {

    public Captain(double health, double baseDamage, Inventory inventory) {
        super(100, 25.0, inventory, 100);
    }

   @Override
    public void attack(Entity target) {
        if (Math.random() > 0.8)
            target.takeDamage(baseDamage * 2);
        target.takeDamage(baseDamage);
    }

   @Override
   public double getBaseDamage() {
    // TODO Auto-generated method stub
    return super.getBaseDamage();
   }

   @Override
   public double getHealth() {
    // TODO Auto-generated method stub
    return super.getHealth();
   }

   @Override
   public Inventory getInventory() {
    // TODO Auto-generated method stub
    return super.getInventory();
   }

   @Override
   public void setBaseDamage(int baseDamage) {
    // TODO Auto-generated method stub
    super.setBaseDamage(baseDamage);
   }

   @Override
   public void setHealth(int health) {
    // TODO Auto-generated method stub
    super.setHealth(health);
   }


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

   @Override
   public void die() {
    // TODO Auto-generated method stub
    super.die();
   }
}