export class Mouse {
    constructor(canvas){
        this.x = 10;
        this.y = 10;
        this.width = 0.1;
        this.height = 0.1;
        this.canvas = canvas;
        this.canvasPosition = canvas.getBoundingClientRect();
        
    }

    update(){
        this.canvasPosition = this.canvas.getBoundingClientRect();
    }
    
    
    
}

let uniqueMouse;
export function getMouse(canvas){
    if (!uniqueMouse){
        uniqueMouse = new Mouse(canvas);
    }
    return uniqueMouse;
}
