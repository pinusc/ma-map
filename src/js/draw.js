function draw(item, update) {
    if (item.shape) {
        item.shape.graphics.clear();
    } else {
        item.shape = new createjs.Shape();
    }
    var g = item.shape.graphics;

    if (item instanceof Point) {
        g.beginFill("black");
        g.drawCircle(item.x, item.y, 5);
    } else if (item instanceof Segment) {
        g.beginStroke("black");
        g.moveTo(item.p1.x, item.p1.y);
        g.lineTo(item.p2.x, item.p2.y);
        g.endStroke();
    }
    world.addChild(item.shape);
    if(update) 
        stage.update();
}
