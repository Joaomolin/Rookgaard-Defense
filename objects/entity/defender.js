import { Entity } from "./entity.js";
import { HealthBar } from "../healthBar.js";
import { Projectile } from "../projectile.js";
import { Sprite } from "../sprite.js";

export class Defender {
    constructor(ctx, x, y, width, height){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shooting = false;
        this.health = 100;
        this.maxHealth = this.health;
        this.timer = 0;
        
        this.entity = new Entity(x, y ,width, height, 100);
        this.healthBar = new HealthBar(this);
        this.spawnSprite = new Sprite(6, true);
        this.sprite = new Sprite(200);
    }

    draw(){
        this.sprite.draw(this.ctx, this.x, this.y, this.width, this.height);
        this.spawnSprite.draw(this.ctx, this.x, this.y, this.width, this.height);
        this.healthBar.draw();
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
                defenders[i].health -= 0.1;
            }
            if (defenders[i] && defenders[i].health <= 0){
                defenders.splice(i, 1);
                i--;
                
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
}