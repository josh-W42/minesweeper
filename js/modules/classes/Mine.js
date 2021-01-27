import { Box } from "./Box.js";
import { endGame } from '../Engine.js';

class Mine extends Box {
    constructor(x, y, width, height) {
        super(x, y, width, height);
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
        context.fillStyle = 'red';
        context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);        
    }
}

export { Mine };