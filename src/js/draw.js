function draw(item, graphics, update) {
    if (item.shape) {
        item.shape.graphics.clear();
    } else {
        item.shape = new createjs.Shape();
    }
    var g = item.shape.graphics;


    if (item instanceof Point) {

        g.beginFill("black");
        g.drawCircle(item.x, item.y, 5);
    }
    world.addChild(item.shape);
    if(update) 
        stage.update();
}
