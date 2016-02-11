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
    } else if (item instanceof Line) {
        if (this.b) {
            p1x = 0;
            p1y = this.getY(p1x);

            p2x = window.innerWidth - 10;
            p2y = this.getY(p2x);
        } else {
            p1x = this.c;
            p1y = 0;

            p2x = this.c;
            // TODO: adapt to worlda larger that window
            p2y = window.innerHeight;  
        }
        g.beginStroke("black");

        g.moveTo(p1x, p1y);
        g.lineTo(p2x, p2y);
        g.endStroke();
    }
    world.addChild(item.shape);
    if(update) 
        stage.update();
}
