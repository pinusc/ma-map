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

    this.initializeInput();
}

Box.prototype.initializeInput = function(){
    that = this;
    function pressmove(evt) {
        that.properties.x = evt.stageX;
        that.properties.y = evt.stageY;
        that.redraw();
    }

    function dclick(evt) {
        that.addChild("foo");
    }
    // this.shape.addEventListener("click", handleClick);
    this.shape.addEventListener("pressmove", pressmove);
    this.shape.addEventListener("dblclick", dclick);
};

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
    child = new Box(this, this.shape.x, this.shape.y -300, text);

    this.children.push(child);
};

Box.prototype.updateArrow = function() {
    if (! this.parentBox) return;  // first box doesn't have an arrow

    if (this.arrow){
        this.arrow.graphics.clear();
        stage.removeChild(this.arrow.segment.shape);
        stage.removeChild(this.arrow.p1.shape);
        stage.removeChild(this.arrow.p2.shape);

    } else {
        this.arrow = new createjs.Shape();
    }
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
    var dir = child_rect.getDirection(parent_rect);

    p1 = new Point();
    switch (dir) {
        case 1:
            p1.y = this.properties.height;  // jshint ignore:line
        case 3:
            p1.y += this.properties.y;
            p1.x = line.getX(p1.y);
            break;
        case 2:
            p1.x = this.properties.width;  // jshint ignore:line
        case 4:
            p1.x += this.properties.x; 
            p1.y = line.getY(p1.x);
            break;
    }

    p1.draw(this.arrow.graphics);
    var p2 = this.parentBox.getCenter();
    console.log(p1, p2);

    this.arrow.segment = new Segment(p1, p2);
    this.arrow.segment.draw(this.arrow.graphics);
    // this.parentBox.redraw();
    p2.draw(this.arrow.graphics);

    this.arrow.p1 = p1;
    this.arrow.p2 = p2;
};

Box.prototype.getCenter = function() {
    var x = this.properties.x + this.properties.width / 2;
    var y = this.properties.y + this.properties.height/ 2;
    return new Point(x, y);
};
