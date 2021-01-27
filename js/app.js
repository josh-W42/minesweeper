'use strict';

import { startGame } from "./modules/Engine.js"

const main = () => {
    let selectedDifficulty = null;
    // Define common tags now to reduce costly calls with querySelector.
    const playButton = document.querySelector('#starterSection .playBtn');
    const customSection = document.querySelector("#customSection");
    const starterSection = document.querySelector('#starterSection');
    const allCustomSliders = document.querySelectorAll('#customSection .displayDiv input');
    const customCheckBox = document.querySelector('#confirmBox');

    document.querySelectorAll('#starterSection .difficultyBtn').forEach(el => {
        el.addEventListener('click', e => {
            // Get the difficulty selected.
            selectedDifficulty = Number(e.target.dataset.difficulty);
            const allActiveBtns = document.querySelectorAll('.active');

            // Clear any other active buttons
            if (allActiveBtns.length > 0) {
                allActiveBtns.forEach(btn => btn.classList.toggle('active'));
            }
            e.target.classList.toggle('active');

            // If player selects custom, the play button must remain disabled.
            if (selectedDifficulty === 4) {
                playButton.disabled = true;
                customSection.classList.toggle('hidden');
            } else {
                customSection.classList.add('hidden');

                // Unlock play button.
                playButton.disabled = false;
            }
        });
    });
    
    // Clear Starter Screen, Start Game
    playButton.addEventListener('click', e => {
        if (selectedDifficulty !== null) {
            startGame(selectedDifficulty);
            document.querySelector('#gameSection').classList.toggle('hidden');

            // Reset the starterSection
            starterSection.classList.toggle('hidden');
            document.querySelector('#starterSection .active').classList.toggle('active');
            playButton.disabled = true;
            customCheckBox.checked = false;
        }
    });

    // Restart the Game
    document.querySelector('#gameOverSection .playBtn').addEventListener('click', e => {
        document.querySelector('#gameOverSection').classList.toggle('hidden');
        starterSection.classList.toggle('hidden');
    });

    // Custom Section Functionalty
    allCustomSliders.forEach(inputField => {
        const outputField = document.querySelector(`#customSection output[for=${inputField.name}]`);
        inputField.addEventListener('input', e => {
            outputField.textContent = e.target.value;
        });
    });
    customCheckBox.addEventListener('change', e => {
        if (e.target.checked) {
            allCustomSliders.forEach(inputField => {
                inputField.disabled = true;
            });
            playButton.disabled = false;
        } else {
            allCustomSliders.forEach(inputField => {
                inputField.disabled = false;
            });
            playButton.disabled = true;
        }
    });

}

main();