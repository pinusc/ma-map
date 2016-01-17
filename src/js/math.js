function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

/**
 * describe a line of equation 
 * y = mx + q
 * @constructor
 * @param {int} m - the angular coefficient 
 * @param {int} q
 */
function Line(m, q) {
    this.m = m || 1;
    this.q = q || 0;
}

/**
 * returns Y in function of X
 *
 */
Line.prototype.getY = function (x){
    return x * this.m + this.q;
};

Line.prototype.draw = function() {
    this.shape = new createjs.Shape();
    var g = this.shape.graphics;
    var p1x = 0;
    var p1y = this.getY(p1x);

    var p2x = window.innerWidth - 10;
    var p2y = this.getY(p2x);
    console.log(p2y);
    console.log(window.innerHeight);
    g.beginStroke("black");

    g.moveTo(p1x, p1y);
    g.lineTo(p2x, p2y);
    g.endStroke();

    stage.addChild(this.shape);
    stage.update();
};

/**
 * calculate equation of line passing between Points p1 and p2
 * using formula (y - p1.y)/(p2.y - p1.x) = (x - p1.x)/(p2.x - p1.x)
 *
 */
function LineBetween(p1, p2){
    var m = (p2.y - p1.y) / (p2.x - p1.x);
    var k = p1.y;
    var n = p1.x;
    return new Line(m, k - n*m);
}
