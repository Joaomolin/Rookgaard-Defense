export class FloatingSprite{
    constructor(ctx, x, y, value){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.value = value;
        this.size = size;
        this.lifespan = 0;
        this.color = color;
        this.opacity = 1;
        
    }
    update(){
        this.y -= 0.3;
        this.lifespan++;
        if (this.opacity > 0.1){
            this.opacity -= 0.05;
        } else {
            this.opacity = 0;
        }
    }
    draw(){
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillStyle = this.color;    
        this.ctx.font = this.size + 'px Roboto Mono';
        this.ctx.fillText(this.value, this.x, this.y);

        //reset opacity
        this.ctx.globalAlpha = 1;
    }
}