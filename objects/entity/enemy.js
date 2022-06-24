import { Globals, Resources, randomIntFromInterval } from "../globals.js";
import { Sprite } from "../sprite.js";
import { HealthBar } from "../healthBar.js";
import { Entity } from "./entity.js";

export class Enemy {
    constructor(ctx, verticalPosition) {

        //Enemy
        this.ctx = ctx;

        this.entity = new Entity(canvas.width, verticalPosition, Globals.cellSize - Globals.cellGap * 2, Globals.cellSize - Globals.cellGap * 2, randomIntFromInterval(100, 200));
        this.healthBar = new HealthBar(this, this.entity);
        this.spawnSprite = new Sprite(6, true);
        this.sprite = new Sprite(randomIntFromInterval(100, 102));
    }

    update(frame) {
        this.entity.x -= this.entity.movement;

        this.sprite.update(frame);
        this.spawnSprite.update(frame);
    }

    draw() {
        this.sprite.draw(this.ctx, this.entity.x, this.entity.y, this.entity.width, this.entity.height);
        this.spawnSprite.draw(this.ctx, this.entity.x, this.entity.y, this.entity.width, this.entity.height);
        this.healthBar.draw();
    }
}

export function handleEnemies(ctx, frame, enemies, enemyPos) {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update(frame);
        enemies[i].draw();


        if (enemies[i].entity.health <= 0) {
            const gainedResource = Math.floor(enemies[i].entity.maxHealth / 4);
            Resources.wallet += gainedResource;
            Resources.score += gainedResource;
            const findIndex = enemyPos.indexOf(enemies[i].entity.y);
            //const findIndex = enemies.filter(val => val.entity.health <= 0);

            const a = enemyPos.splice(findIndex, 1);
            const b = enemies.splice(i, 1);
            console.log(`Removed enemy ${a} === ${b}`);
            console.log(a); 
            console.log(b);
            i--;
            return;
        }

        if (enemies[i].entity.x < 0) {
            Globals.gameOver = true;
        }
    }

    //Spawn enemy
    if (frame % Globals.enemyInterval === 0) {
        let verticalPosition = Math.floor(Math.random() * 6) * Globals.cellSize + Globals.cellGap;

        enemies.push(new Enemy(ctx, verticalPosition));
        enemyPos.push(verticalPosition);
        if (Globals.enemyInterval > 50) Globals.enemyInterval -= 25;
    }
}