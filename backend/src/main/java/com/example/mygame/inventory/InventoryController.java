package com.example.mygame.inventory;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping
public class InventoryController {

    private Inventory inventory;

    @GetMapping("api/inventory")
    public Inventory getInventory(){
        return inventory;
    }
    
    

}
