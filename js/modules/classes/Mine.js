import { Rectangle } from "./Rectangle.js";

class Mine extends Rectangle {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.image = '';
    }
}

export { Mine };