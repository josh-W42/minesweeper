import { Box } from "./Box.js";
import { endGame } from '../Engine.js';

class Mine extends Box {
    constructor(x, y, width, height, animationSpeed) {
        super(x, y, width, height, animationSpeed);
        this.isMine = true;
    }
    /**
     * Opens a mine, resulting in the end of the game.
     * @param {Object} context - The context of the canvas.
     */
    open = function(context = undefined) {
        endGame(false);
    }

    /**
     * Reveal the mine for visual purposes.
     * @param {Object} context - The context of the canvas.
     */
    reveal = function(context = undefined) {
        let alpha = this.animateSpeed <= 1 ? 1 : 0;
        let id = setInterval(() => {
            if (alpha <= 1) {
                context.drawImage(document.querySelector('#explosionimg'), this.x + 5, this.y + 5, (this.width / 1.25), (this.height / 1.25));
                alpha += 0.1;
            } else {
                clearInterval(id);
            }
        }, this.animateSpeed);
    }
}

export { Mine };