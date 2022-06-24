import { Globals } from "./globals.js";

export class Sprite {
    
    constructor(spriteId, isSpawn) {

        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.spriteWidth = 34;
        this.spriteHeight = 34;
        this.spriteSpeed = addRandomNumberTo(20);
        this.type = getSprite(spriteId, this);
        this.isSpawn = isSpawn;

    }


    update(frame) {
        if (frame % this.spriteSpeed === 0) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                if (!this.isSpawn) {
                    this.frameX = this.minFrame;
                }
            }
        }
    }

    draw(ctx, x, y) {
        ctx.drawImage(this.type,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            x,
            getAdjustedPos(y, this.spriteHeight),
            getAdjustedSize(this.spriteWidth),
            getAdjustedSize(this.spriteHeight));
    }

}   
function getAdjustedPos(y, height){
    if (height > Globals.spriteSize) {
        let res = (getAdjustedSize(height) - Globals.cellSize) / 2;
        y -= res;
    }
    return y;
}

function getAdjustedSize(x){
    return Math.floor(x * Globals.cellSize / Globals.spriteSize);
}

function addRandomNumberTo(n){
    return n + getRandomSpeed();
}


function getRandomSpeed() {
    return Math.floor(Math.random() * 5);
}

function getSprite(i, self) {
    const sprite = new Image();
    switch (i) {
        case 2:
            sprite.src = "./assets/Ground1.png";
            // sprite.src = "https://www.tibiawiki.com.br/images/2/2d/Terracotta.gif";
            break;

        case 4:
            sprite.src = "./assets/queijo.png";
            break;
        case 6:
            sprite.src = "./assets/teleport.png";
            self.maxFrame = 8;
            self.spriteSpeed = 4;
            break;
        case 10:
            sprite.src = "./assets/Arrow.png";
            break;

        
        case 101:
            sprite.src = "./assets/enemies/Orc1.png";
            self.spriteSpeed = addRandomNumberTo(10);
            self.maxFrame = 7;
            break;
        case 102:
            sprite.src = "./assets/enemies/Orc2.png";
            self.spriteSpeed = addRandomNumberTo(10);
            self.maxFrame = 7;
            break;
        case 103:
            sprite.src = "./assets/enemies/Orc3.png";
            self.spriteSpeed = addRandomNumberTo(12);
            self.maxFrame = 7;
            break;
        case 104:
            sprite.src = "./assets/enemies/Skeleton1.png";
            self.spriteSpeed = addRandomNumberTo(10);
            self.maxFrame = 7;
            break;
        case 105:
            sprite.src = "./assets/enemies/Skeleton2.png";
            self.spriteSpeed = addRandomNumberTo(10);
            self.spriteWidth = 36;
            self.spriteHeight = 42;
            self.maxFrame = 7;
            break;
        case 106:
            sprite.src = "./assets/enemies/Dragon1.png";
            self.spriteSpeed = addRandomNumberTo(4);
            self.spriteWidth = 64;
            self.spriteHeight = 64;
            self.maxFrame = 7;
            break;
        case 107:
            sprite.src = "./assets/enemies/Dragon2.png";
            self.spriteSpeed = addRandomNumberTo(4);
            self.spriteWidth = 64;
            self.spriteHeight = 64;
            self.maxFrame = 7;
            break;
            

        case 201:
            sprite.src = "./assets/allies/Mino1.png";
            self.spriteSpeed = addRandomNumberTo(40);
            self.maxFrame = 7;
            break;
        case 202:
            sprite.src = "./assets/allies/Mino2.png";
            self.spriteSpeed = addRandomNumberTo(40);
            self.maxFrame = 7;
            break;
        case 203:
            sprite.src = "./assets/allies/Mino3.png";
            self.spriteSpeed = addRandomNumberTo(40);
            self.maxFrame = 7;
            break;

        default:
            sprite.src = "./assets/Arrow.png";
    }

    return sprite;
}




