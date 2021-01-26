/* 
    The Engine holds game data and the logic
    that starts and stops the game.
*/
import { setupCanvas, canvasClickCallback } from "./canvas.js";

let intervalId = null;

/**
 * Runs processes to begin the game.
 * @param {Number} id - Difficulty Identifier.
 */
const startGame = id => {
    document.querySelector('#gameSection').classList.toggle('hidden');
    intervalId = startTimer();
    setupCanvas(id);
}

/**
 * Runs all processes when the game has ended.
 * @param {Boolean} hasWonGame - True if the player has found all boxes. False if they opened a mine.
 */
const endGame = hasWonGame => {
    clearInterval(intervalId);

    if (hasWonGame) {
        document.querySelector('#gameOverSection .sectionTitle').textContent = 'You Won!';
    } else {
        document.querySelector('#gameOverSection .sectionTitle').textContent = 'Game Over';
    }
    // Transfer Time data and reset.
    let gameTimer = document.querySelector('#gameSection .timeDisplay');
    document.querySelector('#gameOverSection .timeDisplay').textContent = gameTimer.textContent;
    gameTimer.textContent = '0:0';

    // Remove The Listener On Canvas.
    document.querySelector('#canvas').removeEventListener('mouseup', canvasClickCallback);

    // Remove Game Screen
    document.querySelector('#gameSection').classList.toggle('hidden');

    // Display End Game Content
    document.querySelector('#gameOverSection').classList.toggle('hidden');
}

const startTimer = () => {
    let startTime = Date.now();
    let timeDisplay = document.querySelector('#gameSection .timeDisplay');
    timeDisplay.textDisplay = '00:00:00';
    return setInterval(() => {
        let currentTime = Date.now();
        currentTime = new Date(currentTime - startTime);
        timeDisplay.textContent = `${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    }, 500);
}

export { startGame, endGame };