/* 
    The Engine holds game data and the logic
    that starts and stops the game.
*/
import { setupCanvas } from "./canvas.js";

/**
 * Runs processes to begin the game.
 * @param {Number} id - Difficulty Identifier.
 */
const startGame = id => {
    setupCanvas(id);
}

/**
 * Runs all processes when the game has ended.
 */
const endGame = () => {
    console.log('Game Over');
}

/**
 * Sets up end game sceen for a player win state.
 */
const playerWin = () => {
    console.log('Win');
}

/**
 * Sets up end game sceen for a player lose state.
 */
const playerLost = () => {
    console.log('Lost');
}

export { startGame, endGame };