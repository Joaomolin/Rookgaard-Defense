import { Globals, Resources, randomIntFromInterval } from "./globals.js";
import { Sprite } from "./sprite.js";

export class Enemy {
    constructor(ctx, verticalPosition){

        //Enemy
        this.ctx = ctx;
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = Globals.cellSize - Globals.cellGap * 2;
        this.height = Globals.cellSize - Globals.cellGap * 2;
        this.speed = Math.random() * 0.3 + 3;
        this.movement = this.speed;
        this.health = randomIntFromInterval(100, 200);
        this.maxHealth = this.health;

        //newSPrite
        this.spawnSprite = new Sprite(6, true);
        this.sprite = new Sprite(randomIntFromInterval(100, 102));
    }

    update(frame){
        this.x -= this.movement;
        
        this.sprite.update(frame);
        this.spawnSprite.update(frame);
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
        this.sprite.draw(this.ctx, this.x, this.y, this.width, this.height);
        this.spawnSprite.draw(this.ctx, this.x, this.y, this.width, this.height);
    }
}

export function handleEnemies(ctx, frame, enemies, enemyPos){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].update(frame);
        enemies[i].draw();

        
        if (enemies[i].health <= 0){
            const gainedResource = Math.floor(enemies[i].maxHealth/4);
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
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * Globals.cellSize + Globals.cellGap;
        
        enemies.push(new Enemy(ctx, verticalPosition));
        enemyPos.push(verticalPosition);
        if (Globals.enemyInterval > 100) Globals.enemyInterval -= 40;
    }
}