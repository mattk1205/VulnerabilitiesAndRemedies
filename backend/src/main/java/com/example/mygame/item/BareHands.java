package com.example.mygame.item;

import com.example.mygame.entity.Entity;

public class BareHands extends Weapon {
    
    public BareHands() {
        super("Bare Hands", "Who brings a fists to a sword fight?", 5, 0.01, Integer.MAX_VALUE, "bare_hands");
    }

    
    @Override
    public double getCritChance() {
        return super.getCritChance();
    }

    @Override
    public double getDamage() {
        return super.getDamage();
    }

    @Override
    public String getDescription() {
        return super.getDescription();
    }

    @Override
    public int getDurability() {
        return super.getDurability();
    }

    @Override
    public String getName() {
        return super.getName();
    }

    @Override
    public void setCritChance(double critChange) {
        super.setCritChance(critChange);
    }

    @Override
    public void setDamage(double damage) {
        super.setDamage(damage);
    }

    @Override
    public void setDurability(int durability) {
        super.setDurability(durability);
    }

    @Override
    public int use(Entity target) {
        super.use(target);
        return 0;
    }

    @Override
    public String toString() {
        return super.toString();
    }

    @Override
    public String getId() {
        return super.getId();
    }
}
