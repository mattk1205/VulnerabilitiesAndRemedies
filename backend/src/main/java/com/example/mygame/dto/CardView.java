package com.example.mygame.dto;

import com.example.mygame.card.CardService;

public class CardView {
    private final String id;
    private final String name;
    private final String description;
    private final boolean known;
    private final int complexity;

    public CardView(String id, String name, String description, int complexity, boolean known, CardService cardService) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.complexity = complexity;
        this.known = known;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getComplexity() {
        return complexity;
    }

    public boolean isKnown() {
        return known;
    }

   
}
