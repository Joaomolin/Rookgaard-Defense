import { Globals, Resources } from "./globals.js";
import { Sprite } from "./sprite.js";
import { FloatingMessage } from "./floatingMessage.js";
import assets from "../assets/assets.json" assert {type: 'json'};

const powerUps = [];
const popValues = [20, 30, 40];

export class PowerUp {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.x = Math.random() * (canvas.width - Globals.cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * Globals.cellSize + Math.floor(Math.random() * 50);
        this.width = 100;
        this.height = 100;
        this.amount = popValues[Math.floor(Math.random() * popValues.length)];
        this.sprite = new Sprite(assets.Cheese);
    }
    draw() {
        this.sprite.draw(this.ctx, this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
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