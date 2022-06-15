export class Projectile {
    constructor(ctx, x, y){
        this.ctx = ctx
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = 50;
        this.speed = 10;
    }
    update(){
        this.x += this.speed;
    }
    draw(){
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        this.ctx.fill(); 
    }
}

export function handleProjectiles(projectiles, enemies, collision){
    for (let i = 0; i < projectiles.length; i++){
        
        projectiles[i].update();
        projectiles[i].draw();

        for (let j = 0; j < enemies.length; j++){
            if (projectiles[i] && enemies[j]){
                if (collision(projectiles[i], enemies[j])){
                    enemies[j].health -= projectiles[i].power;
                    projectiles.splice(i, 1);
                    i--;
                }
            }
        }

        if (projectiles[i] && projectiles[i].x > canvas.width){
            projectiles.splice(i, 1);
            i--;
        }
    }
}