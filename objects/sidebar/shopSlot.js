export class ShopSlot{
    constructor(val){        
        this.slot = createSlot(val);        
    }
    
}

function createSlot(val){
    switch(val){
        case '1':
            return slot.slot1;                
        case '2':
            return slot.slot2;
        case '3':
            return slot.slot3;
        case '4':
            return slot.slot4;
        case '5':
            return slot.slot5;
        case '6':
            return slot.slot6;
        case '7':
            return slot.slot7;
        case '8':
            return slot.slot8;
        case '9':
            return slot.slot9;
        default:
            return slot.default;
    }
}


const slot = {
    default: {
        src: "./assets/queijo.png",
    },
    slot1: {
        src: "./assets/Arrow.png",
    },
    slot2: {
        src: "./assets/shop/sd.png",
    },
    slot3: {
        src: "./assets/shop/sd.png",
    },
    slot4: {
        src: "./assets/shop/sd.png",
    },
    slot5: {
        src: "./assets/shop/sd.png",
    },
    slot6: {
        src: "./assets/shop/sd.png",
    },
    slot7: {
        src: "./assets/shop/sd.png",
    },
    slot8: {
        src: "https://www.tibiawiki.com.br/images/2/23/Fire_Field_Rune.gif",
    },
    slot9: {
        src: "https://www.tibiawiki.com.br/images/9/9b/Ultimate_Healing_%28Rune%29_%28Old2%29.gif",
    },
}