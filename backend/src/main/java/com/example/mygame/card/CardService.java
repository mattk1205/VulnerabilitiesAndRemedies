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
    public List<Card> getRandomHack() {
        List<Card> hacks = getAllHacks();
        if (hacks.isEmpty()) {
            return null;
        }
        Random random = new Random();
        Card choice = hacks.get(random.nextInt(hacks.size()));
        hacks.clear();
        hacks.add(choice);
        return hacks;
    }

    public List<Card> getRandomRemediation() {
        List<Card> remediations = getAllRemediations();
        if (remediations.isEmpty()) {
            return null;
        }
        Random random = new Random();
        Card choice = remediations.get(random.nextInt(remediations.size()));
        remediations.clear();
        remediations.add(choice);
        return remediations;
    }

    // Data initialization
    public int initializeCardsFromYaml() {
        try {
            // Clear existing cards
            cardRepository.deleteAll();
            System.out.println("1");
            // Load from YAML
            Yaml yaml = new Yaml();

            InputStream inputStream = this.getClass()
                    .getClassLoader()
                    .getResourceAsStream("game.yml");

            if (inputStream == null) {
                System.out.println("ame.yml NOT FOUND");
                return -1;
            }

            GameConfig config = yaml.loadAs(inputStream, GameConfig.class);
            List<Card> cards = config.getGame().getCards();
            cardRepository.saveAll(cards);

            return cards.size();

        } catch (Exception e) {
            // e.printStackTrace();
            System.err.println("YAML parsing failed: " + e.getMessage());
            throw new RuntimeException("Failed to load cards from YAML", e);
        }
    }
}