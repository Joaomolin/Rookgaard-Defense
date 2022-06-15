export class Sprite {
    constructor(spriteId){
        
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.spriteWidth = 34;
        this.spriteHeight = 34;
        this.spriteSpeed = 20 + addRandomSpeed();
        this.type = getSprite(spriteId, this);
        
    }    

    draw(ctx, x, y, width, height){
        ctx.drawImage(  this.type, 
                        this.frameX * this.spriteWidth, 
                        this.frameY * this.spriteHeight, 
                        this.spriteWidth, 
                        this.spriteHeight, 
                        x, 
                        y, 
                        width, 
                        height);
    }

    
}



function addRandomSpeed(){
    return Math.floor(Math.random() * 5);
}

function getSprite(i, self){
    const sprite = new Image();
    switch(i){
        case 1:
            sprite.src = "assets/SlimeInimigo.png";
            self.spriteWidth = 66;
            self.spriteHeight = 66;
            self.maxFrame = 7;
            self.spriteSpeed = 5 + addRandomSpeed();
            
        break;
        case 2:
            sprite.src = "assets/Ground1.png";
        break;
        case 3:
            sprite.src = "assets/bghorizontal.png";
            break;
        case 4:
            sprite.src = "assets/queijo.png";
        break;
        case 5:
            sprite.src = "assets/cobra.png";
            self.maxFrame = 1;
        break;
        case 6:
            sprite.src = "assets/teleport.png";
            self.maxFrame = 7;
            self.spriteSpeed = 5
        break;
        case 10:
            sprite.src = "assets/Arrow.png";
        break;
        case 11:
            sprite.src = "assets/MinoArcher.png";
            self.maxFrame = 1;
            self.spriteSpeed = 50 + addRandomSpeed();
        break;

        default:
            sprite.src = "assets/OrcInimigo.png";
            self.maxFrame = 1;
        break;
    }

    return sprite;
}



