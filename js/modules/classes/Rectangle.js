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
        context.fillStyle = 'grey';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    open = function(context) {
        console.log('HI');
    }
}

export { Rectangle };