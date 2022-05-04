const mysql = require('mysql');
const keys = require('./keys.json');

let createMySQLConnection = () => {
    return mysql.createConnection({
        host: keys.mariadb.host,
        user: keys.mariadb.user,
        password: keys.mariadb.password,
        database: keys.mariadb.database
    });
};

// Function for getting all WorldNodes.
// Returns an array of Objects
let getWorldNodes = async function() {
    let connection = createMySQLConnection();
    let worldNodes = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM WorldNode;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        results.forEach((node) => {
            let thisWorldNode = {
                worldNodeID: node.WorldNodeID
            }
            worldNodes.push(thisWorldNode);
        });
    }).catch((err) => {
        console.log(err);
    });
    return worldNodes;
}

// Function for getting a single WorldNode by its ID
// Returns a single Object
let getWorldNodeById = async function(id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`SELECT * FROM WorldNode WHERE WorldNodeID=${id}`, (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        obj = {
            worldNodeID: results[0].WorldNodeID
        };
    }).catch((err) => {
        console.log(err);
    });
    return obj;
}

// Function for getting all Enemies
// Returns an array of Objects
let getEnemies = async function() {
    let connection = createMySQLConnection();
    let enemies = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM Enemy;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        results.forEach((enemy) => {
            let thisEnemy = {
                enemyID: enemy.EnemyID,
                name: enemy.Name,
                maxHealth: enemy.MaxHealth,
                currentHealth: enemy.CurrentHealth,
                attack: enemy.Attack,
                defense: enemy.Defense,
                nextSpawnTime: enemy.NextSpawnTime,
                respawnDelay: enemy.RespawnDelay,
                experienceReward: enemy.ExperienceReward,
                fk_WorldNode: enemy.FK_WorldNode,
                fk_Username: enemy.FK_Username,
                fk_ItemID: enemy.FK_ItemID,
                filename: enemy.Filename
            };
            enemies.push(thisEnemy);
        });
    }).catch((err) => {
        console.log(err);
    });
    return enemies;
}

// Function for getting a single Enemy by its ID
// Returns a single Object
let getEnemyById = async function(id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`SELECT * FROM Enemy WHERE EnemyID=${id}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        obj = {
            enemyID: results[0].EnemyID,
            name: results[0].Name,
            maxHealth: results[0].MaxHealth,
            currentHealth: results[0].CurrentHealth,
            attack: results[0].Attack,
            defense: results[0].Defense,
            nextSpawnTime: results[0].NextSpawnTime,
            respawnDelay: results[0].RespawnDelay,
            experienceReward: results[0].ExperienceReward,
            fk_WorldNode: results[0].FK_WorldNode,
            fk_Username: results[0].FK_Username,
            fk_ItemID: results[0].FK_ItemID,
            filename: results[0].Filename
        };
    }).catch((err) => {
        console.log(err);
    });
    return obj;
}

// Function for getting all Consumables
// Returns an array of Objects
let getConsumables = async function() {
    let connection = createMySQLConnection();
    let consumables = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM Consumable;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        results.forEach((consumeable) => {
            let thisConsumeable = {
                itemID: consumeable.ItemID,
                healthModifier: consumeable.HealthModifier,
                fk_Username: consumeable.FK_Username
            };
            consumables.push(thisConsumeable);
        });
    }).catch((err) => {
        console.log(err);
    });
    return consumables;
}

// Function for getting a single Consumable by its ID
// Returns a single Object
let getConsumableById = async function(id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`SELECT * FROM Consumable WHERE ItemID=${id}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        obj = {
            itemID: results[0].ItemID,
            healthModifier: results[0].HealthModifier,
            fk_Username: results[0].FK_Username
        };
    }).catch((err) => {
        console.log(err);
    });
    return obj;
}

// Function for getting all Equipables
// Returns an array of Objects
let getEquipables = async function() {
    let connection = createMySQLConnection();
    let equipables = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM Equipable;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        results.forEach((equipable) => {
            let thisEquipable = {
                itemID: equipable.ItemID,
                attackModifier: equipable.AttackModifier,
                defenseModifier: equipable.DefenseModifier,
                fk_Username: equipable.FK_Username
            };
            equipables.push(thisEquipable);
        });
    }).catch((err) => {
        console.log(err);
    });
    return equipables;
}

