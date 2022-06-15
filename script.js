import { handleProjectiles } from "./objects/projectile.js";
import { Defender, handleDefenders } from "./objects/defender.js";
import { handleEnemies } from "./objects/enemy.js";
import { Globals, Resources } from "./globals.js";
import { handlePowerUp } from "./objects/powerUp.js"
import { Mouse } from "./mouse.js"
import { FloatingMessage } from "./objects/floatingMessage.js";
import { Sprite } from "./sprite.js";


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;
const mouse = new Mouse(canvas);

//Globals
let frame = 0;
const gameGrid = [];
const floatingMessages = [];
//
const projectiles = [];
//
const defenders = [];
const enemies = [];
const enemyTypes = [];
const enemyPos = [];



//Board
const controlsBar = {
    width: canvas.width,
    height: Globals.cellSize
};

class Cell {
    constructor(x, y){
        
        this.x = x;
        this.y = y;
        this.width = Globals.cellSize;
        this.height = Globals.cellSize;

        this.sprite = new Sprite(2);
    }

    draw(){
        this.drawBackground();

        if (mouse.x && mouse.y && collision(this, mouse)){
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
    }

    drawBackground(){
        ctx.drawImage( this.sprite.type, 
            this.sprite.frameX * this.sprite.spriteWidth, 
            this.sprite.frameY * this.sprite.spriteHeight, 
            this.sprite.spriteWidth - 2, 
            this.sprite.spriteHeight - 2, 
            this.x, 
            this.y, 
            this.width, 
            this.height);
    }
}

function createGrid(){
    for(let y = Globals.cellSize; y < canvas.height; y += Globals.cellSize){
        for (let x = 0; x < canvas.width; x += Globals.cellSize){
            gameGrid.push(new Cell(x, y));
        }
    }
}
createGrid();

function handleGameGrid(){
    for(let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw();
    }
}

function handleFloatingMessages(){
    for(let i = 0; i < floatingMessages.length; i++){
        floatingMessages[i].update();
        floatingMessages[i].draw();

        if (floatingMessages[i].lifespan >= 50){
            floatingMessages.splice(i, 1);
            i--;
        }
    }
}

//Utilities
function handleGameStatus(){
    ctx.fillStyle = 'black';
    ctx.font = '30px Verdana';
    ctx.fillText(`Resources: ${Resources.wallet}`, 20, 40);
    ctx.fillText(`Score: ${Resources.score}`, 20, 80);

    if (Globals.gameOver){
        ctx.fillStyle = 'black';        
        ctx.font = '60px Roboto Mono';
        ctx.fillText('Game Over', 300, 350);
        ctx.fillText(`Score: ${Resources.score}`, 300, 400);

    }

    if (Resources.score >= Globals.winningScore){
        ctx.fillStyle = 'black';        
        ctx.font = '60px Roboto Mono';
        ctx.fillText('You won!', 300, 350);
        ctx.fillText(`Score: ${Resources.score}`, 300, 400);
    }
}

function animate(){
    //
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    
    //Game
    handleGameGrid();
    handlePowerUp(ctx, canvas, frame, mouse, floatingMessages, collision);
    handleDefenders(defenders, enemies, enemyPos, projectiles, frame, collision);
    handleProjectiles(projectiles, enemies, collision);
    handleEnemies(ctx, frame, enemies, enemyPos);
    handleGameStatus();
    handleFloatingMessages();

    //End game cycle
    frame++;
    if (!Globals.gameOver && Resources.score < Globals.winningScore){
            requestAnimationFrame(animate);
    }
}
animate();

function collision(first, second){
    
    let collided = !( 
        first.x > second.x + second.width || 
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
    )

    return collided;
}



//Events
//Add defender
canvas.addEventListener('click', function(){
    
    const gridPositionX = mouse.x - (mouse.x % Globals.cellSize) + Globals.cellGap;
    const gridPositionY = mouse.y - (mouse.y % Globals.cellSize) + Globals.cellGap;
    if (gridPositionY < Globals.cellSize) return;

    for (let i = 0; i < defenders.length; i++){
        if (defenders[i].x === gridPositionX && defenders[i].y ===gridPositionY) return;
    }

    let defenderCost = 100;
    if (Resources.wallet >= defenderCost){
        Resources.wallet -= defenderCost;
        defenders.push(new Defender(ctx, gridPositionX, gridPositionY, 
                                    Globals.cellSize - Globals.cellGap * 2,
                                    Globals.cellSize - Globals.cellGap * 2));
    } else {        
        floatingMessages.push(new FloatingMessage(ctx, mouse.x, mouse.y, 'Need more resources', 20, 'blue'));
    }
});

window.addEventListener('resize', function(){
    mouse.update();
});

canvas.addEventListener('mousemove', function(e){
    mouse.update();
    mouse.x = e.x - mouse.canvasPosition.left;
    mouse.y = e.y - mouse.canvasPosition.top;
});

canvas.addEventListener('mouseleave', function(e){
    mouse.x = undefined;
    mouse.y = undefined;
});


