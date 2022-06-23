import { InventorySlots } from "./inventorySlots.js";

export class Inventory {
    constructor(){
        this.invLevels = [];
        this.invSlots = ['amulet', "weapon", "ring", "helmet", "armor", "legs", "boots", "bag", "shield", "ammo"];
        this.slots = new InventorySlots(this.invSlots, this.invLevels);
    }

    addListener(doc, img, i, self){
        
        doc.addEventListener('click', function(){     
            self.invLevels[i]++;
            img.src = self.slots.getImageSource(i);

            if (self.invLevels[i] >= 5){
                //doc.classList.add('goldInventorySlot');
            }

            console.log(`Level up ${self.invSlots[i]} from ${self.invLevels[i] - 1} to ${self.invLevels[i]} `);
        });
    }  

}

    export function createInventory(document){
        // console.log('Starting inv');
        const inventory = new Inventory();
        
        for(let i = 0; i < inventory.invSlots.length; i++){
            inventory.invLevels.push(1);
            
            //Click
            const slot = document.getElementById(inventory.invSlots[i] + "Slot");
            const img = document.getElementById(inventory.invSlots[i] + "SlotImg");
            img.src = inventory.slots.getImageSource(i);
            inventory.addListener(slot, img, i, inventory);
        }
        // console.log(`Inventory check ${this.invLevels.length} = ${this.invSlots.length}`);

        return inventory;
    }