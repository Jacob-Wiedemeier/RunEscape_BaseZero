class WorldEdge extends Sprite{
    constructor(destinationNode){
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
        this.destination = destinationNode;
        super("WorldEdgeSprite.jpg", x, y);
    }
}