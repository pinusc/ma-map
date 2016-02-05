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

    var parent_prop = this.parentBox.properties;
    var child_prop = this.properties;

    var parent_center = this.parentBox.getCenter();
    var child_center = this.getCenter();
    var line = LineBetween(parent_center, child_center);

    var parent_rect = new Rectangle(
            new Point(parent_prop.x, parent_prop.y), 
            parent_prop.width, 
            parent_prop.height);
    var child_rect = new Rectangle(
            new Point(child_prop.x, child_prop.y), 
            child_prop.width, 
            child_prop.height);

    var dir = parent_rect.getDirection(child_rect);
    var axis1 = ['y', 'x'][1 - (dir % 2)];
    var axis2 = ['y', 'x'][dir % 2];
    console.log(dir, axis1, axis2);

    var p1 = new Point();
    p1[axis1] = this.properties[axis1];
    // p1[axis2] = (axis2 === "x" ? line.getX : line.getY)(p1[axis1]);
    p1[axis2] = line["get"+axis2.toUpperCase()](p1[axis1]);
    p1.draw();
    // p1[axis2] = line.getX(p1[axis1]);

    // var p2 = new Point();
    // p2.y = this.parentBox.properties.y + this.parentBox.properties.height;
    // p2[axis2] = line.getX(p2[axis1]);
    p2 = this.parentBox.getCenter();
    console.log(p1, p2);

    var segment = new Segment(p1, p2);
    segment.draw(this.arrow);
    this.parentBox.redraw();
    p2.draw();
    // line.draw();
};

Box.prototype.getCenter = function() {
    var x = this.properties.x + this.properties.width / 2;
    var y = this.properties.y + this.properties.height/ 2;
    return new Point(x, y);
};
