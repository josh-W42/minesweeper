class Grid {
    /**
     * Defines 2D array with x rows and y columns.
     * @param {Number} width - The width of the grid.
     * @param {Number} height - The height of the grid.
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.array = this.makeGrid();
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

        const n_values = Math.floor(Math.random() * (max_x + max_y)) + min_values;
        const cycles = n_values + Math.floor(n_values * multiplier);

        for (let i = 0; i < cycles; i++) {
            let x = Math.floor(Math.random() * max_x);
            let y = Math.floor(Math.random() * max_y);
            console.log(max_x, max_y);

            // Edge Case Detection
            x = x >= this.width ? this.width - 1 : x;
            y = y >= this.height ? this.height - 1: y;

            this.array[x][y] = true;
        }
    }
}

export { Grid };