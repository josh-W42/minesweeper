'use strict';

import { startGame } from "./modules/Engine.js"

const main = () => {
    let selectedDifficulty = null;
    document.querySelectorAll('#starterSection .difficultyBtn').forEach(el => {
        el.addEventListener('click', e => {
            // Get the difficulty selected.
            selectedDifficulty = Number(e.target.dataset.difficulty);
            e.target.classList.toggle('active');

            // Unlock play button.
            document.querySelector('.playBtn').disabled = false;
        })
    });
    document.querySelector('#starterSection .playBtn').addEventListener('click', e => {
        if (selectedDifficulty !== null) {
            startGame(selectedDifficulty);
            document.querySelector('#starterSection').classList.toggle('hidden');
        }
    });
}

/* 
    Implement local saves later
    const hasOldGameSave = () => {}
*/


main();