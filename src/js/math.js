function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

Point.prototype.draw = function(shape) {
    if (! shape) {
        this.shape = new createjs.Shape();
        shape = this.shape;
    }
    var g = shape.graphics;

    console.log(window.innerHeight);
    g.beginFill("black");

    g.drawCircle(this.x, this.y, 5);

    stage.addChild(this.shape);
    stage.update();
};

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

/**
 * p1-----p2
 *  |      |
 *  |      |
 * p3.----p4
 *
 */
function Rectangle(p, width, height){
    this.p1 = p;
    this.p2 = new Point(p.x + width, p.y);
    this.p3 = new Point(p.x + height, p.y + height);
    this.p4 = new Point(p.x + width, p.y + height);
}

/**
 * @return an integer i such as 1 <= i <= 4
 * The integer represents a direction:
 *           x
 * +----------->
 * |    3
 * |  4 . 2
 * |    1
 *y|
 * v
 *
 */
Rectangle.prototype.getDirection = function (r){
    var d = {};
    // console.log("Rectangles:", this, r);
    var rcenter = new Point((r.p1.x + r.p4.x) / 2, (r.p1.y + r.p4.y) / 2); 
    var tcenter = new Point((this.p1.x + this.p4.x) / 2, (this.p1.y + this.p4.y) / 2); 
    for (var i = 0, len = 2; i < len; i++) {
        var c = ["x", "y"][i];
        d1 = tcenter[c] - rcenter[c];
        d[c] = d1;
    }

    console.log(d);
    var result = Math.abs(d.x) > Math.abs(d.y) ? 2 : 1;
    if (Math.abs(d.x) < Math.abs(d.y)){
        if (d.x > 0){
            result += 2;
        }
    } else {
        if (d.y > 0){
            result += 2;
        }
    }
    return result;
    /*
    var d = {};
    // console.log("Rectangles:", this, r);
    for (var i = 0, len = 2; i < len; i++) {
        var c = ["x", "y"][i];
        d1 = this.p1[c] - r.p1[c];
        d2 = this.p4[c] - r.p4[c];
        console.log("c: ", c, ", d1: ", d1, ", d2: ", d2);
        // d1 = d1 > 0 ? d1 : 0;
        // d2 = d2 > 0 ? d2 : 0;

        d[c] = Math.abs(d1) < Math.abs(d2) ? d1 : d2;
    }

    console.log(d);
    var result = Math.abs(d.x) > Math.abs(d.y) ? 2 : 1;
    if (Math.abs(d.x) > Math.abs(d.y)){
        if (d.x > 0){
            result += 2;
        }
    } else {
        if (d.y > 0){
            result += 2;
        }
    }
    return result;
    */
};
