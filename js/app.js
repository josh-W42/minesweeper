'use strict';

import { startGame } from "./modules/Engine.js"

const main = () => {
    let selectedDifficulty = null;

    document.querySelectorAll('#starterSection .difficultyBtn').forEach(el => {
        el.addEventListener('click', e => {
            // Get the difficulty selected.
            selectedDifficulty = Number(e.target.dataset.difficulty);
            if (document.querySelectorAll('.active').length > 0) {
                document.querySelectorAll('.active').forEach(btn => btn.classList.toggle('active'));
            }
            e.target.classList.toggle('active');

            // Unlock play button.
            document.querySelector('#starterSection .playBtn').disabled = false;
        });
    });
    
    document.querySelector('#starterSection .playBtn').addEventListener('click', e => {
        if (selectedDifficulty !== null) {
            startGame(selectedDifficulty);
            // Reset the starterSection
            document.querySelector('#starterSection').classList.toggle('hidden');
            document.querySelector('#starterSection .active').classList.toggle('active');
            document.querySelector('#starterSection .playBtn').disabled = true;

        }
    });

    document.querySelector('#gameOverSection .playBtn').addEventListener('click', e => {
        document.querySelector('#gameOverSection').classList.toggle('hidden');
        document.querySelector('#starterSection').classList.toggle('hidden');
    });
    
}

/* 
    Implement local saves later
    const hasOldGameSave = () => {}
*/


main();