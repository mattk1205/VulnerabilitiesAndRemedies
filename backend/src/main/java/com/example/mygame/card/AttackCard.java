package com.example.mygame.card;

import java.util.ArrayList;

public class AttackCard implements Card {

    private String description;
    private String name;
    private ArrayList<String> remediesNameList;
    private int complexity;

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public ArrayList<String> getRemediesNameList() {
        return remediesNameList;
    }
    public void setRemediesNameList(ArrayList<String> remediesNameList) {
        this.remediesNameList = remediesNameList;
    }
    public int getComplexity() {
        return complexity;
    }
    public void setComplexity(int complexity) {
        this.complexity = complexity;
    }
}
