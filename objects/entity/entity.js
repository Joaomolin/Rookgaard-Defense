export class Entity {
    constructor(x, y, width, height, health, isWalking) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = Math.random() * 1 + 3;
        this.movement = this.speed;
        this.isWalking = isWalking;

        this.health = health;
        this.maxHealth = this.health;

        //Ranged
        this.shooting = false;
        this.timer = 0;
    }
}