class Item extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id){
        this.id = id;
        let x = lookupInventoryIndexX(inventoryIndex);
        let y = lookupInventoryIndexY(inventoryIndex);
        let filename = await this.dbQueryItem().Filename;

        super.init(filename, x, y);

        let spriteRef = super.get();
        spriteRef.on('click', itemClicked(e));
        super.show();
    }

    async dbQueryItem(){
        // Return the columns associated with ItemId
        //return await db.getSQLQuery("SELECT * FROM ITEM WHERE ItemID = " + this.id + ";")[0];
    }

    itemClicked(){
        if(e.which == 3){
            // right click - Crafting
            craft();
        }
        else{
            // left click - Consume or Equip
            if(this.id >= 4089){
                consume();
            } else{
                equip();
            }
        }
    }

    craft(){
        if(craftingMenu == null){
            craftingMenu = this.id;
        } else if(craftingMenu = this.id){
            // remove from craftingMenu
            craftingMenu = null;
        } else{
            var craftingRequirement = -1;
            // QUERY Recipe, using double FK of this.id and craftingMenu - save CraftingRequirement to craftingRequirement
            if(craftingRequirement == -1){
                // No such recipe found, do nothing.
            } else{

                var playerCraftingExperience = 0;
                // GET Player.CraftingExperience
                if(LevelRequirementMet(playerCraftingExperience, craftingRequirement)){
                    // INCREASE Player.CraftingExperience by Recipe.ExperienceReward
                    // REMOVE craftingMenu and this item from Player's Inventory
                    // ADD Recipe.FK_ItemID to Player's Inventory
                    craftingMenu = null;
                } else{
                    // Requirements not met, do nothing
                }
            }
        }
    }

    consume(){
        var playerHealth = 0;
        // GET Player.CurrentHealth
        var maxHealth = 0;
        // GET Player.MaxHealth
        var healthMod = 0;
        // GET Consumable.HealthModifier
        playerHealth += healthMod;
        if(playerHealth > maxHealth){
            playerHealth = maxHealth;
        }
        // SET Player.CurrentHealth = playerHealth

        // REMOVE Item from Player's Inventory

        playerHealthCheck(); // make sure item didn't kill player in the case of a poisonous item
    }

    equip(){
        var equipped = false;
        // QUERY Player's Equipment - am I an equipped item?
        if(equipped){
            // Unequip
            if(playerInventorySpace() > 0){
                // Can unequip
                // ADD equipment to Player's Inventory
                // REMOVE equipment from Player's Equipment
            }
            // Failed to unequip, nothing happens
        }
        var equipmentSlots = playerEquipmentSpace();
        // Equip
        if(equipmentSlots > 0){
            // ADD equipment to Player's Equipment
            // REMOVE equipment from Player's Inventory
        }
    }
}
