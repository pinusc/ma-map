function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

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

Line.prototype.draw = function() {
    this.shape = new createjs.Shape();
    var g = this.shape.graphics;
    if (this.b) {
        p1x = 0;
        p1y = this.getY(p1x);

        p2x = window.innerWidth - 10;
        p2y = this.getY(p2x);
    } else {
        p1x = this.c;
        p1y = 0;

        p2x = this.c;
        p2y = window.innerHeight;  // TODO: adapt to worlda larger that window
    }


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


function Segment(p1, p2){
    this.p1 = p1;
    this.p2 = p2;
}

Segment.prototype.draw = function() {
    this.shape = new createjs.Shape();
    var g = this.shape.graphics;
    g.beginStroke("black");

    g.moveTo(this.p1.x, this.p1.y);
    g.lineTo(this.p2.x, this.p2.y);
    g.endStroke();

    stage.addChild(this.shape);
    stage.update();
};

