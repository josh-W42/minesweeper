/* 
    The Engine holds game data and the logic
    that starts and stops the game.
*/
import { setupCanvas, canvasClickCallback } from "./canvas.js";

let intervalId = null;
let difficultyId = null;

/**
 * Runs processes to begin the game.
 * @param {Number} id - Difficulty Identifier.
 */
const startGame = id => {
    difficultyId = id;
    document.querySelector('#gameSection').classList.toggle('hidden');
    intervalId = startTimer();
    console.log(window.localStorage);
    setupCanvas(id);
}

/**
 * Runs all processes when the game has ended.
 * @param {Boolean} hasWonGame - True if the player has found all boxes. False if they opened a mine.
 */
const endGame = hasWonGame => {
    // Stop the timer.
    clearInterval(intervalId);

    // Get Time information. Display if win.
    configEndDisplay(hasWonGame);

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
        timeDisplay.textContent = `${currentTime.getHours() - 16}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    }, 500);
}

const getBestTime = () => {
    let minTime = {hours: 24, minutes: 60, seconds: 60};
    for (let jsonString of Object.values(window.localStorage)) {
        let obj = JSON.parse(jsonString);
        if (obj.id === difficultyId) {
            const timeSplit = obj.time.split(":");
            if (timeSplit[0] <= minTime.hours &&
                 timeSplit[1] <= minTime.minutes &&
                 timeSplit[2] < minTime.seconds) {

                minTime = {hours: timeSplit[0], minutes: timeSplit[1], seconds: timeSplit[2]};
            }
        }
    }
    return minTime.hours === 24 ? null : `${minTime.hours}:${minTime.minutes}:${minTime.seconds}`;
}

const configEndDisplay = didWin => {
    let gameTimer = document.querySelector('#gameSection .timeDisplay');
    if (didWin) {
        document.querySelector('#gameOverSection .sectionTitle').textContent = 'You Won!';
        window.localStorage.setItem(Date.now().toString(), JSON.stringify({id: difficultyId, time: gameTimer.textContent}));
    } else {
        document.querySelector('#gameOverSection .sectionTitle').textContent = 'Game Over';
    }
    let bestTime = getBestTime() || 'You have to win first!';
    if (didWin && bestTime === gameTimer.textContent) {
        document.querySelector('#newRecord').classList.remove('hidden');
    } else {
        document.querySelector('#newRecord').classList.add('hidden');
    }
    document.querySelector('#gameOverSection .timeDisplay').textContent = gameTimer.textContent;
    document.querySelector('#gameOverSection .bestDisplay').textContent = bestTime;
    gameTimer.textContent = '0:0:0';
}

export { startGame, endGame };