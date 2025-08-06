package com.example.mygame.item;

import com.example.mygame.entity.Entity;

public class HealthPotion extends Potion {

    public HealthPotion(String name, String description, double number) {
        super("Health Potion", "Heals you for 25 health", 25.0);
    }

    @Override
    public String getDescription() {
        return super.getDescription();
    }

    @Override
    public String getName() {
        return super.getName();
    }

    @Override
    public int use(Entity target) {
        super.use(target);
        target.heal(super.number);
        return 0;
        
    }

    @Override
    public String toString() {
        return super.toString();
    }

}
