class Stats{
    constructor(){};
    async init(){

        let xStats = w/16 + w/256;
        let yStats = 5*h/8 + h/64;
        let yOffset = h/10;

        const player = await db_fetch('getPlayer')

        let currentHealth = player.currentHealth; // GET Player.CurrentHealth
        let maxHealth = player.maxHealth; // GET Player.MaxHealth
        this.hpText = new PIXI.Text(currentHealth + "/" + maxHealth + " HP");
        this.hpText.x = xStats;
        this.hpText.y = yStats;
        app.stage.addChild(this.hpText);

        let currentCombat = player.combatExperience; // GET Player.CombatExperience
        currentCombat = ExpToLevel(currentCombat);
        this.combatText = new PIXI.Text(currentCombat + " CMB");
        this.combatText.x = xStats;
        this.combatText.y = yStats + yOffset;
        app.stage.addChild(this.combatText); 

        let currentHarvest = player.harvestExperience; // GET Player.HarvestingExperience
        currentHarvest = ExpToLevel(currentHarvest);
        this.harvestText = new PIXI.Text(currentHarvest + " HRV");
        this.harvestText.x = xStats;
        this.harvestText.y = yStats + yOffset * 2;
        app.stage.addChild(this.harvestText);

        let currentCrafting = player.craftingExperience; // GET Player.CraftingExperience
        currentCrafting = ExpToLevel(currentCrafting);
        this.craftText = new PIXI.Text(currentCrafting + " CFT");
        this.craftText.x = xStats;
        this.craftText.y = yStats + yOffset * 3;
        app.stage.addChild(this.craftText);
    }

    async updateStats(){
        const player = await db_fetch('getPlayer')
        let currentHealth = player.currentHealth; // GET Player.CurrentHealth
        let maxHealth = player.maxHealth; // GET Player.MaxHealth
        this.hpText.text = currentHealth + "/" + maxHealth + " HP";

        let currentCombat = player.combatExperience; // GET Player.CombatExperience
        currentCombat = ExpToLevel(currentCombat);
        this.combatText.text = currentCombat + " CMB";

        let currentHarvest = player.harvestExperience; // GET Player.HarvestingExperience
        currentHarvest = ExpToLevel(currentHarvest);
        this.harvestText.text = currentHarvest + " HRV";

        let currentCrafting = player.craftingExperience; // GET Player.CraftingExperience
        currentCrafting = ExpToLevel(currentCrafting);
        this.craftText.text = currentCrafting + " CFT";
    }

}