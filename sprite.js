export class Sprite {
    constructor(spriteId){
        
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.spriteWidth = 34;
        this.spriteHeight = 34;
        this.spriteSpeed = 20 + this.addRandomSpeed();
        this.type = getSprite(spriteId, this);
        
    }    

    addRandomSpeed(){
        return Math.floor(Math.random() * 5);
    }
}

function getSprite(i, self){
    const sprite = new Image();
    switch(i){
        case 1:
            sprite.src = "SlimeInimigo.png";
            self.frameY = 0;
            self.spriteWidth = 66;
            self.spriteHeight = 66;
            self.maxFrame = 7;
            self.spriteSpeed = 5 + self.addRandomSpeed();
            
        break;
        case 2:
            sprite.src = "545.png";
            self.maxFrame = 0;
        break;

        default:
            sprite.src = "OrcInimigo.png";
            self.maxFrame = 1;
        break;
    }

    return sprite;
}



