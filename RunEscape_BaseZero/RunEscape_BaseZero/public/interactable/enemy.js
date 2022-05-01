class Enemy extends Sprite{
    constructor(filename){
        let x = Math.floor(Math.random()*(w/8)+5*w/8);
        let y = Math.floor(Math.random()*(h/8)+5*h/8);
        super(filename, x, y);
    }
}