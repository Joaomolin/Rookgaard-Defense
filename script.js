const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

//Globals
let frame = 0;
let gameOver = false;
const winningScore = 1000;
const cellGap = 3;
const cellSize = 100;
const gameGrid = [];
//
let resources = 300;
let score = 0;
//
const projectiles = [];
const powerUps = [];
//
const defenders = [];
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
class Projectiles {
    constructor(x, y){
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
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fill(); 
    }
}
function handleProjectiles(){
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

//Defenders
class Defender {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.shooting = false;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;
    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gray';
        ctx.font = '30px Verdana';
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 30);
    }
    
    update(){
        if (!this.shooting){
            this.timer = 0;
            return;
        } 

        
        if (this.timer % 100 === 0){
            projectiles.push(new Projectiles(this.x + 70, this.y + 50));
        }

        this.timer++;
    }
}

function handleDefenders(){
    for (let i = 0; i < defenders.length; i++){
        defenders[i].update();
        defenders[i].draw();

        if (enemyPos.indexOf(defenders[i].y) !== -1){
            defenders[i].shooting = true;
        } else{
            defenders[i].shooting = false;
        }

        //Check collision
        for (let j = 0; j < enemies.length; j++){
            if (defenders[i] && collision(defenders[i], enemies[j])){
                enemies[j].movement = 0;
                defenders[i].health -= 0.2;
            }
            if (defenders[i] && defenders[i].health <= 0){
                defenders.splice(i, 1);
                i--;
                
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
}

//Add defender
canvas.addEventListener('click', function(){
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
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

//Enemies
class Enemy {
    constructor(verticalPosition){
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
        this.speed = Math.random() * 0.3 + 5;
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
        ctx.fillStyle = 'black';
        ctx.font = '30px Verdana';
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y + 30);
    
    }
}

function handleEnemies(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();

        
        if (enemies[i].health <= 0){
            let gainedResource = enemies[i].maxHealth/5;
            resources += gainedResource;
            score += gainedResource;
            const findIndex = enemyPos.indexOf(enemies[i].y);
            enemyPos.splice(findIndex, 1);
            enemies.splice(i, 1);
            i--;
            console.log(enemyPos);
            return;
        }

        if (enemies[i].x < 0){
            gameOver = true;
        }
    }


    //Spawn enemy
    if (frame % enemyInterval === 0){
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        enemies.push(new Enemy(verticalPosition));
        enemyPos.push(verticalPosition);
        if (enemyInterval > 120) enemyInterval -= 50;
        console.log(enemyPos);
    }
}

//Resources
const popValues = [20, 30, 40];
class powerUp {
    constructor(){
        this.x = Math.random() * (canvas.width - cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
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
    if (frame % 500 === 0 && score < winningScore){
        powerUps.push(new powerUp());
    }

    for(let i = 0; i < powerUps.length; i++){
        powerUps[i].draw();
        if (powerUps[i] && mouse.x && mouse.y){
            if (collision(powerUps[i], mouse)){
                resources += powerUps[i].amount;
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
    ctx.fillText(`Resources: ${resources}`, 20, 40);
    ctx.fillText(`Score: ${score}`, 20, 80);

    if (gameOver){
        ctx.fillStyle = 'black';        
        ctx.font = '60px Roboto Mono';
        ctx.fillText('Game Over', 300, 350);
        ctx.fillText(`Score: ${score}`, 300, 400);

    }

    if (score >= winningScore){
        ctx.fillStyle = 'black';        
        ctx.font = '60px Roboto Mono';
        ctx.fillText('You won!', 300, 350);
        ctx.fillText(`Score: ${score}`, 300, 400);
    }
}
function animate(){
    //
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    
    //Game
    handleGameGrid();
    handlePowerUp();
    handleDefenders();
    handleProjectiles();
    handleEnemies();
    handleGameStatus();

    //End game cycle
    frame++;
    if (!gameOver && score < winningScore){
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

windows.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
});