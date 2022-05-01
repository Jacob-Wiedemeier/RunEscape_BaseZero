class Sprite{
    // not a constructor because super() constructor can only be called easily from other constructors, and we have to use async init functions.
    init(filename, posX, posY){
        let sprite = new PIXI.Sprite.from(filename);
        sprite.anchor.set(posX, posY);
        sprite.interactive = true;
        this.sprite = sprite;
    }
    hide(){
        app.stage.removeChild(this.sprite);
    }
    show(){
        app.stage.addChild(this.sprite);
    }
    get(){
        return this.sprite;
    }
}