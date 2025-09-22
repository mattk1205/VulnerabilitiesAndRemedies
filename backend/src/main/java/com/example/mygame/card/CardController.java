package com.example.mygame.card;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/{cardId}")
    public ResponseEntity<Card> getCard(@PathVariable String cardId) {
        Card card = cardService.getCard(cardId);
        
        if (card != null) {
            return ResponseEntity.ok(card);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Card>> getAllCards() {
        List<Card> cards = cardService.getAllCards();
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/hacks")
    public ResponseEntity<List<Card>> getAllHacks() {
        List<Card> hacks = cardService.getAllHacks();
        return ResponseEntity.ok(hacks);
    }

    @GetMapping("/remediations")
    public ResponseEntity<List<Card>> getAllRemediations() {
        List<Card> remediations = cardService.getAllRemediations();
        return ResponseEntity.ok(remediations);
    }

    @GetMapping("/counters/{hackId}")
    public ResponseEntity<List<Card>> getCountersForHack(@PathVariable String hackId) {
        if (!hackId.startsWith("hk_")) {
            return ResponseEntity.badRequest().build();
        }
        
        List<Card> counters = cardService.getCountersForHack(hackId);
        return ResponseEntity.ok(counters);
    }

    @GetMapping("/can-counter/{hackId}/{remediationId}")
    public ResponseEntity<Boolean> canCounter(@PathVariable String hackId, 
                                            @PathVariable String remediationId) {
        if (!hackId.startsWith("hk_") || !remediationId.startsWith("rm_")) {
            return ResponseEntity.badRequest().build();
        }
        
        boolean canCounter = cardService.canCounter(hackId, remediationId);
        return ResponseEntity.ok(canCounter);
    }

    @GetMapping("/effect/{effectType}")
    public ResponseEntity<List<Card>> getCardsByEffect(@PathVariable String effectType) {
        List<String> validEffects = Arrays.asList("double", "block", "pierce", "combo", "stun");
        if (!validEffects.contains(effectType)) {
            return ResponseEntity.badRequest().build();
        }
        
        List<Card> cards = cardService.getCardsByEffect(effectType);
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/complexity/{level}")
    public ResponseEntity<List<Card>> getCardsByComplexity(@PathVariable int level) {
        if (level < 1 || level > 6) {
            return ResponseEntity.badRequest().build();
        }
        
        List<Card> cards = cardService.getCardsByComplexity(level);
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Card>> searchCards(@RequestParam String name) {
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        List<Card> cards = cardService.searchCardsByName(name.trim());
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/random/hack")
    public ResponseEntity<Card> getRandomHack() {
        Card randomHack = cardService.getRandomHack();
        
        if (randomHack != null) {
            return ResponseEntity.ok(randomHack);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/random/remediation")
    public ResponseEntity<Card> getRandomRemediation() {
        Card randomRemediation = cardService.getRandomRemediation();
        
        if (randomRemediation != null) {
            return ResponseEntity.ok(randomRemediation);
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/initialize")
    public ResponseEntity<String> initializeCards() {
        try {
            int count = cardService.initializeCardsFromYaml();
            return ResponseEntity.ok("Initialized " + count + " cards from YAML");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to initialize cards: " + e.getMessage());
        }
    }

    // Get card statistics
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getCardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("totalCards", cardService.getTotalCardCount());
        stats.put("hackCards", cardService.getAllHacks().size());
        stats.put("remediationCards", cardService.getAllRemediations().size());
        
        // Effect distribution
        Map<String, Integer> effectStats = new HashMap<>();
        effectStats.put("double", cardService.getCardsByEffect("double").size());
        effectStats.put("block", cardService.getCardsByEffect("block").size());
        effectStats.put("pierce", cardService.getCardsByEffect("pierce").size());
        effectStats.put("combo", cardService.getCardsByEffect("combo").size());
        effectStats.put("stun", cardService.getCardsByEffect("stun").size());
        effectStats.put("none", cardService.getCardsWithoutEffect().size());
        
        stats.put("effects", effectStats);
        
        return ResponseEntity.ok(stats);
    }
}
    