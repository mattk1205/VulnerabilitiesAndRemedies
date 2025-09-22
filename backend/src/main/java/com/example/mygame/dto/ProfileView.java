package com.example.mygame.dto;

import com.example.mygame.entity.Player;

public class ProfileView {

    private final Player player;
    private final WeaponView weaponView;
    private final InventoryView inventoryView;


    public ProfileView(Player player, WeaponView weaponView, InventoryView inventoryView) {
        this.player = player;
        this.weaponView = weaponView;
        this.inventoryView = inventoryView;
    }


    public Player getPlayer() {
        return player;
    }


    public WeaponView getWeaponView() {
        return weaponView;
    }


    public InventoryView getInventoryView() {
        return inventoryView;
    }


    //     export interface PlayerProfile {
//   player: {
//     id: string;
//     name: string;
//     health: number;
//     maxHealth: number;
//     baseDamage: number;
//     equippedWeaponId: string;
//     isAlive: boolean;
//   };
//   inventory: InventoryView;
// }


}
