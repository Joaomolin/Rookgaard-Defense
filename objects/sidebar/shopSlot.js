export class ShopSlot{
    constructor(val){
        
        this.src = null;


        //this.createSlot(val);
    }
    
    createSlot(val){
        switch(val){
            case '1':
                this.src = this.slot1.src;
                break;
        }
    }

}



const slot = {
    slot1: {
        src: "./assets/queijo.png",

    },
}