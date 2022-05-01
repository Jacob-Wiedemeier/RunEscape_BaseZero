class Sprite{
    constructor(filename, posX, posY){
        let sprite = new PIXI.Sprite.from(filename);
        sprite.anchor.set(posX, posY);
        sprite.interactive = true;
        sprite.on('click', function(){
            console.log("Figure out how to lookup correct sprite interaction");
        });
        app.stage.addChild(sprite);
        this.sprite = sprite;
    }
    remove(){
        app.stage.removeChild(this.sprite);
    }

}