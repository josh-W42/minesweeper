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
let ctx = null;

/**
 * Sets up the game canvas.
 * @param {Number} id - The difficulty identifier. ie. 1 - Easy, 2 - Medium etc...
 */
const setupCanvas = id => {
    let canvas = document.querySelector('#canvas');
    let difficulty = data.difficulty.filter(difficulty => difficulty.id === id)[0]; // Expecting one id.

    // Custom Config
    if (difficulty.id === 4) {
        difficulty = configCustomData();
    }

    canvas.width = difficulty.canvasWidth;
    canvas.height = difficulty.canvasHeight;

    document.querySelector('#gameSection .flagDisplay').textContent = difficulty.flags;
    
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        const n_row = difficulty.blocksPerRow;
        const n_column = difficulty.blocksPerColumn;

        const rectW = difficulty.blockWidth;
        const rectH = difficulty.blockHeight;
        
        grid = new Grid(n_row, n_column, ctx, difficulty.flags);
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

        // Add events to register clicks on the canvas.
        canvas.addEventListener('click', canvasClickCallback);
        canvas.addEventListener('contextmenu', canvasClickCallback);
    }
}

const canvasClickCallback = e => {
    let boundaries = canvas.getBoundingClientRect();
    
    // By using the mouse's x and y cordinates relative to the window,
    //      we can approximate the x and y indicies of the specific box
    //      within the grid that was clicked.
    
    // block width and height should be constant across difficulties
    let index_x = Math.floor((e.clientX - boundaries.left) / data.difficulty[0].blockWidth);
    let index_y = Math.floor((e.clientY - boundaries.top) / data.difficulty[0].blockHeight);
    
    // Left mouse button has id of 0. Other ids will map to flag usage.
    if (e.buttons === 0) {
        grid.cascadingOpen(index_x, index_y);
    } else {
        // Prevent the context menu from opening.
        e.preventDefault();
        // Use a flag.
        let box = grid.array[index_x][index_y];
        let flagDisplay = document.querySelector('#gameSection .flagDisplay');
        if (!box.hasOpened) {
            if (box.isFlagged) {
                box.isFlagged = false;
                flagDisplay.textContent = Number(flagDisplay.textContent) + 1;
            } else if (Number(flagDisplay.textContent) > 0) {
                box.isFlagged = true;
                flagDisplay.textContent = Number(flagDisplay.textContent) - 1;
            }
            box.draw(ctx);
        }
    }
}

const configCustomData = () => {
    const n_columns = document.querySelector('#customSection input[name=width]').value;
    const n_rows = document.querySelector('#customSection input[name=height]').value;
    const n_flags = document.querySelector('#customSection input[name=flags]').value;
    const mineMultiplier = document.querySelector('#customSection input[name=mines]').value;

    return {
        "id": 4,
        "name": "CUSTOM",
        "blocksPerRow": Number(n_columns),
        "blocksPerColumn": Number(n_rows),
        "blockWidth": 50,
        "blockHeight": 50,
        "canvasWidth": (Number(n_columns) * 50),
        "canvasHeight": (Number(n_rows) * 50),
        "flags": Number(n_flags),
        "mineMultiplier": Number(mineMultiplier),
        "minimumMines": 0
    }
}

export { setupCanvas, canvasClickCallback };