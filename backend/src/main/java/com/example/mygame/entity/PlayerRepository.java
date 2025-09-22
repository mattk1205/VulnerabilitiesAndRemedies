package com.example.mygame.entity;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface PlayerRepository extends MongoRepository<Player, String>{

    Optional<Player> findByName(String name);

}
