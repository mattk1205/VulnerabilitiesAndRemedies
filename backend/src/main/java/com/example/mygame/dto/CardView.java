package com.example.mygame.dto;

import java.util.ArrayList;

public class CardView {
    private String id;
    private String description;
    private final ArrayList<String> associations;
    
    public CardView(String id, String image, ArrayList<String> associations) {
        this.id = id;
        this.description = image;
        this.associations = associations;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String image) {
        this.description = image;
    }

    public ArrayList<String> getAssociations() {
        return associations;
    }
    
}
