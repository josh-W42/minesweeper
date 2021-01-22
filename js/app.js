'use strict';

import { startGame } from "./modules/Engine.js"

const EASY_DIFFICULTY_ID = 1;
const MEDIUM_DIFFICULTY_ID = 2;
const HARD_DIFFICULTY_ID = 3;

const main = () => {
    startGame(EASY_DIFFICULTY_ID);
}


main();