export class Shop {
    constructor(){
        this.slots =   ['1', '2', '3', 
                        '4', '5', '6', 
                        '7', '8', '9', ]
    }

    startShop(){

        for(let i = 1; i <= this.slots.length; i++){
            const doc = document.getElementById(`shopSlot${i}`);
            console.log(doc);

            //Click
            this.addListener(doc, this);
        }

    }

    addListener(doc, self){
        doc.addEventListener('click', function(){     
            self.clearBackground();
            doc.classList.add('goldInventorySlot');

            console.log(doc);
        });
    }  

    clearBackground(){
        for(let i = 1; i <= this.slots.length; i++){
            const doc = document.getElementById('shopSlot' + i);
            doc.classList.remove('goldInventorySlot')
        }
    }
}