/* 
    The Engine holds game data and the logic
    that starts and stops the game.
*/
import { setupCanvas, canvasClickCallback } from "./canvas.js";

/**
 * Runs processes to begin the game.
 * @param {Number} id - Difficulty Identifier.
 */
const startGame = id => {
    setupCanvas(id);
}

/**
 * Runs all processes when the game has ended.
 * @param {Boolean} hasWonGame - True if the player has found all boxes. False if they opened a mine.
 */
const endGame = hasWonGame => {
    if (hasWonGame) {
        document.querySelector('#gameOverSection .sectionTitle').textContent = 'You Won!';
    } else {
        document.querySelector('#gameOverSection .sectionTitle').textContent = 'Game Over';
    }

    document.querySelector('#canvas').removeEventListener('mouseup', canvasClickCallback);

    // Remove Grid
    document.querySelector('#canvas').classList.toggle('hidden');

    // Display End Game Content
    document.querySelector('#gameOverSection').classList.toggle('hidden');
}

export { startGame, endGame };