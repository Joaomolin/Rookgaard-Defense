export class Entity {
    constructor(x, y, width, height, health) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
        this.speed = Math.random() * 0.3 + 3;
        this.movement = this.speed;
        this.health = health;
        this.maxHealth = this.health;

        //Ranged
        this.shooting = false;
        this.timer = 0;
    }
}