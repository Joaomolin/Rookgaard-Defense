export class Shop {
    constructor(){
        this.slots =   ['1', '2', '3', 
                        '4', '5', '6', 
                        '7', '8', '9', ];
        this.selectedSlot = '1';
    }

    createShop(){

        for(let i = 1; i <= this.slots.length; i++){
            const doc = document.getElementById(`shopSlot${i}`);
            const img = document.getElementById(`shopSlotImg${i}`);
            if (i === 1) doc.classList.add('goldInventorySlot');
            img.src = "./assets/favicon.png";
            //Click
            this.addListener(doc, this);
        }

    }

    addListener(doc, self){
        doc.addEventListener('click', function(){     
            self.clearBackground();
            doc.classList.add('goldInventorySlot');
        });
    }  

    clearBackground(){
        for(let i = 1; i <= this.slots.length; i++){
            const doc = document.getElementById('shopSlot' + i);
            doc.classList.remove('goldInventorySlot')
        }
    }
}