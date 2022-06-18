import { InventorySlots } from "./inventorySlots.js";

export class Inventory {
    constructor(){
        this.invLevels = [];
        this.invSlots = ['amulet', "weapon", "ring", "helmet", "armor", "legs", "boots", "bag", "shield", "ammo"];
        this.slots = new InventorySlots(this.invSlots, this.invLevels);
    }

     //Inv
     startInventory(){
        console.log('Starting inv');
        for(let i = 0; i < this.invSlots.length; i++){
            this.invLevels.push(0);
            
            //Click
            const doc = document.getElementById(this.invSlots[i] + "Slot");
            const img = document.getElementById(this.invSlots[i] + "SlotImg");
            img.src = this.slots.getImageSource(i);
            this.addListener(doc, img, i, this);
            
        }
        console.log(`${this.invLevels.length} = ${this.invSlots.length}`);
    }

    addListener(doc, img, i, self){
        
        doc.addEventListener('click', function(){     
            self.invLevels[i]++;
            img.src = self.slots.getImageSource(i);
            
            console.log(`Level up ${self.invSlots[i]} from ${self.invLevels[i] - 1} to ${self.invLevels[i]} `);
            
        });
    }

   

    

}

