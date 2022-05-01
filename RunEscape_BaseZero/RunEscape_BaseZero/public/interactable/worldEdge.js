class WorldEdge extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id){
        this.id = id;
        let x = 0, y = 0;
        switch(Math.floor(Math.random()*4)){
            case 0: // left
                x = Math.floor(Math.random()*(w/8));
                y = Math.floor(Math.random()*(h/2)+h/8);
                break;
            case 1: // right
                x = Math.floor(Math.random()*(w/8)+7*w/8);
                y = Math.floor(Math.random()*(h/2)+h/8);
                break;
            case 2: // top
                x = Math.floor(Math.random()*(6*w/8)+w/8);
                y = Math.floor(Math.random()*(h/8));
                break;
            case 3: // bottom
                x = Math.floor(Math.random()*(5*w/8)+w/8);
                y = Math.floor(Math.random()*(h/8)+7*h/8);
                break;
        }
        this.destination = await(this.dbQueryWorldEdge().FK_WorldNodeID);

        super.init("WorldEdgeSprite.jpg", x, y);
        
        super.show();
    }

    async dbQueryWorldEdge(){
        // Return the columns associated with ItemId
        return await db.getSQLQuery("SELECT * FROM WorldEdge WHERE WorldEdgeID = " + this.id + ";")[0];
    }
}