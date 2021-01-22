/*
    The Rectangle class defines how all boxs should behave.
    Mines are sub classes of Rectangles.
*/

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw = function(context) {
        // First we have to make the actual rectangle
        context.fillStyle = 'grey';
        context.fillRect(this.x, this.y, this.width, this.height);

        // Then we have to draw the border
        context.fillStyle = "white";
        context.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
    }
    open = function(context) {
        console.log('HI');
    }
}

export { Rectangle };