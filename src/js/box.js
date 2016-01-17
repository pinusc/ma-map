function Box(parentBox, x, y, text){
    this.children = [];
    this.parentBox = parentBox;

    this.properties = {
        "color": "red",
        "stroke": "#000000",
        "text": text || "Lorem Ipsum",
        "x": x || 0,
        "y": y || 0,
        "height": 50,
        "width": 100,
        "arrow": null
    };
    this.shape = new createjs.Shape();

    this.redraw();
    // new createjs.Shape(this.shape.graphics).graphics.beginFill("red").drawCircle(10, 10, 20);
    stage.addChild(this.shape);
    stage.update();

    this.shape.addEventListener("click", handleClick);
    that = this;
    function handleClick(event){
        that.addChild("asd asd");
    }
}

/**
 * Redraw the Box only
 *
 */
Box.prototype.redraw = function(){
    var p = this.properties;
    var s = this.shape;
    s.graphics.clear();  // we need to redraw everything
    s.x = p.x;
    s.y = p.y;
    this.updateArrow();
    s.graphics.beginFill(p.color);
    s.graphics.beginStroke(p.stroke);
    s.graphics.drawRect(0, 0, p.width, p.height);
    stage.setChildIndex(s, stage.getNumChildren()-1);
    stage.update();
};

/**
 * Redraws the box and every child
 *
 */
Box.prototype.update = function() {
    this.redraw();
    for (var i = 0, len = this.children.length; i < len; i++) {
        this.children.redraw();
    }
};

Box.prototype.addChild = function(text){
    child = new Box(this, this.shape.x - 150, this.shape.y + 100, text);

    this.children.push(child);
};

Box.prototype.updateArrow = function() {
    if (! this.parentBox) return;  // first box doesn't have an arrow

    this.arrow = new createjs.Shape();
    var g = this.arrow.graphics;
    this.arrow.x = this.shape.x;
    this.arrow.y = this.shape.y;

    var p1 = this.parentBox.getCenter();
    var p2 = this.getCenter();
    var line = LineBetween(p2, p1);

    var p3 = new Point();
    p3.y = this.properties.y;
    p3.x = line.getX(p3.y);

    var p4 = new Point();
    p4.y = this.parentBox.properties.y + this.parentBox.properties.height;
    p4.x = line.getX(p4.y);
    p4 = this.parentBox.getCenter();

    var segment = new Segment(p3, p4);
    segment.draw(this.arrow);
    this.parentBox.redraw();
    // line.draw();
};

Box.prototype.getCenter = function() {
    var x = this.properties.x + this.properties.width / 2;
    var y = this.properties.y + this.properties.height/ 2;
    return new Point(x, y);
};
