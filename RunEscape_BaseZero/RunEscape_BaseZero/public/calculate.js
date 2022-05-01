/* calculate.js contains various math functions specific to the game - no data is stored here */

function ExpToLevel(experience){
    /* Exp calculation kept simple
     * Level 1 - 0-9 exp
     * Level 2 - 10-19 exp
     * Level 3 - 20-29 exp
     * ...
     */ 
    return math.floor(experience / 10) + 1;
}

function LevelRequirementMet(experienceCurrent, experienceRequirement){
    return ExpToLevel(experienceCurrent) >= ExpToLevel(experienceRequirement);
}