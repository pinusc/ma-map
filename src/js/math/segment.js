function Segment(p1, p2){
    this.p1 = p1;
    this.p2 = p2;
}

Segment.prototype.draw = function(graphics) {
    draw(this, true);
};
