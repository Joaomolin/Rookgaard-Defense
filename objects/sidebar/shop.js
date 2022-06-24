import { ShopSlots } from "./shopSlots.js";

export class Shop {
    constructor() {
        this.slots = new ShopSlots();
        this.selectedSlot = '1';
    }

}

export function createShop(document) {
    const shop = new Shop();
    for (let i = 1; i <= shop.slots.length; i++) {
        const doc = document.getElementById(`shopSlot${i}`);
        const img = document.getElementById(`shopSlotImg${i}`);
        if (i === 1) doc.classList.add('goldInventorySlot');
        
        img.src = shop.slots.at(i).slot.src;

        //Click
        doc.addEventListener('click', function () {
            for (let i = 1; i <= shop.slots.length; i++) {
                const doc = document.getElementById('shopSlot' + i);
                doc.classList.remove('goldInventorySlot')
            }
            doc.classList.add('goldInventorySlot');
        });
    }

    return shop;
}


