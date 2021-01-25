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

    // Remove Grid
    document.querySelector('#canvas').classList.toggle('hidden');

    // Display End Game Content
    document.querySelector('#gameOverSection').classList.toggle('hidden');
}

export { startGame, endGame };