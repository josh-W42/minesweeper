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
    constructor(x, y, width, height, animateSpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isMine = false;
        this.surroundingMines = 0;
        this.isFlagged = false;
        this.hasOpened = false;
        this.animateSpeed = Math.ceil(animateSpeed / 35);
    }

    /**
     * Draw the rectangle onto the canvas.
     * @param {Object} context - Often refered to as ctx for canvas.
     */
    draw = function(context) {
        let alpha = this.animateSpeed <= 1 ? 1 : 0;
        let id = setInterval(() => {
            if (alpha <= 1) {
                // This will be the border
                context.globalAlpha = alpha;
                context.fillStyle = 'black';
                context.fillRect(this.x, this.y, this.width, this.height);
        
                // This will be the the actual rectangle.
                context.fillStyle = "white";
                context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
        
                if (this.isFlagged) {
                    context.drawImage(document.querySelector('#flagimg'), this.x + 5, this.y + 5, (this.width / 1.25), (this.height / 1.25));
                }
                alpha += 0.2;
            } else {
                clearInterval(id);
            }
        }, this.animateSpeed);
    }

    /**
     * Reveal the box from user click.
     * @param {Object} context - Often referted to as ctx for canvas.
     */
    open = function(context) {
        let alpha = this.animateSpeed <= 1 ? 1 : 0;
        let id = setInterval(() => {
            if (alpha <= 1) {
                this.hasOpened = true;
                context.globalAlpha = alpha;
                context.fillStyle = 'grey';
                context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
        
                // Draw the number if any.
                if (this.surroundingMines > 0) {
                    context.fillStyle = 'white';
                    context.font = '48px serif';
                    const adjustedX = this.x + Math.floor(this.width / 4);
                    const adjustedY = this.y + Math.floor(this.height / 1.25);
                    context.fillText(`${this.surroundingMines}`, adjustedX, adjustedY, this.width);
                }
                alpha += 0.2;
            } else {
                clearInterval(id);
            }
        }, this.animateSpeed);
    };
}

export { Box };