let DEBUG_ON = true;

let w = 1600, h = 900;
let app = new PIXI.Application({width:w, height:h, antialias:true});
let inventory = [];
let equipment = [];
let craftingMenu = null; // holds the first ingredient in a given recipe
let enemies = []; // holds all currently loaded enemies
let resources = []; // holds all currently loaded resources
let worldEdges = []; // holds all currently loaded world edges

app.renderer.backgroundColor = 0x00FFFF;
document.body.appendChild(app.view);
setInterval(gameLoop, 1000/60);
drawUIConstant();
let statsDisplay = new Stats();
statsDisplay.init();

loadScreen();


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
    craftingPane.drawRect(13*w/16, 7*h/8, 1*w/16, h/8);
    craftingPane.beginFill(0xBBBBBB);
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

function clearScreen(){
    // Make sure any graphics from the previous screen are hidden
    enemies.forEach((en) => en.hide())
    resources.forEach((re) => re.hide())
    worldEdges.forEach((we) => we.hide())
 
    // clear all lists
    enemies = [];
    resources = [];
    worldEdges = [];
}

async function loadScreen(){
    
    // QUERY-HEAVY FUNCTION
    // Populate Enemies, Resources, and worldEdges with whatever can be found in the node associated with Player.FK_WorldNodeID
    clearScreen();

    const player = await db_fetch('getPlayer')

    const db_enemies = await db_fetch('getEnemies')
    const node_enemies = db_enemies.filter((enemy) => enemy.fk_WorldNode === player.fk_WorldNodeID)
    
    enemies = await node_enemies.map(async (enemy) => {
        const enemy_obj = new Enemy()
        await enemy_obj.init(enemy.EnemyID, enemy.Filename)
        return enemy_obj
    })

    const db_resources = await db_fetch('getResources')
    const node_resources = db_resources.filter((resource) => resource.fk_WorldNode === player.fk_WorldNodeID)

    resources = await node_resources.map(async (resource) => {
        const resource_obj = new Resource()
        await resource_obj.init(resource.ResourceID, resource.Filename)
        return resource_obj
    })

    const db_world_edges = await db_fetch('getWorldEdges')
    const node_world_edges = db_world_edges.filter((edge) => edge.fk_WorldNodeID === player.fk_WorldNodeID)

    worldEdges = await node_enemies.map(async (edge) => {
        const edge_obj = new WorldEdge()
        await edge_obj.init(edge.WorldEdgeID)
        return edge_obj
    })
}