'use strict';

import { startGame } from "./modules/Engine.js"

const main = () => {
    let selectedDifficulty = null;
    // Define common tags now to reduce costly calls with querySelector.
    const playButton = document.querySelector('#starterSection .playBtn');
    const customSection = document.querySelector("#customSection");
    const starterSection = document.querySelector('#starterSection');
    const allCustomSliders = document.querySelectorAll('#customSection .displayDiv .sliderInput');
    const allCustomNumInput = document.querySelectorAll('#customSection .displayDiv .numberInput');
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
            allCustomSliders.forEach(btn => btn.disabled = false);
            customSection.classList.add('hidden');

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
        // Remove Game Screen
        document.querySelector('#gameSection').classList.toggle('hidden');
        starterSection.classList.toggle('hidden');
    });

    // Custom Section Functionalty
    for (let i = 0; i < allCustomNumInput.length; i++) {
        const numField = document.querySelector(`#customSection .numberInput[name=${allCustomSliders[i].name}]`);
        allCustomSliders[i].addEventListener('input', e => {
            numField.value = e.target.value;
        });
        const sliderField = document.querySelector(`#customSection .sliderInput[name=${allCustomNumInput[i].name}]`);
        allCustomNumInput[i].addEventListener('input', e => {
            sliderField.value = e.target.value;
        });
    }
    customCheckBox.addEventListener('change', e => {
        if (e.target.checked) {
            for (let i = 0; i < allCustomNumInput.length; i++) {
                allCustomNumInput[i].disabled = true;
                allCustomSliders[i].disabled = true;
            }
            playButton.disabled = false;
        } else {
            for (let i = 0; i < allCustomNumInput.length; i++) {
                allCustomNumInput[i].disabled = false;
                allCustomSliders[i].disabled = false;
            }
            playButton.disabled = true;
        }
    });
}

main();