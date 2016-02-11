var stage, world;

function main() {
    // set canvas size to occupy all screen
    var canvas = document.getElementById('canvas');

    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stage = new createjs.Stage("canvas");

    createjs.Ticker.addEventListener("tick", tick);

    function tick() {
        stage.update();
    }


    var dragBox = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0,0,stage.canvas.width, stage.canvas.height));
    dragBox.addEventListener("mousedown", startDrag);                     
    dragBox.addEventListener("pressmove", doDrag);   
    stage.addChild(dragBox);

    world = new createjs.Container();
    stage.addChild(world);

    circle = new Box(null, {rect: new Rectangle(new Point(stage.canvas.width / 2, stage.canvas.height / 2), 100, 50)}, "Lipsum");

    var offset = new createjs.Point();
	function startDrag(evt) {
        if (evt.nativeEvent.button !== 1) return;
        // console.log(evt);
		offset.x = stage.mouseX - world.x;
		offset.y = stage.mouseY - world.y;
        // console.log(offset);
        // console.log(world.x);
        stage.update();
	}
	function doDrag(evt) {
        if (evt.nativeEvent.button !== 1) return;
		world.x = evt.stageX - offset.x;
		world.y = evt.stageY - offset.y;
	}

    createUI();
}


function createUI() {
    var text = new createjs.Text("Mappa Maker", "50px Serif");
    text.x = stage.canvas.width / 2 - text.getMeasuredWidth() / 2;
    // text.textBaseline = "alphabetic";
    stage.addChild(text);
}

window.onload = main;
