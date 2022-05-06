class Sprite{
    // not a constructor because super() constructor can only be called easily from other constructors, and we have to use async init functions.
    init(filename, posX, posY){
        let sprite = new PIXI.Sprite.from(filename);
        sprite.anchor.set(0.5);
        sprite.x = posX;
        sprite.y = posY;
        sprite.interactive = true;
        sprite.scale.set(0.4, 0.4);
        this.sprite = sprite;
        this.show()
        console.log(this)
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