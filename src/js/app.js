var stage;

function main() {
    // set canvas size to occupy all screen
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stage = new createjs.Stage("canvas");
    
    circle = new Box(null, stage.canvas.width / 2, stage.canvas.height/ 2);
}

window.onload = main;
