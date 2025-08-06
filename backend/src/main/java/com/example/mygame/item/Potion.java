package com.example.mygame.item;

import com.example.mygame.entity.Entity;

public abstract class Potion implements Item{

    private String name;
    protected double number;
    private String description;

    public Potion(String name, String description, double number){
        this.name = name;
        this.number = number;
        this.description = description;
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public int use(Entity target) {
        System.out.println("You used the " + name);
        target.getInventory().removeItem(this.name, 1);
        return 0;
    }

}