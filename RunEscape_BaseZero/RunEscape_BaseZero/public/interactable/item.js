class Item extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id, filename){
        this.id = id;
        this.item = db_fetch('getItemById', this.id);
        let pos = lookupItemPosition();

        super.init("/static/images/"+this.filename, pos[0], pos[1]);

        let spriteRef = super.get();
        spriteRef.on('click', itemClicked(e));
        super.show();
    }

    lookupItemPosition(){
        // return a 2-element array of position [x, y]
        let position = [];
        if(equipped.includes(this.id)){
            var equipIndex = equipped.indexOf(this.id);
            // SQL - Do a sorted lookup of all equipped items, equipIndex indicates where this item is in that ordered list (on range [0, 2])
            var equipPosX = w/128;
            var equipPosY = 5*h/8+h/128 + equipIndex * h/8;
            position.push(equipPosX);
            position.push(equipPosY);
        } else{
            var inventoryIndex = inventory.indexOf(this.id);
            // SQL - Do a sorted lookup of all not equipped items in the Player's Inventory, inventoryIndex indicates where this item is in that ordered list (on range [0, 5])
            var inventPosX = 7*w/8+w/128 + (w/16 * inventoryIndex % 2);
            var inventPosY = 5*h/8+h/128 + h/8 * Math.floor(inventoryIndex / 2);
            position.push(inventPosX);
            position.push(inventPosY);
        }

        return position;
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

    async craft(){
        if(craftingMenu == null){
            craftingMenu = this.id;
            this.craftingSprite = super.init(this.filename, 3*w/16, 7*h/8); // draw a non-interactive copy in the crafting slot
            app.stage.addChild(this.craftingSprite);
            
        } else if(craftingMenu = this.id){
            // remove from craftingMenu
            craftingMenu = null;
            app.stage.removeChild(this.craftingSprite); // will only be able to remove if it was put there in the first place
        } else{
            const recipe = await db_fetch_2('getRecipeByIngredients', craftingMenu, this.id)
            if(!recipe){
                return;
            }
                const player = await getPlayer();
                if(LevelRequirementMet(player.craftingExperience, recipe.craftingRequirement)){
                    player.craftingExperience += recipe.experienceReward
                    // INCREASE Player.CraftingExperience by Recipe.ExperienceReward
                    // REMOVE craftingMenu and this item from Player's Inventory
                    inventory.splice(inventory.indexOf(craftingMenu))
                    inventory.splice(inventory.indexOf(this.id))
                    inventory.push(recipe.fk_Item_Id)
                    craftingMenu = null;

                    await updatePlayer()

                } else{
                    // Requirements not met, do nothing
                }
        }
    }

    async consume(){
        const player = await getPlayer();
        const consumable = await db_fetch('getItemById', this.id)
        player.currentHealth += consumable.healthModifier;
        if(player.currentHealth > player.maxHealth){
            player.currentHealth = player.maxHealth;
        }
        inventory.splice(inventory.indexOf(this.id))

        await playerHealthCheck(); // make sure item didn't kill player in the case of a poisonous item
        await updatePlayer();
    }

    equip(){
        // QUERY Player's Equipment - am I an equipped item?
        if(equipment.includes(this.id)){
            // Unequip
            if(playerInventorySpace() > 0){
                // Can unequip
                // ADD equipment to Player's Inventory
                // REMOVE equipment from Player's Equipment
                inventory.push(this.id);
                equipment.splice(equipment.indexOf(this.id))
            }
            // Failed to unequip, nothing happens
        }
        var equipmentSlots = playerEquipmentSpace();
        // Equip
        if(equipmentSlots > 0){
            // ADD equipment to Player's Equipment
            // REMOVE equipment from Player's Inventory
            equipment.push(this.id)
            inventory.splice(inventory.indexOf(this.id))
        }
    }
}
