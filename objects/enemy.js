import { Globals, Resources } from "../globals.js";
import { Sprite } from "../sprite.js";

export class Enemy {
    constructor(ctx, verticalPosition){

        //Enemy
        this.ctx = ctx;
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = Globals.cellSize - Globals.cellGap * 2;
        this.height = Globals.cellSize - Globals.cellGap * 2;
        this.speed = Math.random() * 0.3 + 5;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;

        //newSPrite
        this.sprite = new Sprite(5);
    }

    update(frame){
        this.x -= this.movement;
        
        if (frame % this.sprite.spriteSpeed === 0){
            if (this.sprite.frameX < this.sprite.maxFrame){
                this.sprite.frameX++;
            } else {
                this.sprite.frameX = this.sprite.minFrame;
            }
        }
    }

    draw(){
        this.ctx.globalAlpha = 0.2;
        this.ctx.fillStyle = 'red';
        //this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = 'black';
        this.ctx.font = '30px Verdana';
        this.ctx.fillText(Math.floor(this.health), this.x + this.sprite.spriteWidth / 2, this.y);
    
        //this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        this.ctx.drawImage( this.sprite.type, 
                            this.sprite.frameX * this.sprite.spriteWidth, 
                            this.sprite.frameY * this.sprite.spriteHeight, 
                            this.sprite.spriteWidth, 
                            this.sprite.spriteHeight, 
                            this.x, 
                            this.y, 
                            this.width, 
                            this.height);
    }
}

export function handleEnemies(ctx, frame, enemies, enemyPos){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].update(frame);
        enemies[i].draw();

        
        if (enemies[i].health <= 0){
            const gainedResource = enemies[i].maxHealth/5;
            Resources.wallet += gainedResource;
            Resources.score += gainedResource;
            const findIndex = enemyPos.indexOf(enemies[i].y);

            enemyPos.splice(findIndex, 1);
            enemies.splice(i, 1);
            i--;
            return;
        }

        if (enemies[i].x < 0){
            Globals.gameOver = true;
        }
    }
    

    //Spawn enemy
    if (frame % Globals.enemyInterval === 0){
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * Globals.cellSize + Globals.cellGap
        enemies.push(new Enemy(ctx, verticalPosition));
        enemyPos.push(verticalPosition);
        if (Globals.enemyInterval > 120) Globals.enemyInterval -= 50;
    }
}