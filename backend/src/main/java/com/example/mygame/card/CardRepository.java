package com.example.mygame.card;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
public interface CardRepository extends MongoRepository<Card, String> {
    
    List<Card> findByResponsesContaining(String hackId);
    
    boolean existsByIdAndResponsesContaining(String hackId, String remediationId);
    
    List<Card> findByIdStartingWith(String prefix); // Use with "hk_"
    
    List<Card> findByEffect(String effect);

    List<Card> findByComplexity(int complexity);

    List<Card> findByNameContainingIgnoreCase(String name);

    List<Card> findByEffectIsNull();

}