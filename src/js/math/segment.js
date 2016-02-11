function Segment(p1, p2){
    this.p1 = p1;
    this.p2 = p2;
}

Segment.prototype.draw = function(graphics) {
    if (graphics) {
        this.shape = new createjs.Shape();
    } else {
        this.shape = new createjs.Shape(graphics);
    }
    var g = this.shape.graphics;
    g.beginStroke("black");

    g.moveTo(this.p1.x, this.p1.y);
    g.lineTo(this.p2.x, this.p2.y);
    g.endStroke();

    world.addChild(this.shape);
    stage.update();
};
