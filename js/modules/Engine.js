/* 
    The Engine starts and stops the game if the win conditions are met.
*/
import { setupCanvas } from "./canvas.js";

const startGame = () => {
    setupCanvas(10);
}

export { startGame };