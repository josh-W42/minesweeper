/*
    This File contains all methods related to the canvas
    and drawing on the canvas.
*/

import { Rectangle } from './classes/Rectangle.js';

const setupCanvas = n => {
    let canvas = document.querySelector('#canvas');
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        const rectW = 50;
        const rectH = 50;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                ctx.fillStyle = 'grey';
                ctx.fillRect(rectW * j, rectH * i, rectW, rectH);
            }
        }
    }
}

export { setupCanvas };