// Function for getting a single Equipable by its ID
// Returns a single Object
let getEquipableById = async function(id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`SELECT * FROM Equipable WHERE ItemID=${id}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        obj = {
            itemID: results[0].ItemID,
            attackModifier: results[0].AttackModifier,
            defenseModifier: results[0].DefenseModifier,
            fk_Username: results[0].FK_Username
        };
    }).catch((err) => {
        console.log(err);
    });
    return obj;
}

// Function for getting all Includes
// Returns an array of Objects
let getIncludes = async function() {
    let connection = createMySQLConnection();
    let includes = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM Includes;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        results.forEach((include) => {
            let thisIncludes = {
                fk_RecipeID: include.FK_RecipeID,
                fk_ItemID: include.FK_ItemID
            };
            includes.push(thisIncludes);
        });
    }).catch((err) => {
        console.log(err);
    });
    return includes;
}

// Function for getting a single Includes by its RecipeID
// Returns a single Object
// let getIncludesByRecipeID = async function(id) {
//     let connection = createMySQLConnection();
//     let obj = {};
//     await new Promise((resolve, reject) => {
//         connection.connect();
//         connection.query(`SELECT * FROM Includes WHERE FK_RecipeID=${id}`, (err, results) => {
//             connection.end();
//             if (err) reject (err);
//             else resolve(results);
//         });
//     }).then((results) => {
//         obj = {
            
//         };
//     }).catch((err) => {
//         console.log(err);
//     });
//     return obj;
// }

// Function for getting all Items
// Returns an array of Objects
let getItems = async function() {
    let connection = createMySQLConnection();
    let items = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM Item;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        results.forEach((item) => {
            let thisItem = {
                itemID: item.ItemID,
                name: item.Name,
                fk_Username: item.FK_Username,
                filename: item.Filename
            };
            items.push(thisItem);
        });
    }).catch((err) => {
        console.log(err);
    });
    return items;
}

// Function for getting a single Item by its ID
// Returns a single Object
let getItemById = async function(id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`SELECT * FROM Item WHERE ItemID=${id}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        obj = {
            itemID: results[0].ItemID,
            name: results[0].Name,
            fk_Username: results[0].FK_Username,
            filename: results[0].Filename
        };
    }).catch((err) => {
        console.log(err);
    });
    return obj;
}

// Function for getting the Player
// Returns one Object
let getPlayer = async function() {
    let connection = createMySQLConnection();
    let player = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM Player;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results[0]);
        });
    }).then((results) => {
        player = {
            username: results.Username,
            craftingExperience: results.CraftingExperience,
            combatExperience: results.CombatExperiennce, // typo is intentional
            harvestExperience: results.HarvestingExperience,
            maxHealth: results.MaxHealth,
            currentHealth: results.CurrentHealth,
            attackModifier: results.AttackModifier,
            fk_WorldNodeID: results.FK_WorldNodeID,
            fk_WorldEdgeID: results.FK_WorldEdgeID
        };
    }).catch((err) => {
        console.log(err);
    });
    return player;
}

// Function for getting all Recipes
// Returns an array of Objects
let getRecipes = async function() {
    let connection = createMySQLConnection();
    let recipes = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM Recipe;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        results.forEach((recipe) => {
            let thisRecipe = {
                recipeID: recipe.RecipeID,
                craftingRequirement: recipe.CraftingRequirement,
                experienceReward: recipe.ExperienceReward,
                fk_ItemID: recipe.FK_ItemID,
                fk_Username: recipe.FK_Username
            };
            recipes.push(thisRecipe);
        });
    }).catch((err) => {
        console.log(err);
    });
    return recipes;
}

// Function for getting a single Recipe by its ID
// Returns a single Object
let getRecipeById = async function(id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`SELECT * FROM Recipe WHERE RecipeID=${id}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        obj = {
            recipeID: results[0].RecipeID,
            craftingRequirement: results[0].CraftingRequirement,
            experienceReward: results[0].ExperienceReward,
            fk_ItemID: results[0].FK_ItemID,
            fk_Username: results[0].FK_Username
        };
    }).catch((err) => {
        console.log(err);
    });
    return obj;
}

let getRecipeByIngredients = async function(id1, id2) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`SELECT * FROM Recipe WHERE Ingredient1=${id1} AND Ingredient2=${id2}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        obj = {
            recipeID: results[0].RecipeID,
            craftingRequirement: results[0].CraftingRequirement,
            experienceReward: results[0].ExperienceReward,
            fk_IngredientID_1: results[0].FK_IngredientID_1,
            fk_IngredientID_2: results[0].FK_IngredientID_2,
            fk_ItemID: results[0].FK_ItemID,
            fk_Username: results[0].FK_Username
        };
    }).catch((err) => {
        console.log(err);
    });
    return obj;
}


