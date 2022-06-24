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
        src: "./assets/favicon.png",
    },
}