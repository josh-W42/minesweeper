/* 
    The Engine holds game data and the logic
    that starts and stops the game.
*/
import { setupCanvas } from "./canvas.js";

const startGame = id => {
    setupCanvas(id);
}

const endGame = () => {
    console.log('Game Over');
}

const playerWin = () => {
    console.log('Win');
}

const playerLost = () => {
    console.log('Lost');
}

export { startGame, endGame };