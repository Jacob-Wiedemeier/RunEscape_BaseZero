class Item extends Sprite{
    // initialization requires async functions, so handle construction in init function.
    async init(id, inventoryIndex){
        this.id = id;
        let x = lookupInventoryIndexX(inventoryIndex);
        let y = lookupInventoryIndexY(inventoryIndex);
        let filename = await this.dbQueryItem().Filename;

        super.init(filename, x, y);

        let spriteRef = super.get();
        spriteRef.on('click', itemClicked(e));
        super.show();
    }

    async dbQueryItem(){
        // Return the columns associated with ItemId
        //return await db.getSQLQuery("SELECT * FROM ITEM WHERE ItemID = " + this.id + ";")[0];
    }

    itemClicked(){
        if(e.which == 3){
            // right click
            
            // Crafting
            craft();
        }
        else{
            // left click

            // Consume or Equip
            if(this.id >= 4089){
                consume();
            } else{
                equip();
            }
        }
    }

    craft(){


    }

    consume(){

    }

    equip(){

    }
}
