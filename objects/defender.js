import { Projectile } from "./projectile.js";
import { Sprite } from "../sprite.js";

export class Defender {
    constructor(ctx, x, y, width, height){
        console.log(`${x} e ${y}`);
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shooting = false;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;

        this.spawnSprite = new Sprite(6, true);
        this.sprite = new Sprite(200);
    }

    draw(){
        this.ctx.globalAlpha = 0.2;
        this.ctx.fillStyle = 'blue';
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = 'black';
        this.ctx.font = '30px Verdana';
        this.ctx.fillText(Math.floor(this.health), this.x + this.sprite.spriteWidth / 2, this.y);

        
        this.sprite.draw(this.ctx, this.x, this.y, this.width, this.height);
        this.spawnSprite.draw(this.ctx, this.x, this.y, this.width, this.height);
    }
    
    update(projectiles, frame){
        this.spawnSprite.update(frame);
        
        if (!this.shooting){
            this.timer = 0;
            return;
        } 

        this.sprite.update(frame);
        
        if (this.timer % 80 === 0){
            
            projectiles.push(new Projectile(this.ctx, this.x + 70, this.y + 50));
        }

        this.timer++;
        
    }
}

export function handleDefenders(defenders, enemies, enemyPos, projectiles, frame, collision){
    
    for (let i = 0; i < defenders.length; i++){
        
        defenders[i].update(projectiles, frame);
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