import { Entity } from "./entity.js";
import { HealthBar } from "../healthBar.js";
import { Projectile } from "../projectile.js";
import { Sprite } from "../sprite.js";

export class Defender {
    constructor(ctx, x, y, width, height){
        this.ctx = ctx;
        // this.x = x;
        // this.y = y;
        // this.width = width;
        // this.height = height;
        // this.shooting = false;
        // this.health = 100;
        // this.maxHealth = this.health;
        // this.timer = 0;
        
        this.entity = new Entity(x, y ,width, height, 100);
        this.healthBar = new HealthBar(this, this.entity);
        this.spawnSprite = new Sprite(6, true);
        this.sprite = new Sprite(200);
    }

    draw(){
        this.sprite.draw(this.ctx, this.entity.x, this.entity.y, this.entity.width, this.entity.height);
        this.spawnSprite.draw(this.ctx, this.entity.x, this.entity.y, this.entity.width, this.entity.height);
        this.healthBar.draw();
    }

    
    update(projectiles, frame){
        this.spawnSprite.update(frame);
        
        if (!this.entity.shooting){
            this.entity.timer = 0;
            return;
        } 

        this.sprite.update(frame);
        
        if (this.entity.timer % 80 === 0){
            projectiles.push(new Projectile(this.ctx, this.entity.x + 70, this.entity.y + 50));
        }

        this.entity.timer++;
        
    }
}

export function handleDefenders(defenders, enemies, enemyPos, projectiles, frame, collision){
    
    for (let i = 0; i < defenders.length; i++){
        
        defenders[i].update(projectiles, frame);
        defenders[i].draw();

        if (enemyPos.indexOf(defenders[i].entity.y) !== -1){
            defenders[i].entity.shooting = true;
        } else{
            defenders[i].entity.shooting = false;
        }

        //Check collision
        for (let j = 0; j < enemies.length; j++){
            if (defenders[i] && collision(defenders[i], enemies[j])){
                enemies[j].entity.movement = 0;
                defenders[i].entity.health -= 0.1;
            }
            if (defenders[i] && defenders[i].entity.health <= 0){
                defenders.splice(i, 1);
                i--;
                
                enemies[j].entity.movement = enemies[j].entity.speed;
            }
        }
    }
}