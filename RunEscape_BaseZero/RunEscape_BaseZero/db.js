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
            let tempID = node.WorldNodeID;
            worldNodes.push(tempID);
        });
    }).catch((err) => {
        console.log(err);
    });
    return worldNodes;
}

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
                fk_ItemID: enemy.FK_ItemID
            };
            enemies.push(thisEnemy);
        });
    }).catch((err) => {
        console.log(err);
    });
    return enemies;
}

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
                fk_Username: item.FK_Username
            };
            items.push(thisItem);
        });
    }).catch((err) => {
        console.log(err);
    });
    return items;
}

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
            combatExperience: results.CombatExperience,
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

module.exports = {
    getWorldNodes: getWorldNodes,
    getEnemies: getEnemies,
    getConsumables: getConsumables,
    getEquipables: getEquipables,
    getIncludes: getIncludes,
    getItems: getItems,
    getPlayer: getPlayer,
    getRecipes: getRecipes
}