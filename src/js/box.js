function Box(parentBox, x, y, text){
    this.children = [];
    this.parentBox = parentBox;
    x = x || 0;
    y = y || 0;
    this.text = text || "Lorem Ipsum";
    this.shape = new createjs.Shape();
    this.shape.x = x;
    this.shape.y = y;
    this.shape.graphics.beginFill("red").beginStroke("#000000").drawRect(0, 0, 40, 40);
    // new createjs.Shape(this.shape.graphics).graphics.beginFill("red").drawCircle(10, 10, 20);
    stage.addChild(this.shape);
    stage.update();
}

Box.prototype.addChild = function(text){
    this.children.push(new Box(this, this.shape.x, this.shape.y + 100, text));
};
