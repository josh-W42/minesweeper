import { endGame } from "../Engine.js";

class Grid {
    /**
     * Defines 2D array with x rows and y columns.
     * @param {Number} width - The width of the grid.
     * @param {Number} height - The height of the grid.
     */
    constructor(width, height, context, flags) {
        this.width = width;
        this.height = height;
        this.array = this.makeGrid();
        this.n_mines = 0;
        this.n_boxes = 0;
        this.revealedBoxes = new Set();
        this.context = context;
        this.hasGameEnded = false;
        this.animationVariation = 1;
        this.animationSpeedModifier = 1;
    }

    /**
     * Fills the grid with a 2D array.
     */
    makeGrid() {
        let array = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            array[i] = new Array(this.height);
        }
        return array;
    }

    /**
     * Generates random cordinates in the grid.
     * @param {Number} min_values - The minimum number of random cordinates.
     * @param {Number} multiplier - Range [1.0 - 0.0], Likelihood for more random cordiantes to appear in the grid.
     * @param {Number} max_x - The max width to be randomized, usually, the width of the grid.
     * @param {Number} max_y - The max height to be randomized, usually, the height of the grid.
     */
    fillRandomCordinates(min_values, multiplier = 0, max_x = this.width, max_y = this.height) {
        // multiplier edge case checks
        multiplier = multiplier > 1.0 ? 1.0 : multiplier;
        multiplier = multiplier < 0 ? 0 : multiplier;

        // Just in case the user wants to be funny.
        min_values = min_values > (this.width * this.height) ? (this.width * this.height) : min_values;

        const n_values = Math.floor(Math.random() * (max_x + max_y)) + min_values;
        const cycles = n_values + Math.floor(n_values * multiplier);

        // Duplicate Detection
        let set = new Set();

        for (let i = 0; i < cycles; i++) {
            // Custom infinite loop prevention.
            if (isNaN(cycles)) {
                break;
                alert("The input provided has triggered an error, please refresh the page.");
            }

            let x = Math.floor(Math.random() * max_x);
            let y = Math.floor(Math.random() * max_y);

            while (set.has(`${x}${y}`)) {
                x = Math.floor(Math.random() * max_x);
                y = Math.floor(Math.random() * max_y);
            }
            set.add(`${x}${y}`);

            // Edge Case Detection
            x = x >= this.width ? this.width - 1 : x;
            y = y >= this.height ? this.height - 1: y;

            this.array[x][y] = true;
            this.n_mines++;
        }
        this.n_boxes = (this.width * this.height) - this.n_mines;
    }

    /**
     * A recusive function that is called when a box is clicked on the canvas. Will open other boxes under right conditions.
     * @param {Number} i - The Horizontal index of the box that has been clicked.
     * @param {Number} j - The Vertical index of the box that has been clicked.
     */
    cascadingOpen(i, j) {
        // First determine box type.
        if (this.array[i][j].isMine && !this.array[i][j].isFlagged) {
            this.displayAll();
            this.array[i][j].open();
            // This will end the game.
        } else if (!(this.revealedBoxes.has(`${i}, ${j}`)) && !this.array[i][j].isFlagged) {
            this.revealedBoxes.add(`${i}, ${j}`);
            // Before any other computation, check if the player has won.
            if (this.checkWinConditions() && !this.hasGameEnded) {
                endGame(true);
                this.displayAll();
            }
            /*
                For Reference, this is the order of the positions.
                Top Left Corner
                Top Center  
                Top Right Corner
                Center Left
                Center Right
                Bottom Left
                Bottom Center
                Bottom Right
            */
            this.positions = [
               {x: i - 1, y: j - 1},
               {x: i, y: j - 1},
               {x: i + 1, y: j - 1},
               {x: i - 1, y: j},
               {x: i + 1, y: j},
               {x: i - 1, y: j + 1},
               {x: i, y: j + 1},
               {x: i + 1, y: j + 1}
            ];
            // Determine if surrounded by mines.
            let surroundingMines = 0;
            
            let nextPositions = [];
            
            for (let k = 0; k < this.positions.length; k++) {
                const position = this.positions[k];
                
                if (position.x < 0 || position.x === this.width ||
                    position.y < 0 || position.y === this.height) {
                        continue;
                }
                let box = this.array[position.x][position.y];
                let setTest = this.revealedBoxes.has(`${position.x}, ${position.y}`);
                    
                if (!box.isMine && !setTest) {
                    nextPositions.push(position);
                } else if (box.isMine) {
                    surroundingMines++;
                }
            }
            
            if (surroundingMines > 0) {
                // Don't call cascading open on other boxes.
                // Reveal just the number of mines.
                this.array[i][j].surroundingMines = surroundingMines;
                setTimeout(() => {
                    this.array[i][j].open(this.context);
                }, Math.floor(Math.random() * this.animationVariation) * this.animationSpeedModifier);
            } else {
                setTimeout(() => {
                    this.array[i][j].open(this.context);
                }, Math.floor(Math.random() * this.animationVariation) * this.animationSpeedModifier);
                // Call cascadingOpen on other surrounding boxes.
                for (let position of nextPositions) {
                    this.cascadingOpen(position.x, position.y);
                }
            }    
        }
    }

    /**
     * Checks if the player has won the game.
     */
    checkWinConditions() {
        return this.revealedBoxes.size === this.n_boxes;
    }

    /**
     * Displays all boxes and mines. Used at the end of the game.
     */
    displayAll() {
        this.hasGameEnded = true;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.array[i][j].isMine && !this.array[i][j].isFlagged) {
                    this.array[i][j].reveal(this.context);
                } else if (!this.array[i][j].hasOpened) {
                    this.cascadingOpen(i, j);
                }
            }
        }
    }

    configAnimations(variation, speed) {
        this.animationVariation = Math.ceil(variation / 50);
        this.animationSpeedModifier = Math.ceil(speed / 100);
    }
}

export { Grid };