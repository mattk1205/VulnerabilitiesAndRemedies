package com.example.mygame.item;

import com.example.mygame.entity.Entity;

public abstract class Potion implements Item{

    private String name;
    protected double number;
    private String description;
    private String id;

    public Potion(String name, String description, double number, String id){
        this.name = name;
        this.number = number;
        this.description = description;
        this.id = "pn_" + id;
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

    public void setName(String name) {
        this.name = name;
    }

    public double getNumber() {
        return number;
    }

    public void setNumber(double number) {
        this.number = number;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Potion [name=" + name + ", number=" + number + ", description=" + description + ", id=" + id + "]";
    }

}