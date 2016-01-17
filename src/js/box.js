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
    this.updateArrow();
    this.shape = new createjs.Shape();

    this.update();
    // new createjs.Shape(this.shape.graphics).graphics.beginFill("red").drawCircle(10, 10, 20);
    stage.addChild(this.shape);
    stage.update();

    this.shape.addEventListener("click", handleClick);
    that = this;
    function handleClick(event){
        that.addChild("asd asd");
    }
}

Box.prototype.redraw = function(){
    var p = this.properties;
    var s = this.shape;
    s.graphics.clear();  // we need to redraw everything
    s.x = p.x;
    s.y = p.y;
    s.graphics.beginFill(p.color);
    s.graphics.beginStroke(p.stroke);
    s.graphics.drawRect(0, 0, p.width, p.height);
    stage.update();
};

Box.prototype.update = function() {
    this.redraw();
    for (var i = 0, len = this.children.length; i < len; i++) {
        this.children.redraw();
    }
};

Box.prototype.addChild = function(text){
    child = new Box(this, this.shape.x, this.shape.y + 100, text);

    this.children.push(child);
};

Box.prototype.updateArrow = function() {
    if (! this.parentBox) return;  // first box doesn't have an arrow
    this.arrow = new createjs.Shape();
    this.arrow.x = this.parentBox.shape.x;
    this.arrow.y = this.parentBox.shape.y;
};
