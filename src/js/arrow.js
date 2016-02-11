function Arrow(parentBox, childBox) {
    childBox.x = childBox.shape.x;
    childBox.y = childBox.shape.y;

    var parent_prop = parentBox.properties;
    var child_prop = childBox.properties;

    var parent_center = parentBox.getCenter();
    var child_center = childBox.getCenter();
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
            p1.y = childBox.properties.height;  // jshint ignore:line
        case 3:
            p1.y += childBox.properties.y;
            p1.x = line.getX(p1.y);
            break;
        case 2:
            p1.x = childBox.properties.width;  // jshint ignore:line
        case 4:
            p1.x += childBox.properties.x; 
            p1.y = line.getY(p1.x);
            break;
    }

    draw(p1);
    var p2 = parentBox.getCenter();

    this.segment = new Segment(p1, p2);
    draw(this.segment);
    draw(parentBox);
    draw(p2);

    this.p1 = p1;
    this.p2 = p2;
}

Arrow.prototype.destroy = function(childBox) {
    world.removeChild(this.segment.shape);
    world.removeChild(this.p1.shape);
    world.removeChild(this.p2.shape);
};
