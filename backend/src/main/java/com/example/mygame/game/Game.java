package com.example.mygame.game;

import com.example.mygame.card.Card;
import java.util.List;

public class Game {
    private List<Card> cards;
    
    public List<Card> getCards() { 
        return cards; 
    }
    
    public void setCards(List<Card> cards) { 
        this.cards = cards; 
    }
}