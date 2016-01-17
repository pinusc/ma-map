var stage;

function main() {
    // set canvas size to occupy all screen
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stage = new createjs.Stage("canvas");
    
    circle = new Box(null, stage.canvas.width / 2, stage.canvas.height/ 2);

    var pos = 100;
    circle.shape.addEventListener("click", handleClick);
    function handleClick(event){
        circle.addChild("asd asd");
    }
}

window.onload = main;
