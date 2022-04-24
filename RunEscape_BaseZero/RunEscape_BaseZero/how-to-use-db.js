const db = require("./db");

// Make an async function
async function main()
{
    // Make sure to include 'await' for the assignment
    let n = await db.getRecipes();

    // Now you can manipulate your data
    console.log(n[0]);
}

// do it
main();