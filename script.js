import { handleProjectiles } from "./objects/projectile.js";
import { Defender, handleDefenders } from "./objects/entity/defender.js";
import { handleEnemies } from "./objects/entity/enemy.js";
import { Globals, Resources } from "./objects/globals.js";
import { handlePowerUp } from "./objects/powerUp.js"
import { Mouse } from "./objects/mouse.js"
import { FloatingMessage } from "./objects/floatingMessage.js";
import { createInventory } from "./objects/sidebar/inventory/inventory.js";
import { Cell } from "./objects/cell.js";
import { createSkillBar } from "./objects/sidebar/skillBar.js";
import { createShop } from "./objects/sidebar/shop.js";


const canvas = document.getElementById('canvas');
const coinSlot = document.getElementById('coinSlot');
const scoreSlot = document.getElementById('scoreSlot');

const ctx = canvas.getContext('2d');
canvas.width = 1200;
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
const enemyPos = [];
//Start inventory
createInventory(document);
//Skill bar
createSkillBar(document);
//Shop
createShop(document);  


//Board
function createGrid() {
    for (let y = 0; y < canvas.height; y += Globals.cellSize) {
        for (let x = 0; x < canvas.width; x += Globals.cellSize) {
            gameGrid.push(new Cell(ctx, mouse, x, y));
        }
    }
}
createGrid();

function handleGameGrid() {
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw(collision);
    }
}

function handleFloatingMessages() {
    for (let i = 0; i < floatingMessages.length; i++) {
        floatingMessages[i].update();
        floatingMessages[i].draw();

        if (floatingMessages[i].lifespan >= 50) {
            floatingMessages.splice(i, 1);
            i--;
        }
    }
}

//Utilities
function handleGameStatus() {
    scoreSlot.textContent = Resources.score;
    coinSlot.textContent = Resources.wallet + 'g';

    if (Globals.gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '80px Tibia';
        ctx.fillText('Game Over', 400, 250);
        ctx.fillText(`Score: ${Resources.score}`, 400, 350);

    }

    if (Resources.score >= Globals.winningScore) {
        ctx.fillStyle = 'black';
        ctx.font = '80px Tibia';
        ctx.fillText('You won!', 400, 250);
        ctx.fillText(`Score: ${Resources.score}`, 400, 350);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Game
    handleGameGrid();
    handleDefenders(defenders, enemies, enemyPos, projectiles, frame, collision);
    handleProjectiles(projectiles, enemies, collision);
    handleEnemies(ctx, frame, enemies, enemyPos);
    handlePowerUp(ctx, canvas, frame, mouse, floatingMessages, collision);
    handleGameStatus();
    handleFloatingMessages();

    //End game cycle
    frame++;
    if (!Globals.gameOver && Resources.score < Globals.winningScore) {
        requestAnimationFrame(animate);
    }
}
animate();

function collision(first, second) {
    if (first.entity) {
        first = first.entity;
    }
    if (second.entity) {
        second = second.entity;
    }

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
canvas.addEventListener('click', function () {

    const gridPositionX = mouse.x - (mouse.x % Globals.cellSize) + Globals.cellGap;
    const gridPositionY = mouse.y - (mouse.y % Globals.cellSize) + Globals.cellGap;

    // for (let i = 0; i < defenders.length; i++){
    //     if (defenders[i].x === gridPositionX && defenders[i].y ===gridPositionY) return;
    // }

    let defenderCost = 100;
    if (Resources.wallet >= defenderCost) {
        Resources.wallet -= defenderCost;

        defenders.push(new Defender(ctx, gridPositionX, gridPositionY,
            Globals.cellSize - Globals.cellGap * 2,
            Globals.cellSize - Globals.cellGap * 2));
    } else {
        floatingMessages.push(new FloatingMessage(ctx, mouse.x, mouse.y, 'Out of coins', 20, 'yellow'));
    }
});

//Mouse listener
canvas.addEventListener('mousemove', function (e) {
    mouse.update();
    mouse.x = e.x - mouse.canvasPosition.left;
    mouse.y = e.y - mouse.canvasPosition.top;
});

canvas.addEventListener('mouseleave', function (e) {
    mouse.update();
    mouse.x = undefined;
    mouse.y = undefined;
});


