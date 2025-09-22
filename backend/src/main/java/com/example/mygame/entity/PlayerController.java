package com.example.mygame.entity;

import org.springframework.web.bind.annotation.RestController;

import com.example.mygame.dto.PlayerView;
import com.example.mygame.dto.ProfileView;
import com.example.mygame.dto.WeaponView;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("api/player")
public class PlayerController {


    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }
    
    @GetMapping
    @CrossOrigin
    public ResponseEntity<Player> getPlayer() {
        Player player = playerService.getPlayer();
        if (player != null)
            return ResponseEntity.ok(player);
        return ResponseEntity.notFound().build();
    }   

    @GetMapping("/weapon")
    public ResponseEntity<WeaponView> getEquippedWeapon() {
        WeaponView wv = playerService.getEquippedWeapon();
        if (wv == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(wv);
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileView> getProfile() {
        ProfileView pv = playerService.getProfile();
        if (pv.getPlayer() == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if (pv.getWeaponView() == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(pv);
    }

    @PostMapping("/create")
    @CrossOrigin
    public ResponseEntity<Player> createPlayer(@RequestBody PlayerView request) {
        if (playerService.getPlayer() != null)
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        Player newPlayer = playerService.createPlayer(request.getName());
        return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
    }

    @PostMapping("/equip/{itemId}")
    @CrossOrigin
    public ResponseEntity<Void> equipWeapon(@PathVariable String itemId) {
        boolean success = playerService.equipWeapon(itemId);
        if (success)
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    
    }
    @PostMapping("/unequip")
    @CrossOrigin
    public ResponseEntity<Void> unequipWeapon() {
        boolean success = playerService.unequipWeapon();
        if (success)
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    
    @PostMapping("/use/{itemId}")
    public ResponseEntity<Void> useItemSelf(@PathVariable String itemId) {
        boolean success = playerService.useItem(itemId);
        if (success)
            return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
