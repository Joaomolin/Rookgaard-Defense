export class HealthBar{
    constructor(entity){
        this.entity = entity;
        this.gap = 20;
        this.barSize = 100 - this.gap * 2;
    }

    draw(){
        this.showHealthBar();
    }

    showHealthBar(){
        if (this.entity.health < 0) return;

        const lifePercentage = this.getPercentage(this.entity.health, this.entity.maxHealth);

        this.entity.ctx.lineWidth = 2;
        this.entity.ctx.fillStyle = lifePercentage > 30 ? '#309030' : 'red';
        
        this.entity.ctx.fillRect(this.entity.x + this.gap - 3, this.entity.y - 10, lifePercentage, 5);
        this.entity.ctx.strokeRect(this.entity.x + this.gap - 3, this.entity.y - 10, this.barSize, 5);
    }

    getPercentage(a, b){
        return a * this.barSize / b;
    }
}