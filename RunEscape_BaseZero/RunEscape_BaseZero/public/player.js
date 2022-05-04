async function playerHealthCheck(){
    const player = await getPlayer()

    if(player.currentHealth <= 0){
        // Player is dead
        // EMPTY Player's Inventory
        inventory = []
        // SET Player.CurrentHealth = Player.MaxHealth
        player.currentHealth = player.maxHealth
        // SET Player.FK_WorldNodeID = 1000; 
        player.fk_WorldNodeId = 1000
        await updatePlayer()
    }
    statsDisplay.updateStats();
}

async function playerCalcDamage(){
    const player = await getPlayer()
    // QUERY Player.CombatExperience
    var combatLevel = ExpToLevel(player.combatExperience);

    var attackBase = playerEquipmentAttack();

    return math.floor(combatLevel * attackBase);
}

async function playerCalcDefense(){
    const player = await getPlayer()
    // QUERY Player.CombatExperience
    var combatLevel = ExpToLevel(player.combatExperience);

    var defenseBase = playerEquipmentDefense();

    return math.floor(combatLevel * defenseBase);
}

function playerEquipmentAttack(){
    var sumAttackModifier = 0;
    // QUERY Player's Equipment
    //  Sum all Equipable.AttackModifier into sumAttackModifier
 
    return sumAttackModifier;
}

function playerEquipmentDefense(){
    var sumDefenseModifier = 0;
    // QUERY Player's Equipment
    //  Sum all Equipable.DefenseModifier into sumDefenseModifier

    return sumDefenseModifier;
}

// Player has an inventory size of 6
function playerInventorySpace(){
    var totalItems = 0;
    // QUERY Player's Inventory
    //  Count all items in inventory

    return 6 - totalItems;
}

// Player has 3 equipment slots
function playerEquipmentSpace(){
    var totalItems = 0;
    // QUERY Player's Equipment
    //  Count all items in equipment

    return 3 - totalItems;
}

async function updatePlayer(player){ 
    await db_post('updatePlayer', player)
}

async function getPlayer(){
    return await db_fetch('getPlayer')
}