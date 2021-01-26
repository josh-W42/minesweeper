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
    
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        const n_row = difficulty.blocksPerRow;
        const n_column = difficulty.blocksPerColumn;

        console.log(n_row, n_column);
        const rectW = difficulty.blockWidth;
        const rectH = difficulty.blockHeight;
        
        grid = new Grid(n_row, n_column, ctx);
        grid.fillRandomCordinates(difficulty.minimumMines, difficulty.mineMultiplier);
        
        for (let i = 0; i < n_column; i++) {
            for (let j = 0; j < n_row; j++) {
                let box = null;
                if (grid.array[j][i]) {
                    grid.array[j][i] = new Mine(rectW * j, rectH * i, rectW, rectH);
                } else {
                    grid.array[j][i] = new Box(rectW * j, rectH * i, rectW, rectH);
                }
                grid.array[j][i].draw(ctx);
            }
        }

        // Add evnets to register clicks on the canvas.
        canvas.addEventListener('mouseup', canvasClickCallback);
    }
}

const canvasClickCallback = e => {
    // Left mouse button has id of 0, right button is 2;
    if (e.button === 0) {
        let boundaries = canvas.getBoundingClientRect();
        // block width and height should be constant across difficulties
    
        // By using the mouse's x and y cordinates relative to the window,
        //      we can approximate the x and y indicies of the specific box
        //      within the grid that was clicked.
    
        let index_x = Math.floor((e.clientX - boundaries.left) / data.difficulty[0].blockWidth);
        let index_y = Math.floor((e.clientY - boundaries.top) / data.difficulty[0].blockHeight);
        
        grid.cascadingOpen(index_x, index_y);
    }
}

export { setupCanvas, canvasClickCallback };