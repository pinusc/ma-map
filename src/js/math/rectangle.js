/**
 * p1-----p2
 *  |      |
 *  |      |
 * p3.----p4
 *
 * if center === true, the coordinates are not calculated from p1
 * but with respect to the center of the rectangle
 *
 */
function Rectangle(p, width, height, center){
    if (center) {
        p = new Point(p.x - width / 2, p.y - height / 2);
    }
    this.p1 = p;
    this.p2 = new Point(p.x + width, p.y);
    this.p3 = new Point(p.x + height, p.y + height);
    this.p4 = new Point(p.x + width, p.y + height);
}

Rectangle.prototype.getWidth = function(){
    return this.p2.x - this.p1.x;
};

Rectangle.prototype.getHeight = function(){
    return this.p3.y - this.p1.y;
};

Rectangle.prototype.getCenter = function(){
    return new Point((this.p1.x + this.p4.x)/2, (this.p1.y + this.p4.y)/2);
};

Rectangle.prototype.overlap = function(r2) {
   return (this.p1.x <= r2.p4.x && this.p4.x >= r2.p1.x && this.p1.y <= r2.p4.y && this.p4.y >= r2.p1.y);
};



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
    // TODO: create Rectangle.getCenter()
    
    // t_slope is the slope of the rectangle siagonal
    var t_slope = this.getHeight() / this.getWidth();
    // c_slope is the slope of the line connecting the centers of rectangles
    var c_slope = Math.abs(rcenter.y - tcenter.y) / 
         Math.abs(rcenter.x - tcenter.x);

    var dir;
    if (c_slope < t_slope) {  // horizontal
       dir = 2;
       if (tcenter.x > rcenter.x) {
           dir += 2;
       }
    } else {  // vertical
       dir = 1;
       if (tcenter.y > rcenter.y) {
           dir += 2;
       }
    }
    return dir;
};
