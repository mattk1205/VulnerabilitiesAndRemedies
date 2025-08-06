package com.example.mygame.entity;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("api/player")
public class PlayerController {

    private final PlayerService playerService; 

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public ResponseEntity<Player> getPlayer() {
       Player player = playerService.getPlayer();
       if (player != null) {
           return ResponseEntity.ok(player);
       }
       return ResponseEntity.notFound().build();
    }

    @PostMapping("/create")
    @CrossOrigin
    public ResponseEntity<Player> createPlayer(@RequestBody CreatePlayerRequest request) {
       Player newPlayer = playerService.createPlayer(request.getName());
       return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
    }
    
}
