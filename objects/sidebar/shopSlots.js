import { ShopSlot } from "./shopSlot.js";

export class ShopSlots{
    constructor() {

        this.slots =   ['1', '2', '3', 
                        '4', '5', '6', 
                        '7', '8', '9',].map( val => new ShopSlot(val));

        this.length = this.slots.length;
    }

    at(i){
        return this.slots[i - 1];
    }
}
