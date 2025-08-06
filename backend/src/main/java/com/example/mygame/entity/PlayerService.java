package com.example.mygame.entity;

import org.springframework.stereotype.Service;


@Service
public class PlayerService {

    private Player activePlayer;
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
        this.activePlayer = null;
    }
    
    public Player createPlayer(String name) {
        Player player = new Player();
        player.setName(name);
        
        this.activePlayer = playerRepository.save(player);
        return this.activePlayer;
    }

    public Player getPlayer() {
        return this.activePlayer;
    }

}
