class Enemy extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id){
        this.id = id;
        let x = Math.floor(Math.random()*(w/8)+5*w/8);
        let y = Math.floor(Math.random()*(h/8)+5*h/8);
        let filename = await this.dbQueryItem().Filename;

        super.init(filename, x, y);

        let spriteRef = super.get();
        spriteRef.on('click', fight());
        super.show();
    }

    async dbQueryEnemy(){
        // Return the columns associated with ItemId
        //return await db.getSQLQuery("SELECT * FROM ENEMY WHERE EnemyID = " + this.id + ";")[0];
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

        var incomingDamage = playerCalcDamage();
        var currentHealth = 0; // GET CurrentHealth from Enemy.CurrentHealth
        var defense = 0; // GET Defense from Enemy.Defense
        incomingDamage -= defense;
        if(incomingDamage <= 0) { incomingDamage = 1; }

        currentHealth -= incomingDamage;
        if(currentHealth <= 0){
            var nextSpawn = new Date();
            // INCREASE nextSpawn by Enemy.RespawnDelay (seconds)
            super.hide();
            // INCREASE Player.CombatExperience by Enemy.ExperienceReward
            if(playerInventorySpace > 0){
                // ADD Enemy.FK_ItemID to Player's Inventory
            }
        } else{
            // SET Enemy.CurrentHealth to currentHealth
            var outgoingDamage = 0; // GET Attack from Enemy.Attack
            var playerHealth = 0; // GET CurrentHealth from Player.CurrentHealth
            var playerDefense = playerCalcDefense();
            outgoingDamage -= playerDefense;
            if(outgoingDamage <= 0) { outgoingDamage = 1; }
            // SET Player.CurrentHealth to playerHealth
            playerHealthCheck(); // kill player if player is dead
        }
    }
}