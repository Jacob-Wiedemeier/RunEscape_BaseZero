class Enemy extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id, filename){
        this.id = id;
        let x = Math.floor(Math.random()*(w/8)+5*w/8);
        let y = Math.floor(Math.random()*(h/8)+5*h/8);

        super.init("/static/images/"+filename, x, y);

        let spriteRef = super.get();
        spriteRef.on('click', this.fight);
        super.show();
    }

    async fight(){
        /*
         * Defense caps at reducing incoming damage to 1
         * Enemy takes damage
         *  If enemy has died, resolve combat
         *  If enemy has not died, Player takes damage
         *   If Player has died, kill Player
         *   Combat resolves
        */

        const player = await getPlayer()
        const enemy = await db_fetch('getEnemyById', this.id)

        var incomingDamage = playerCalcDamage();
        incomingDamage -= enemy.defense;
        if(incomingDamage <= 0) { incomingDamage = 1; }

        enemy.currentHealth -= incomingDamage;
        if(enemy.currentHealth <= 0){
            var nextSpawn = new Date();
            nextSpawn.setSeconds(nextSpawn.getSeconds() + enemy.respawnDelay)
            enemy.nextSpawn = nextSpawn
            super.hide();
            // INCREASE Player.CombatExperience by Enemy.ExperienceReward
            player.combatExperience += enemy.experienceReward
            if(inventory.length < 6){
                // ADD Enemy.FK_ItemID to Player's Inventory
                inventory.push(enemy.fk_ItemID)
            }
        } else{
            var outgoingDamage = enemy.attack;
            var playerDefense = playerCalcDefense();
            outgoingDamage -= playerDefense;
            if(outgoingDamage <= 0) { outgoingDamage = 1; }
            player.currentHealth -= outgoingDamage
            playerHealthCheck(); // kill player if player is dead
        }

        await updatePlayer(player)
        await db_post('updateEnemyById', enemy, this.id)
    }
}