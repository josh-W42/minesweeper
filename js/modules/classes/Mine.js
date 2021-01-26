import { Box } from "./Box.js";
import { endGame } from '../Engine.js';

class Mine extends Box {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.isMine = true;
    }
    draw = function(context) {
        // First we have to make the actual rectangle.
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);

        // Then we have to draw the border
        context.fillStyle = "red";
        context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);

        if (this.isFlagged) {
            context.drawImage(document.querySelector('#flagimg'), this.x + 5, this.y + 5, (this.width / 1.25), (this.height / 1.25));
        }
    }
    open = function(context = undefined) {
        endGame(false);
    }
}

export { Mine };