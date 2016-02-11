function draw(item, update, arg) {
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
    } else if (item instanceof Box) {
        drawBox(item, arg);
    } else if (item instanceof createjs.Text) {
        item.x = arg.x;
        item.y = arg.y;
        if (! world.contains(item)) {
            world.addChild(item);
        }
        world.setChildIndex(item, world.getNumChildren() - 1);
        return;
    }
    if (! world.contains(item.shape)) {
        world.addChild(item.shape);
    }
    if(update) 
        stage.update();
}

// TODO make local
function drawBox(item, arg) {
    item.updateProperties(arg);
    var p = item.properties;
    var s = item.shape;
    s.graphics.clear();  // we need to redraw everything
    s.x = p.x;
    s.y = p.y;
    item.updateArrow();
    // world.setChildIndex(s, world.getNumChildren()-1);
    // world.setChildIndex(s, 0);
    s.graphics.beginFill(p.color);
    s.graphics.beginStroke(p.stroke);
    s.graphics.drawRect(0, 0, p.width, p.height);
    s.graphics.endFill().endStroke();

    if (! item.text) {
        item.text = new createjs.Text(item.properties.text, "20px Arial", "#000000");
    }

    draw(item.text, false, {x: item.properties.x, y: item.properties.y});
}
