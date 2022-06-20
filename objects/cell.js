import { Globals } from "./globals.js";
import { Sprite } from "./sprite.js";

export class Cell {
    constructor(ctx, mouse, x, y){
        this.ctx = ctx;
        this.mouse = mouse;
        this.x = x;
        this.y = y;
        this.width = Globals.cellSize;
        this.height = Globals.cellSize;

        this.sprite = new Sprite(2);
    }

    draw(collision){
        this.drawBackground();

        if (this.mouse.x && this.mouse.y && collision(this, this.mouse)){
            this.ctx.strokeStyle = 'black';
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
    }

    drawBackground(){
        this.ctx.drawImage( this.sprite.type, 
            this.sprite.frameX * this.sprite.spriteWidth, 
            this.sprite.frameY * this.sprite.spriteHeight, 
            this.sprite.spriteWidth - 2, 
            this.sprite.spriteHeight - 2, 
            this.x, 
            this.y, 
            this.width, 
            this.height);
    }
}