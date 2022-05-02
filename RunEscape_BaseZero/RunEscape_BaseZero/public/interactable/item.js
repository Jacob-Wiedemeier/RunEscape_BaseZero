class Item extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id){
        this.id = id;
        let pos = lookupItemPosition();
        this.filename = await this.dbQueryItem().Filename;

        super.init(this.filename, pos[0], pos[1]);

        let spriteRef = super.get();
        spriteRef.on('click', itemClicked(e));
        super.show();
    }

    lookupItemPosition(){
        // return a 2-element array of position [x, y]
        let position = [];
        var isEquipped = 0;
        // SQL - Look up if this.id is equipped and store the result in isEquipped

        if(isEquipped){
            var equipIndex = 0;
            // SQL - Do a sorted lookup of all equipped items, equipIndex indicates where this item is in that ordered list (on range [0, 2])
            var equipPosX = w/128;
            var equipPosY = 5*h/8+h/128 + equipIndex * h/8;
            position.push(equipPosX);
            position.push(equipPosY);
        } else{
            var inventoryIndex = 0;
            // SQL - Do a sorted lookup of all not equipped items in the Player's Inventory, inventoryIndex indicates where this item is in that ordered list (on range [0, 5])
            var inventPosX = 7*w/8+w/128 + (w/16 * inventoryIndex % 2);
            var inventPosY = 5*h/8+h/128 + h/8 * Math.floor(inventoryIndex / 2);
            position.push(inventPosX);
            position.push(inventPosY);
        }

        return position;
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
            this.craftingSprite = super.init(this.filename, 3*w/16, 7*h/8); // draw a non-interactive copy in the crafting slot
            app.stage.addChild(this.craftingSprite);
            
        } else if(craftingMenu = this.id){
            // remove from craftingMenu
            craftingMenu = null;
            app.stage.removeChild(this.craftingSprite); // will only be able to remove if it was put there in the first place
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
