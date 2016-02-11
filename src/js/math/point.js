function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

Point.prototype.draw = function(graphics) {
    draw(this, true);
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

