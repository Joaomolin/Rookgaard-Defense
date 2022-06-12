import { handleProjectiles } from "./objects/projectiles.js";
import { Defender, handleDefenders } from "./objects/defender.js";
import { handleEnemies } from "./objects/enemy.js";
import { Globals, Resources } from "./globals.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

//Globals
let frame = 0;
const gameGrid = [];
//
const projectiles = [];
const powerUps = [];
//
const defenders = [];
const enemies = [];
const enemyPos = [];

//Mouse
const mouse = {
    x: 10,
    y: 10,
    width: 0.1, 
    height: 0.1
}

let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave', function(e){
    mouse.x = undefined;
    mouse.y = undefined;
});

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
    }

    draw(){
        if (mouse.x && mouse.y && collision(this, mouse)){
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
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
        defenders.push(new Defender(ctx, gridPositionX, gridPositionY, 
                                    Globals.cellSize - Globals.cellGap * 2,
                                    Globals.cellSize - Globals.cellGap * 2));
                                    Resources.wallet -= defenderCost;
    }
});

//Resources
const popValues = [20, 30, 40];
class powerUp {
    constructor(){
        this.x = Math.random() * (canvas.width - Globals.cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * Globals.cellSize + 25;
        this.width = Globals.cellSize * 0.6;
        this.height = Globals.cellSize * 0.6;
        this.amount = popValues[Math.floor(Math.random() * popValues.length)];
    }
    draw(){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Verdana';
        ctx.fillText(this.amount, this.x + 20, this.y - 10);
    }
}

function handlePowerUp(){
    if (frame % 500 === 0 && Resources.score < Globals.winningScore){
        powerUps.push(new powerUp());
    }

    for(let i = 0; i < powerUps.length; i++){
        powerUps[i].draw();
        if (powerUps[i] && mouse.x && mouse.y){
            if (collision(powerUps[i], mouse)){
                Resources.wallet += powerUps[i].amount;
                powerUps.splice(i, 1);
                i--;
            }
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

    if (Resources.sscore >= Globals.winningScore){
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
    handlePowerUp();
    handleDefenders(defenders, enemies, enemyPos, projectiles, collision);
    handleProjectiles(projectiles, enemies, collision);
    handleEnemies(ctx, frame, Globals.enemyInterval, enemies, enemyPos);
    handleGameStatus();

    //End game cycle
    frame++;
    if (!Globals.gameOver && Resources.score < Globals.winningScore){
            requestAnimationFrame(animate);
    }
}

animate();

function collision(first, second){
    
    let collided = !(   first.x > second.x + second.width || 
                        first.x + first.width < second.x ||
                        first.y > second.y + second.height ||
                        first.y + first.height < second.y
                    )

    return collided;
}

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
});
