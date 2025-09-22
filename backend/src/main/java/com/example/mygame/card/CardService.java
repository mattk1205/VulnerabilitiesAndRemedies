package com.example.mygame.card;

import java.io.InputStream;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import com.example.mygame.game.GameConfig;

@Service
public class CardService {
    
    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Card getCard(String cardId) {
        return cardRepository.findById(cardId).orElse(null);
    }

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public long getTotalCardCount() {
        return cardRepository.count();
    }

    public List<Card> getAllHacks() {
        return cardRepository.findByIdStartingWith("hk_");
    }

    public List<Card> getAllRemediations() {
        return cardRepository.findByIdStartingWith("rm_");
    }

    public List<Card> getCountersForHack(String hackId) {
        return cardRepository.findByResponsesContaining(hackId);
    }

    public boolean canCounter(String hackId, String remediationId) {
        return cardRepository.existsByIdAndResponsesContaining(hackId, remediationId);
    }

    public List<Card> getCardsByEffect(String effect) {
        return cardRepository.findByEffect(effect);
    }

    public List<Card> getCardsByComplexity(int complexity) {
        return cardRepository.findByComplexity(complexity);
    }

    public List<Card> searchCardsByName(String name) {
        return cardRepository.findByNameContainingIgnoreCase(name);
    }

     public List<Card> getCardsWithoutEffect() {
        return cardRepository.findByEffectIsNull();
    }

    // Random card selection for gameplay
    public Card getRandomHack() {
        List<Card> hacks = getAllHacks();
        if (hacks.isEmpty()) {
            return null;
        }
        Random random = new Random();
        return hacks.get(random.nextInt(hacks.size()));
    }

    public Card getRandomRemediation() {
        List<Card> remediations = getAllRemediations();
        if (remediations.isEmpty()) {
            return null;
        }
        Random random = new Random();
        return remediations.get(random.nextInt(remediations.size()));
    }

    // Data initialization
    public int initializeCardsFromYaml() {
        try {
            // Clear existing cards
            cardRepository.deleteAll();
            
            // Load from YAML
            Yaml yaml = new Yaml();
            InputStream inputStream = this.getClass()
                    .getClassLoader()
                    .getResourceAsStream("game.yml");
            
            if (inputStream == null) {
                throw new RuntimeException("game.yml not found in resources");
            }
            
            GameConfig config = yaml.loadAs(inputStream, GameConfig.class);
            List<Card> cards = config.getGame().getCards();
            
            // Save to database
            cardRepository.saveAll(cards);
            
            return cards.size();
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to load cards from YAML", e);
        }
    }
}