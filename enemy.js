import { Globals, Resources } from "./globals.js";

export class Enemy {
    constructor(ctx, verticalPosition){
        this.ctx = ctx;
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = Globals.cellSize - Globals.cellGap * 2;
        this.height = Globals.cellSize - Globals.cellGap * 2;
        this.speed = Math.random() * 0.3 + 5;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
    }
    update(){
        this.x -= this.movement;
    }
    draw(){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = 'black';
        this.ctx.font = '30px Verdana';
        this.ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 30);
    
    }
}

export function handleEnemies(ctx, frame, enemyInterval, enemies, enemyPos){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();

        
        if (enemies[i].health <= 0){
            const gainedResource = enemies[i].maxHealth/5;
            console.log(`Gained: ${gainedResource}, Res: ${Resources.wallet}, Score: ${Resources.score}`);
            Resources.wallet += gainedResource;
            Resources.score += gainedResource;
            console.log(`Gained: ${gainedResource}, Res: ${Resources.wallet}, Score: ${Resources.score}`);
            const findIndex = enemyPos.indexOf(enemies[i].y);
            enemyPos.splice(findIndex, 1);
            enemies.splice(i, 1);
            i--;
            console.log(enemyPos);
            console.log(`Gained: ${gainedResource}, Res: ${Resources.wallet}, Score: ${Resources.score}`);
            return;
        }

        if (enemies[i].x < 0){
            Globals.gameOver = true;
        }
    }


    //Spawn enemy
    if (frame % enemyInterval === 0){
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * Globals.cellSize + Globals.cellGap
        enemies.push(new Enemy(ctx, verticalPosition));
        enemyPos.push(verticalPosition);
        if (enemyInterval > 120) enemyInterval -= 50;
    }
}