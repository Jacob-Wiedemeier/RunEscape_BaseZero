let DEBUG_ON = true;

let w = 1600, h = 900;
let app = new PIXI.Application({width:w, height:h, antialias:true});
let inventory = [];
let equipment = [];
let craftingMenu;
let enemies = [];
let resources = [];
let worldEdges = [];

app.renderer.backgroundColor = 0x00FFFF;
document.body.appendChild(app.view);
setInterval(gameLoop, 1000/60);
drawUIConstant();

function gameLoop(){


}

function drawUIConstant(){
    let inventoryPane = new PIXI.Graphics();
    inventoryPane.beginFill(0xA0A0A0);
    inventoryPane.drawRect(7*w/8, 5*h/8, w/8, 3*h/8);
    inventoryPane.beginFill(0xBBBBBB);
    inventoryPane.drawRect(7*w/8+w/128, 5*h/8+h/128, w/20, h/9);
    inventoryPane.drawRect(7*w/8+w/16+w/128, 5*h/8+h/128, w/20, h/9);
    inventoryPane.drawRect(7*w/8+w/128, 5*h/8+h/8+h/128, w/20, h/9);
    inventoryPane.drawRect(7*w/8+w/16+w/128, 5*h/8+h/8+h/128, w/20, h/9);
    inventoryPane.drawRect(7*w/8+w/128, 5*h/8+2*h/8+h/128, w/20, h/9);
    inventoryPane.drawRect(7*w/8+w/16+w/128, 5*h/8+2*h/8+h/128, w/20, h/9);
    app.stage.addChild(inventoryPane);

    let craftingPane = new PIXI.Graphics();
    craftingPane.beginFill(0xA0A0A0);
    craftingPane.drawRect(11*w/16, 7*h/8, 3*w/16, h/8);
    craftingPane.beginFill(0xBBBBBB);
    craftingPane.drawRect(11*w/16+w/128, 7*h/8+h/128, w/20, h/9);
    craftingPane.drawRect(11*w/16+w/16+w/128, 7*h/8+h/128, w/20, h/9);
    craftingPane.drawRect(11*w/16+w/8+w/128, 7*h/8+h/128, w/20, h/9);
    app.stage.addChild(craftingPane);

    let equipmentPane = new PIXI.Graphics();
    equipmentPane.beginFill(0xA0A0A0);
    equipmentPane.drawRect(0, 5*h/8, w/16, 3*h/8);
    equipmentPane.beginFill(0xBBBBBB);
    equipmentPane.drawRect(w/128, 5*h/8+h/128, w/20, h/9);
    equipmentPane.drawRect(w/128, 5*h/8+h/8+h/128, w/20, h/9);
    equipmentPane.drawRect(w/128, 5*h/8+2*h/8+h/128, w/20, h/9);
    app.stage.addChild(equipmentPane);

    let statPane = new PIXI.Graphics();
    statPane.beginFill(0xAAAAAA);
    statPane.drawRect(w/16, 5*h/8, w/16, 3*h/8);
    app.stage.addChild(statPane);

    if(DEBUG_ON){
        let ENEMYSPAWNREGIONVISUALIZATION = new PIXI.Graphics();
        ENEMYSPAWNREGIONVISUALIZATION.beginFill(0xAA5050);
        ENEMYSPAWNREGIONVISUALIZATION.drawRect(w/8, h/8, 3*w/4, 3*h/4);
        app.stage.addChild(ENEMYSPAWNREGIONVISUALIZATION);

        let EXITSPAWNREGIONVISUALIZATION = new PIXI.Graphics();
        EXITSPAWNREGIONVISUALIZATION.beginFill(0x50AA50);
        EXITSPAWNREGIONVISUALIZATION.drawRect(0, h/8, w/8, h/2); // left
        EXITSPAWNREGIONVISUALIZATION.drawRect(7*w/8, h/8, w/8, h/2); // right
        EXITSPAWNREGIONVISUALIZATION.drawRect(w/8, 0, 6*w/8, h/8); // top
        EXITSPAWNREGIONVISUALIZATION.drawRect(w/8, 7*h/8, 5*w/8, h/8); // bottom
        app.stage.addChild(EXITSPAWNREGIONVISUALIZATION);
    }
}
