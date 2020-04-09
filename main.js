const IMAGES = [
  {name: 'pacman', src: 'img/pacman.png'},
  {name: 'duch', src: 'img/red.png'},
  {name: 'cherry', src: 'img/cherry.png'},
  {name: 'fg', src: 'img/fg.png'},
  {name: 'bg', src: 'img/bg.png'},
  {name: 'bgStart', src: 'img/bg_start.png'},
  {name: 'soundOff', src: 'img/mute.png'},
  {name: 'food', src: 'img/dot.png'},

];

var keys ={};
 
/*function checkForCollision(){
  
}*/


const KEY_EVENT_TYPES = {

};

const MOUSE_EVENT_TYPES = {

};

window.onkeydown = function(event) {
    keys[event.keyCode] = true;
       
    };
window.onkeyup = function (event)
{
    keys[event.keyCode] = false;
} 


class Game {

    constructor() {
    
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.time = Date.now();
        this.stateManager = new StateManager(resourceManager, this.ctx);
    }
    //objects = [];
 
    async start() {
        console.log('starting game');
        await resourceManager.init();
        console.log('resouces loaded');
        this.stateManager.init();
        this.initEventSystem();

        this.startLoop();
    }

  

    initEventSystem() {
        this.canvas.addEventListener('click', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('keypress', (ev) => {
            this.handleEvent(ev);
        });
    }

    handleEvent(ev) {
        this.stateManager.handleEvent(ev);
    }


      //spusta nekonecnu sluzku
    startLoop() {
        this.time = Date.now();
        this.step();
    }
    step() {
        // console.log("Step");
        
        // Get time delta
        const now = Date.now();
        const dt = (now - this.time) / 100;
        this.time = now;
        
        this.update(dt);
        this.render(dt);
        
        requestAnimationFrame(() => this.step());
    }
 

    update(dt){
        this.stateManager.update(dt);
    }

    render(dt) {
        this.clearCtx();
        this.stateManager.render(dt);     
    }
    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}