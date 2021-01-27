import { Box } from "./Box.js";
import { endGame } from '../Engine.js';

class Mine extends Box {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.isMine = true;
    }

    open = function(context = undefined) {
        endGame(false);
    }

    reveal = function(context = undefined) {
        context.fillStyle = 'red';
        context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);        
    }
}

export { Mine };