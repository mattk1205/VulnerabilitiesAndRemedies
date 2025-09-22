package com.example.mygame.entity;

import org.springframework.stereotype.Service;

import com.example.mygame.dto.InventoryView;
import com.example.mygame.dto.ProfileView;
import com.example.mygame.dto.WeaponView;
import com.example.mygame.inventory.Inventory;
import com.example.mygame.item.*;

@Service
public class PlayerService {

    private String playerId;
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player createPlayer(String name) {
    Player player = new Player(name);
        player.setEquippedWeaponId(GameItems.RUSTY_SWORD.getId());
        Player newPlayer = playerRepository.save(player);
        this.playerId = newPlayer.getId();
        return newPlayer;
    }

    public Player getPlayer() {
        if (playerId == null) {
            System.out.println("No Id");
            return null;
        }
        return playerRepository.findById(playerId).orElse(null);
    }

    public String getPlayerId() {
        return this.playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public boolean equipWeapon(String itemId) {
        Player player = getPlayer();
        if (player == null) {
            System.out.println("No player found");
            return false;
        }
        
        Item weapon = ItemRegistry.get(itemId);
        if (weapon == null || !(weapon instanceof Weapon)) {
            System.out.println(itemId + " not a weapon");
            return false;
        }

        if (!player.getEquippedWeaponId().equals(GameItems.BARE_HANDS.getId())) {
            System.out.println("Weapon already equipped");
            return false;
        }

        if (itemId.equals("wp_bare_hands")) {
            System.out.println("Bare hands equipped");
             player.equipWeapon(itemId);
            playerRepository.save(player);
            return true;
        }

        Inventory inv = player.getInventory();
        if (!inv.getItems().containsKey(itemId)) {
            System.out.println("Item not found in inventory");
            return false;
        }

        player.equipWeapon(itemId);
        playerRepository.save(player);
        return true;
    }
    public boolean unequipWeapon() {
        Player player = getPlayer();
        if (player == null) {
            System.out.println("No player found");
            return false;
        }
        String itemId = player.getEquippedWeaponId();

        if (itemId == null) {
            System.out.println("no weapon equipped");
            return false;
        }

        Item weapon = ItemRegistry.get(itemId);
        if (weapon == null || !(weapon instanceof Weapon)) {
            System.out.println(itemId + " not a weapon");
            return false;
        }

        Inventory inv = player.getInventory();
        if (!inv.getItems().containsKey(itemId)) {
            System.out.println("Item not found in inventory");
            return false;
        }

        player.unequipWeapon();
        playerRepository.save(player);
        return true;
    }

    public boolean useItem(String itemId) {
        Player player = getPlayer();
        if (player == null) {
            System.out.println("No player found");
            return false;
        }

        Item item = ItemRegistry.get(itemId);
        if (item == null) {
            System.out.println(itemId + " not found in item registry");
            return false;
        }

        if (!(item instanceof Potion)) {
            System.out.println(itemId + " is not a potion");
            return false;
        }

        Inventory inv = player.getInventory();
        if (!inv.getItems().containsKey(itemId)) {
            System.out.println(itemId + " not found in inventory");
            return false;
        }

        item.use(player);
        playerRepository.save(player);
        return true;
    }

    public WeaponView getEquippedWeapon() {
        Player player = getPlayer();
        if (player == null) {
            System.out.println("No player found");
            return null;
        }

        String weaponId = player.getEquippedWeaponId();
        if (weaponId == null) {
            System.out.println("No weapon equipped");
            return null;
        }

        Item item = ItemRegistry.get(weaponId);
        if (item == null) {
            System.out.println(weaponId + " not found in item registry");
            return null;
        }

        if (!(item instanceof Weapon)) {
            System.out.println(weaponId + " is not a weapon");
            return null;
        }

        Inventory inv = player.getInventory();
        if (weaponId.equals(GameItems.BARE_HANDS.getId())) {
            return new WeaponView(weaponId, inv);
        }

        if (!inv.getItems().containsKey(weaponId)) {
            System.out.println(weaponId + " not found in inventory");
            return null;
        }

        return new WeaponView(weaponId, inv);
    }

    public ProfileView getProfile() {
        Player player = getPlayer();
       
        if (player == null) {
            System.out.println("No player found");
            return null;
        }
        Inventory inv = player.getInventory();
        String weaponId = player.getEquippedWeaponId();
        Item item = ItemRegistry.get(weaponId);
        if (item == null) {
            System.out.println(weaponId + " not found in item registry");
            return null;
        }

        if (!(item instanceof Weapon)) {
            System.out.println(weaponId + " is not a weapon");
            return null;
        }

        if (weaponId.equals(GameItems.BARE_HANDS.getId())){
            return new ProfileView(player, new WeaponView(weaponId, inv), new InventoryView(inv));
        }

        if (!inv.getItems().containsKey(weaponId)) {
            System.out.println(weaponId + " not found in inventory");
            return null;
        }
        return new ProfileView(player, new WeaponView(weaponId, inv), new InventoryView(inv));
    }

}
