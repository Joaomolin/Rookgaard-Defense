const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

//Globals
let frame = 0;
let gameOver = false;
const cellSize = 100;
const cellGap = 3;
//
const gameGrid = [];
const defenders = [];
let resources = 300;
//
const enemies = [];
const enemyPos = [];
let enemyInterval = 500;

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
    height: cellSize
};

class Cell {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }

    draw(){
        if (mouse.x && mouse.y && collision(this, mouse)){
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
    }
}

function createGrid(){
    for(let y = cellSize; y < canvas.height; y += cellSize){
        for (let x = 0; x < canvas.width; x += cellSize){
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

//Projectiles
//Defenders
class Defender {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.shooting = false;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;
    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '30px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 30);
    }
}

canvas.addEventListener('click', function(){
    const gridPositionX = mouse.x - (mouse.x % cellSize);
    const gridPositionY = mouse.y - (mouse.y % cellSize);
    if (gridPositionY < cellSize) return;

    for (let i = 0; i < defenders.length; i++){
        if (defenders[i].x === gridPositionX && defenders[i].y ===gridPositionY) return;
    }

    let defenderCost = 100;
    if (resources >= defenderCost){
        defenders.push(new Defender(gridPositionX, gridPositionY));
        resources -= defenderCost;
    }
});

function handleDefenders(){
    for (let i = 0; i < defenders.length; i++){
        defenders[i].draw();
    }
}

//Enemies
class Enemy {
    constructor(verticalPosition){
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = Math.random() * 0.3 + 0.8;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
    }
    update(){
        this.x -= this.movement;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '30px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 30);
    
    }
}

function handleEnemies(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();

        if (enemies[i].x < 0){
            gameOver = true;
        }
    }

    if (frame % enemyInterval === 0){
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize;
        enemies.push(new Enemy(verticalPosition));
        enemyPos.push(verticalPosition);
    }
}
//Resources

//Utilities
function handleGameStatus(){
    ctx.fillStyle = 'black';
    ctx.font = '30px Verdana';
    ctx.fillText(`Resources: ${resources}`, 20, 40);

    if (gameOver){
        ctx.fillStyle = 'black';
        ctx.font = '60px Arial';
        ctx.fillText('Game Over', 135, 230);

    }
}
function animate(){
    //
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    
    //Game
    handleGameGrid();
    handleDefenders();
    handleEnemies();
    handleGameStatus();

    //End game cycle
    frame++;
    if (!gameOver){
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