class WorldEdge extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id, destination){
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
        this.destination = destination;

        super.init("/static/images/portal.png", x, y);
        
        super.show();
    }

    async traverse(){
        // SET Player.FK_WorldNodeID = WorldEdge.FK_WorldNodeID

        const player = await getPlayer()
        player.fk_WorldNodeID = this.destination
        await updatePlayer(player)

        loadScreen();
    }
}