class Resource extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id, filename){
        this.id = id;
        let x = Math.floor(Math.random()*(w/8)+5*w/8);
        let y = Math.floor(Math.random()*(h/8)+5*h/8);

        super.init(filename, x, y);

        let spriteRef = super.get();
        spriteRef.on('click', this.harvest);
        super.show();
    }


    async harvest(){
        /*
         * Player must have enough exp to harvest
         * Player must have enough inventory space to harvest
         * Give player item, give player exp set respawn delay
        */

        const resource = await db_fetch('getResourceById', this.id)
        const player = await getPlayer()

       if(LevelRequirementMet(player.harvestExperience, resource.harvestRequirement) && inventory.length < 6){
            var nextSpawn = new Date();
            // INCREASE nextSpawn by Resource.RespawnDelay (seconds)
            nextSpawn.setSeconds(nextSpawn.getSeconds() + resource.respawnDelay)
            resource.nextSpawn = nextSpawn
            super.hide();
            // INCREASE Player.HarvestingExperience by Resource.ExperienceReward
            player.harvestExperience += resource.experienceReward
            // ADD Resource.FK_ItemID to Player's Inventory
            inventory.push(resource.fk_ItemID)
       }

       await updatePlayer(player)
       await db_post('updateResourceById', resource, this.id)
    }

}