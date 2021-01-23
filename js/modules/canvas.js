/*
    This File contains all methods related to the canvas
    and drawing on the canvas.
*/


/*
    Breakthrough in logic:
        When opening up boxes, you have to open every box that is "open" or not bordering a mine
        and stop in a direction when you open a box that is bordering a mine
*/

import { Rectangle } from './classes/Rectangle.js';

let data = null;
fetch('../data/data.json')
    .then(response => response.json())
    .catch(error => console.log('Error occured in data retrival'))
    .then(json => data = json)
    .catch(error => console.log('Error occured in data assignment'));

    // Make all boxes, randomly choose some to be mines then search?
    // MY best implementation is to use a graph, but idk how...

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

        for (let i = 0; i < n_column; i++) {
            for (let j = 0; j < n_row; j++) {
                // Choose random squares to be mines.
                // if (Math.floor(Math.random() * n);
                let box = new Rectangle(rectW * j, rectH * i, rectW, rectH);
                box.draw(ctx);
            }
        }
    }
}

export { setupCanvas };