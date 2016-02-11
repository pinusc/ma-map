function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

Point.prototype.draw = function(graphics) {
    if (graphics) {
        this.shape = new createjs.Shape();
    } else {
        this.shape = new createjs.Shape(graphics);
    }
    var g = this.shape.graphics;

    g.beginFill("black");

    g.drawCircle(this.x, this.y, 5);

    world.addChild(this.shape);
    stage.update();
};

/**    this
 * _______.
 *     \  \ radius = 3
 *      x--\
 *  angle   \
 *           .
 *
 *
 */
Point.prototype.findPointOnCircle = function(radius, angle) {
    var p2 = new Point();
    // angle = 180 - angle;
    angle = Math.PI * angle / 180; // convert to radians
    p2.x = this.x - Math.cos(angle) * radius;
    p2.y = this.y + Math.sin(angle) * radius;
    return p2;
};

