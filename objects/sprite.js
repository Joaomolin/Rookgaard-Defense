import { Globals } from "./globals.js";

export class Sprite {
    
    constructor(spriteInfo) {

        this.isSpawn = spriteInfo.name == "Teleport";
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = spriteInfo.frames - 1;
        this.spriteWidth = spriteInfo.spriteWidth;
        this.spriteHeight = spriteInfo.spriteHeight;
        this.frameSpeed = spriteInfo.frameSpeed;
        const sprite = new Image();
        sprite.src = spriteInfo.src;
        this.type = sprite;

        this.info = spriteInfo;

    }


    update(frame) {
        if (frame % this.frameSpeed === 0) {
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
            getAdjustedHeight(y, this.spriteHeight),
            getAdjustedSize(this.spriteWidth),
            getAdjustedSize(this.spriteHeight));
    }

}   
function getAdjustedHeight(y, height){
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