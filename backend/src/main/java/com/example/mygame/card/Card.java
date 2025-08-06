package com.example.mygame.card;

public interface Card {

    public String getName();
    public String getDescription();
    public int getComplexity();
    public void setDescription(String description);
    public void setName(String name);
    public void setComplexity(int complexity);
}
