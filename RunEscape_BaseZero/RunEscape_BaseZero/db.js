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
    const fetchWorldNodes = await new Promise((resolve, reject) => {
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
    const fetchWorldNodes = await new Promise((resolve, reject) => {
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

module.exports = {
    getWorldNodes: getWorldNodes,
    getEnemies: getEnemies
}