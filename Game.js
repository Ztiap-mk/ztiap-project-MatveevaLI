const IMAGES = [
    { name: 'pacman', src: 'img/pacmanSheet.png' },
    { name: 'ghost', src: 'img/ghost.png' },
    { name: 'cherry', src: 'img/cherry.png' },
    { name: 'bgStart', src: 'img/bgStart.png' },
    { name: 'soundOff', src: 'img/mute.png' },
    { name: 'soundOn', src: 'img/sound.png' },
    { name: 'food', src: 'img/dot.png' },
    { name: 'BigFood', src: 'img/megaDot.png' },
    { name: 'info', src: 'img/bgInfo.png' },
    { name: 'controls', src: 'img/bgControls.png' },
    { name: 'gamePause', src: 'img/bgPause.png' },
    { name: 'gameOver', src: 'img/bgGameOver.png' },
    { name: 'gameEnd', src: 'img/bgGameEnd.png' },
    { name: 'nextLevel', src: 'img/bgNextLevel.png' },
    { name: 'saveLevel', src: 'img/save.png' },
    { name: 'wall', src: 'img/wall.png' },
    { name: 'eraser', src: 'img/eraser.png' }
];

const SOUNDS = [
    { name: 'start', src: 'audio/start.mp3' },
    { name: 'eating', src: 'audio/eating.mp3' },
    { name: 'die', src: 'audio/die.mp3' },
];

let killPacman = false;
let quant = 0;
let score = 0;
let noSound = true;
let foodLeft = 0;
let lastLevel = false;

var keys = {};
let gameStartedOn = null;

const KEY_EVENT_TYPES = {
};

const MOUSE_EVENT_TYPES = {
};


window.onkeydown = function (event) {
    keys[event.key] = true;
};

window.onkeyup = function (event) {
    keys[event.key] = false;
}

class Game {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.time = Date.now();
        this.stateManager = new StateManager(resourceManager, this.ctx);
    }

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
    startLoop() {
        this.time = Date.now();
        this.step();
    }
    step() {

        const now = Date.now();
        const dt = (now - this.time) / 100;
        this.time = now;

        this.update(dt);
        this.render(dt);

        requestAnimationFrame(() => this.step());
    }
    update(dt) {
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