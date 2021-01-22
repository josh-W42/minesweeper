/*
    This File contains all methods related to the canvas
    and drawing on the canvas.
*/

import { Rectangle } from './classes/Rectangle.js';

let constants = new Map();
const EASY_DIFFICULTY_ID = 1;
const MEDIUM_DIFFICULTY_ID = 2;
const HARD_DIFFICULTY_ID = 3;

constants.set(EASY_DIFFICULTY_ID, {
    n: 10,
    width: 50,
    height: 50,
});
constants.set(MEDIUM_DIFFICULTY_ID, {
    n: 'TODO',
    width: 'TODO',
    height: 'TODO',
});
constants.set(HARD_DIFFICULTY_ID, {
    n: "TODO",
    width: "TODO",
    height: "TODO",
})


const setupCanvas = id => {
    let canvas = document.querySelector('#canvas');
    canvas.classList.remove('hidden');
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        let n = constants.get(id).n;
        let rectW = constants.get(id).width;
        let rectH = constants.get(id).height;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // Choose random squares to be mines.
                // if (Math.floor(Math.random() * n);
                let box = new Rectangle(rectW * j, rectH * i, rectW, rectH);
                box.draw(ctx);
            }
        }
    }
}

export { setupCanvas };