export const Globals = {
    gameOver: false,
    winningScore: 5000,
    cellGap: 3,
    cellSize: 100,
    enemyInterval: 500,
    spriteSize: 34
}

export const Resources = {
    wallet: 600,
    score: 0,
};


export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
};