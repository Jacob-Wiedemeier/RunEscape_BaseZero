class Resource extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id){
        this.id = id;
        let x = Math.floor(Math.random()*(w/8)+5*w/8);
        let y = Math.floor(Math.random()*(h/8)+5*h/8);
        let filename = await this.dbQueryItem().Filename;

        super.init(filename, x, y);

        let spriteRef = super.get();
        spriteRef.on('click', harvest());
        super.show();
    }
    async dbQueryResource(){
        // Return the columns associated with ItemId
        //return await db.getSQLQuery("SELECT * FROM RESOURCE WHERE ResourceID = " + this.id + ";")[0];
    }

    harvest(){
        /*
         * Player must have enough exp to harvest
         * Player must have enough inventory space to harvest
         * Give player item, give player exp set respawn delay
        */
       var playerHarvestExp = 0;
       // GET Player.HarvestingExperience
       var harvestLevelRequirement = 0;
       // GET Resource.HarvestRequirement
       var remainingInventory = playerInventorySpace();

       if(LevelRequirementMet(playerHarvestExp, harvestLevelRequirement) && remainingInventory > 0){
            var nextSpawn = new Date();
            // INCREASE nextSpawn by Resource.RespawnDelay (seconds)
            super.hide();
            // INCREASE Player.HarvestingExperience by Resource.ExperienceReward
            // ADD Resource.FK_ItemID to Player's Inventory
       }
    }

}