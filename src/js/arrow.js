function Arrow(parentBox, childBox) {
    childBox.x = childBox.shape.x;
    childBox.y = childBox.shape.y;


    var parent_rect = parentBox.getRectangle();
    var child_rect = childBox.getRectangle();
    var dir = child_rect.getDirection(parent_rect);

    var parent_center = parent_rect.getCenter();
    var child_center = child_rect.getCenter();
    var line = LineBetween(parent_center, child_center);

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
    this.segment = new Segment(p1, parent_center);
    draw(this.segment);
    draw(parentBox);
    draw(parent_center);

    this.p1 = p1;
    this.p2 = parent_center;
}

Arrow.prototype.destroy = function(childBox) {
    world.removeChild(this.segment.shape);
    world.removeChild(this.p1.shape);
    world.removeChild(this.p2.shape);
};
