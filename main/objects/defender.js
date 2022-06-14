import { Projectile } from "./projectile.js";

export class Defender {
    constructor(ctx, x, y, width, height){
        console.log(`${x} e ${y}`);
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shooting = false;
        this.health = 10000;
        this.projectiles = [];
        this.timer = 0;
    }

    draw(){
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = 'gray';
        this.ctx.font = '30px Verdana';
        this.ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 30);
    }
    
    update(projectiles){
        
        if (!this.shooting){
            this.timer = 0;
            return;
        } 

        
        if (this.timer % 100 === 0){
            
            projectiles.push(new Projectile(this.ctx, this.x + 70, this.y + 50));
        }

        this.timer++;
    }
}

export function handleDefenders(defenders, enemies, enemyPos, projectiles, collision){
    
    for (let i = 0; i < defenders.length; i++){
        
        defenders[i].update(projectiles);
        defenders[i].draw();
       

        if (enemyPos.indexOf(defenders[i].y) !== -1){
            defenders[i].shooting = true;
        } else{
            defenders[i].shooting = false;
        }

        //Check collision
        for (let j = 0; j < enemies.length; j++){
            if (defenders[i] && collision(defenders[i], enemies[j])){
                enemies[j].movement = 0;
                defenders[i].health -= 0.2;
            }
            if (defenders[i] && defenders[i].health <= 0){
                defenders.splice(i, 1);
                i--;
                
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
}