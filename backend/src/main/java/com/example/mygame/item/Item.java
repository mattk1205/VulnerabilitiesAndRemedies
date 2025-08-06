package com.example.mygame.item;

import com.example.mygame.entity.Entity;

public interface Item {

    public String getName();
    public String getDescription();
    int use(Entity target);
}
