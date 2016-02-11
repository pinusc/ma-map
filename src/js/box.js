function Box(parentBox, obj, text){
    this.children = [];
    this.parentBox = parentBox;
    var x = 0, y = 0, width = 150, height = 100;

    if (obj.rect){
        x = obj.rect.p1.x;
        y = obj.rect.p1.y;
        width = obj.rect.getWidth();
        height = obj.rect.getHeight();
    }

    this.properties = {
        "color": "red",
        "stroke": "#000000",
        "text": text || "Lorem Ipsum",
        "x": x || 0,
        "y": y || 0,
        "height": height,
        "width": width,
        "arrow": null
    };
    this.shape = new createjs.Shape();

    // new createjs.Shape(this.shape.graphics).graphics.beginFill("red").drawCircle(10, 10, 20);
    this.initializeInput();
    world.addChild(this.shape);
    draw(this, true);
}

Box.prototype.updateProperties = function (arg) {
    if (! arg) return;
    if (arg.properties) {
        _.extend(this.properties, arg.properties);
    }

    if (arg.rect) {
        this.properties.x = arg.rect.p1.x;
        this.properties.y = arg.rect.p2.y;
        this.properties.width = arg.rect.getWidth();
        this.properties.height = arg.rect.getHeight();
    }
};

Box.prototype.getRectangle = function(){
    return new Rectangle(new Point(this.properties.x, this.properties.y),
            this.properties.width,
            this.properties.height);
};

Box.prototype.initializeInput = function(){
    var that = this;
    var pressmove = function (evt) {
        that.properties.x = evt.stageX;
        that.properties.y = evt.stageY;
        that.update();
    };

    var offset = new createjs.Point();
	function startDrag(evt) {
		offset.x = stage.mouseX - that.properties.x ;
		offset.y = stage.mouseY - that.properties.y ;
	}
	function doDrag(evt) {
		// that.properties.x = evt.stageX - offset.x;
		// that.properties.y = evt.stageY - offset.y;
        that.properties.x = evt.stageX - offset.x;
        that.properties.y = evt.stageY - offset.y;
        that.update();
	}

    var dclick = function (evt) {
        // console.log(evt.target);
        that.addChild(that.children.length);
    };
    // this.shape.addEventListener("click", handleClick);
    this.shape.on("mousedown", startDrag);
    this.shape.on("pressmove", doDrag);
    this.shape.on("dblclick", dclick);
};

/**
 * Redraw the Box only
 *
 */
Box.prototype.redraw = function(arg){
    throw new Exception("Unsupported");
};

/**
 * Redraws the box and every child
 *
 */
Box.prototype.update = function(arg) {
    draw(this, true, arg);
    for (var i = 0, len = this.children.length; i < len; i++) {
        draw(this.children[i]);
    }
    stage.update();
};

/** Draws like this:
 * the distance is the distance between the radius
 *
 *      +---------+
 *      !parent   |
 *    -------+    |
 *   angle  /     |
 *      +--/------+
 *        /
 *+------o--+
 *!child/   |
 *!    +    |
 *!         |
 *+---------+
 *
 *
 */
Box.prototype.addChild = function(text, angle, distance){
    angle = angle || 90;
    distance = distance || 100;
    var t_rect = new Rectangle(new Point(this.properties.x, this.properties.y),
            this.properties.width,
            this.properties.height);
    p2 = t_rect.getCenter().findPointOnCircle(distance, angle);
    var c_rect = new Rectangle(p2, this.properties.width, this.properties.height, true);
    child = new Box(this, {rect: c_rect}, text);
    this.children.push(child);
    this.balanceChildren();
};

Box.prototype.balanceChildren = function() {
    var phi = 1.61803398874989;
    var angle = 90 / (phi + 1);
    angle = 0;
    var pitch = (180 - 2 * angle) / (this.children.length + 1);

    var t_rect = new Rectangle(new Point(this.properties.x, this.properties.y),
            this.properties.width,
            this.properties.height);
    var t_center = t_rect.getCenter();

    var distance = 100;
    for (var i = 0; i < this.children.length; i++){
        distance = 100;
        var p2 = t_center.findPointOnCircle(distance, angle + (i + 1) * pitch);
        var c_rect = new Rectangle(p2, this.properties.width, this.properties.height, true);

        if (c_rect.overlap(this.getRectangle())){
            distance += this.properties.height;
            p2 = t_center.findPointOnCircle(distance, angle + (i + 1) * pitch);
            c_rect = new Rectangle(p2, this.properties.width, this.properties.height, true);
        }
        for (var u = 0; u < i; u++){
            if (c_rect.overlap(this.children[u].getRectangle())){
                distance += 10;
                u = -1;
                p2 = t_center.findPointOnCircle(distance, angle + (i + 1) * pitch);
                c_rect = new Rectangle(p2, this.properties.width, this.properties.height, true);
            }
        }
        this.children[i].update({rect: c_rect});
    }
};

Box.prototype.updateArrow = function() {
    if (! this.parentBox) return;  // first box doesn't have an arrow

    if (this.arrow){
        this.arrow.graphics.clear();
        world.removeChild(this.arrow.segment.shape);
        world.removeChild(this.arrow.p1.shape);
        world.removeChild(this.arrow.p2.shape);

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

    var p1 = new Point();
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

    draw(p1);
    var p2 = this.parentBox.getCenter();

    this.arrow.segment = new Segment(p1, p2);
    draw(this.arrow.segment);
    draw(this.parentBox);
    draw(p2);

    this.arrow.p1 = p1;
    this.arrow.p2 = p2;
};

Box.prototype.getCenter = function() {
    var x = this.properties.x + this.properties.width / 2;
    var y = this.properties.y + this.properties.height/ 2;
    return new Point(x, y);
};
