var cvs;
var ctx;
// Model

var keys = {};
var pacman = new Image();
var bg = new Image();
var fg = new Image();

pacman.src = "img/pacman.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";

//View

var xPos = 6;
var yPos = 6;

pacman.draw = function draw() {
    
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(fg, 0,0)
  ctx.drawImage(pacman,xPos,yPos,25,22)
}


//Controller 

function mainLoop() {
    tick++;
    pacman.move();
    pacman.draw();
    requestAnimationFrame(mainLoop);
  }

  pacman.move = function() {
    if (keys[37]) 
      ball.x -= 5;
    if (keys[39]) ball.x += 5;
    if (keys[38]) ball.y -= 5;
    if (keys[40]) ball.y += 5;
  };


//Initialization
 
window.onload = function()
{
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");
    requestAnimationFrame(mainLoop);
}

window.onkeydown = function(event) {
    keys[event.keyCode] = true;
    console.log(keys);
  };
  window.onkeyup = function(event) {
    keys[event.keyCode] = false;
  };