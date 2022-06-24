export class HealthBar {
    constructor(entity, entityStats) {
        this.entity = entity;
        this.entityStats = entity.entity;
        this.gap = 20;
        this.barSize = 100 - this.gap * 2;
    }

    draw() {
        this.showHealthBar();
    }

    showHealthBar() {
        if (this.entityStats.health < 0) return;

        const lifePercentage = this.getPercentage(this.entityStats.health, this.entityStats.maxHealth);


        this.entity.ctx.lineWidth = 2;
        this.entity.ctx.strokeStyle = 'black';
        this.entity.ctx.fillStyle = lifePercentage > 30 ? '#309030' : 'red';

        this.entity.ctx.fillRect(this.entityStats.x + this.gap - 3, this.entityStats.y - 2, lifePercentage, 5);
        this.entity.ctx.strokeRect(this.entityStats.x + this.gap - 3, this.entityStats.y - 2, this.barSize, 5);
    }

    getPercentage(a, b) {
        return a * this.barSize / b;
    }
}