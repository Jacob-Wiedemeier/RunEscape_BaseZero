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

    fight(){
        
    }
}