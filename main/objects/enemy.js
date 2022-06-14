import { Globals, Resources } from "../globals.js";

export class Enemy {
    constructor(ctx, verticalPosition){
        this.ctx = ctx;
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = Globals.cellSize - Globals.cellGap * 2;
        this.height = Globals.cellSize - Globals.cellGap * 2;
        this.speed = Math.random() * 0.3 + 5;
        this.movement = this.speed;
        this.health = 10000;
        this.maxHealth = this.health;
        const enemy1 = new Image();
        enemy1.src = "OrcInimigo.png";
        this.type = enemy1;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 1;
        this.spriteWidth = 34;
        this.spriteHeight = 34;
    }

    update(frame){
        this.x -= this.movement;
        
        if (frame % 20 === 0){
            if (this.frameX < this.maxFrame){
                this.frameX++;
            } else {
                this.frameX = this.minFrame;
            }
        }
    }

    draw(){
        this.ctx.fillStyle = 'red';
        //this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = 'black';
        this.ctx.font = '30px Verdana';
        //this.ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 30);
    
        //this.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        this.ctx.drawImage(this.type, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export function handleEnemies(ctx, frame, enemyInterval, enemies, enemyPos){
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
    

    console.log(`handleEnemies! ${enemies.length} / ${enemyPos.length}`);
    //Spawn enemy
    if (frame % enemyInterval === 0){
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * Globals.cellSize + Globals.cellGap
        enemies.push(new Enemy(ctx, verticalPosition));
        enemyPos.push(verticalPosition);
        console.log(`Created new enemy! ${enemies.length} / ${enemyPos.length}`)
        if (enemyInterval > 120) enemyInterval -= 50;
    }
}