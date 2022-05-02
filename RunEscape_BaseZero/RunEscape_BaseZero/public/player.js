function playerHealthCheck(){
    var currentHealth = 0;
    // QUERY Player.CurrentHealth

    if(currentHealth <= 0){
        // Player is dead
        // EMPTY Player's Inventory
        // SET Player.CurrentHealth = Player.MaxHealth
        // SET Player.FK_WorldNodeID = 1000; 
    }
    statsDisplay.updateStats();
}

function playerCalcDamage(){
    var combatExp = 0;
    // QUERY Player.CombatExperience
    var combatLevel = ExpToLevel(combatExp);

    var attackBase = playerEquipmentAttack();

    return math.floor(combatLevel * attackBase);
}

function playerCalcDefense(){
    var combatExp = 0;
    // QUERY Player.CombatExperience
    var combatLevel = ExpToLevel(combatExp);

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