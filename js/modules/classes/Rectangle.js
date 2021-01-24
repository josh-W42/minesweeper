/*
    The Box class defines how all boxes should behave.
    Mines are sub classes of Rectangles.
*/

class Box {
    /**
     * A rectangle to be drawn on canvas.
     * @param {Number} x - x cordinate with respect to the canvas.
     * @param {Number} y - y cordinate with respect to the canvas.
     * @param {Number} width - The width of the rectangle.
     * @param {Number} height - The height of the rectangle.
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isMine = false;
    }

    /**
     * Draw the rectangle onto the canvas.
     * @param {Object} context - Often refered to as ctx for canvas.
     */
    draw = function(context) {
        // First we have to make the actual rectangle.
        context.fillStyle = 'grey';
        context.fillRect(this.x, this.y, this.width, this.height);

        // Then we have to draw the border
        context.fillStyle = "white";
        context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    }

    /**
     * Reveal the box from user click.
     * @param {Object} context - Often referted to as ctx for canvas.
     */
    open = function(context) {
        console.log('HI');
    };
}

export { Box };