// Function for getting all Resources
// Returns an array of Objects
let getResources = async function() {
    let connection = createMySQLConnection();
    let resources = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM Resource;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        results.forEach((resource) => {
            let thisResource = {
                resourceID: resource.ResourceID,
                name: resource.Name,
                nextHarvestTime: resource.NextHarvestTime,
                harvestRequirement: resource.HarvestRequirement,
                respawnDelay: resource.RespawnDelay,
                experienceReward: resource.ExperienceReward,
                fk_WorldNode: resource.FK_WorldNode,
                fk_ItemID: resource.FK_ItemID,
                fk_Username: resource.FK_Username,
                filename: resource.Filename
            };
            resources.push(thisResource);
        });
    }).catch((err) => {
        console.log(err);
    });
    return resources;
}

// Function for getting a single Resource by its ID
// Returns a single Object
let getResourceById = async function(id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`SELECT * FROM Resource WHERE ResourceID=${id}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        obj = {
            resourceID: results[0].ResourceID,
            name: results[0].Name,
            nextHarvestTime: results[0].NextHarvestTime,
            harvestRequirement: results[0].HarvestRequirement,
            respawnDelay: results[0].RespawnDelay,
            experienceReward: results[0].ExperienceReward,
            fk_WorldNode: results[0].FK_WorldNode,
            fk_ItemID: results[0].FK_ItemID,
            fk_Username: results[0].FK_Username,
            filename: results[0].Filename
        };
    }).catch((err) => {
        console.log(err);
    });
    return obj;
}

// Function for getting all WorldEdges
// Returns an array of Objects
let getWorldEdges = async function() {
    let connection = createMySQLConnection();
    let worldEdges = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query('SELECT * FROM WorldEdge;', (err, results, fields) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        results.forEach((worldEdge) => {
            let thisWorldEdge = {
                worldEdgeID: worldEdge.WorldEdgeID,
                fk_Source: worldEdge.FK_Source,
                fk_Destination: worldEdge.FK_Destination,
                fk_WorldNodeID: worldEdge.FK_WorldNodeID
            };
            worldEdges.push(thisWorldEdge);
        });
    }).catch((err) => {
        console.log(err);
    });
    return worldEdges;
}

// Function for getting a single WorldEdge by its ID
// Returns a single Object
let getWorldEdgeById = async function(id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`SELECT * FROM WorldEdge WHERE WorldEdgeID=${id}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        obj = {
            worldEdgeID: results[0].WorldEdgeID,
            fk_Source: results[0].FK_Source,
            fk_Destination: results[0].FK_Destination,
            fk_WorldNodeID: results[0].FK_WorldNodeID
        };
    }).catch((err) => {
        console.log(err);
    });
    return obj;
}

let updatePlayer = async function(player) {
    let connection = createMySQLConnection();
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`UPDATE Player SET CraftingExperience=${player.craftingExperience} CombatExperience=${player.combatExperience} HarvestingExperience=${player.harvestExperience},
            MaxHealth=${player.maxHealth} CurrentHealth=${player.currentHealth} FK_WorldNodeID=${player.fk_WorldNodeID}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).catch((err) => {
        console.log(err);
    });
}

let updateResourceById = async function(resource, id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`UPDATE Resource SET NextHarvestTime=${resource.nextHarvestTime} WHERE ResourceID=${id}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).catch((err) => {
        console.log(err);
    });
}

let updateEnemyById = async function(enemy, id) {
    let connection = createMySQLConnection();
    let obj = {};
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(`UPDATE Enemy SET NextRespawnTime=${enemy.nextRespawnTime} WHERE EnemyID=${id}`, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).catch((err) => {
        console.log(err);
    });
}


// Function for running a SQL statement
// Returns an array of Objects
let getSQLQuery = async function(statement) {
    let connection = createMySQLConnection();
    let res = [];
    await new Promise((resolve, reject) => {
        connection.connect();
        connection.query(statement, (err, results) => {
            connection.end();
            if (err) reject (err);
            else resolve(results);
        });
    }).then((results) => {
        res = results;
    }).catch((err) => {
        console.log(err);
    });
    return res;
}


module.exports = {
    getWorldNodes: getWorldNodes,
    getEnemies: getEnemies,
    getConsumables: getConsumables,
    getEquipables: getEquipables,
    getIncludes: getIncludes,
    getItems: getItems,
    getPlayer: getPlayer,
    getRecipes: getRecipes,
    getResources: getResources,
    getWorldEdges: getWorldEdges,
    getWorldNodeById: getWorldNodeById,
    getEnemyById: getEnemyById,
    getConsumableById: getConsumableById,
    getEquipableById: getEquipableById,
    getItemById: getItemById,
    getRecipeById: getRecipeById,
    getResourceById: getResourceById,
    getWorldEdgeById: getWorldEdgeById,
    getSQLQuery: getSQLQuery,
    updatePlayer: updatePlayer,
    updateResourceById: updateResourceById,
    updateEnemyById: updateEnemyById,
    getRecipeByIngredients: getRecipeByIngredients,
}