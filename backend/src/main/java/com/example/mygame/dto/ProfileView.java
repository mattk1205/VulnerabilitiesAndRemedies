package com.example.mygame.dto;


public class ProfileView {

    private final PlayerView player; 
    private final WeaponView weaponView;
    private final InventoryView inventoryView;

    public ProfileView(PlayerView player, WeaponView weaponView, InventoryView inventoryView) {
        this.player = player;
        this.weaponView = weaponView;
        this.inventoryView = inventoryView;
    }

    public PlayerView getPlayer() {
        return player;
    }

    public WeaponView getWeaponView() {
        return weaponView;
    }

    public InventoryView getInventoryView() {
        return inventoryView;
    }
}