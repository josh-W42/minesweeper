/*
    This File contains all methods related to the canvas
    and drawing on the canvas.
*/

import { Box } from './classes/Box.js';
import { Mine } from './classes/Mine.js';
import { Grid } from './classes/Grid.js';

let data = null;
fetch('../data/data.json')
    .then(response => response.json())
    .catch(error => console.log('Error occured in data retrival'))
    .then(json => data = json)
    .catch(error => console.log('Error occured in data assignment'));

let grid = null;

/**
 * Sets up the game canvas.
 * @param {Number} id - The difficulty identifier. ie. 1 - Easy, 2 - Medium etc...
 */
const setupCanvas = id => {
    let canvas = document.querySelector('#canvas');
    const difficulty = data.difficulty.filter(difficulty => difficulty.id === id)[0]; // Expecting one id.
    
    canvas.width = difficulty.canvasWidth;
    canvas.height = difficulty.canvasHeight;
    canvas.classList.remove('hidden');
    
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        const n_row = difficulty.blocksPerRow;
        const n_column = difficulty.blocksPerColumn;
        const rectW = difficulty.blockWidth;
        const rectH = difficulty.blockHeight;

        grid = new Grid(n_row, n_column);
        grid.fillRandomCordinates(difficulty.minimumMines, difficulty.mineMultiplier);
    
        for (let i = 0; i < n_column; i++) {
            for (let j = 0; j < n_row; j++) {
                let box = null;
                if (grid.array[j][i]) {
                    box = new Mine(rectW * j, rectH * i, rectW, rectH);
                } else {
                    box = new Box(rectW * j, rectH * i, rectW, rectH);
                }
                box.draw(ctx);
            }
        }
    }
}

export { setupCanvas };