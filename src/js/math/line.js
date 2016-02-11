/**
 * describe a line of equation 
 * ax + by + c = 0
 * @constructor
 */
function Line(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
}

/**
 * returns Y in function of X
 *
 */
Line.prototype.getY = function (x){
    return ((-this.a) * x + this.c) / this.b;
};


/**
 * returns X in function of Y
 *
 */
Line.prototype.getX = function (y){
    return ((-this.b) * y + this.c) / this.a;
};

/**
 * calculate equation of line passing between Points p1 and p2
 * using formula (y - p1.y)/(p2.y - p1.x) = (x - p1.x)/(p2.x - p1.x)
 */
function LineBetween(p1, p2){
    if (p1.x === p2.x) {  // line is // to y axis
        return new Line(1, 0, p1.x);
    }
    var m = (p2.y - p1.y) / (p2.x - p1.x);
    var k = p1.y;
    var n = p1.x;
    // return new Line(m, k - n*m);
    return new Line(-m, 1, (k - n*m));
}
