import { Globals, Resources } from "./globals.js";
import { Sprite } from "./sprite.js";
import { FloatingMessage } from "./floatingMessage.js";

const powerUps = [];
const popValues = [20, 30, 40];

export class PowerUp {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.x = Math.random() * (canvas.width - Globals.cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * Globals.cellSize + 25;
        this.width = 50;
        this.height = 50;
        this.amount = popValues[Math.floor(Math.random() * popValues.length)];
        this.sprite = new Sprite(4);
    }
    draw() {
        this.sprite.draw(this.ctx, this.x - 10, this.y - 10, this.width + 25, this.height + 25);
    }
}

export function handlePowerUp(ctx, canvas, frame, mouse, floatingMessages, collision) {
    if (frame % 500 === 0 && Resources.score < Globals.winningScore) {
        powerUps.push(new PowerUp(ctx, canvas));
    }

    for (let i = 0; i < powerUps.length; i++) {
        powerUps[i].draw();
        if (powerUps[i] && mouse.x && mouse.y) {
            if (collision(powerUps[i], mouse)) {
                floatingMessages.push(new FloatingMessage(ctx, mouse.x, mouse.y, '+' + powerUps[i].amount, 40, 'black'));
                Resources.wallet += powerUps[i].amount;
                powerUps.splice(i, 1);
                i--;

            }
        }
    }
}