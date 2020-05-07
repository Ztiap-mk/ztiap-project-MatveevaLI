const STATES = {
    GAME: 'gameState',
    MAIN_MENU: 'mainMenu',
    INFO: 'info',
    CONTROLS: 'controls',
    PAUSE: 'pause',
    GAMEOVER: 'gameover',
}

class StateManager {
    states = {};
    //povodny stav
    currentState = null;

    constructor(resourceManager, ctx) {
        this.resourceManager = resourceManager;
        this.ctx = ctx;
    }
    //obsahuje vsetky obrazky

    init() {
        const ctx = this.ctx;
        this.states = {

            info: new InfoState(this, ctx),
            controls: new ControlsState(this, ctx),
            gameState: new GameState(this, ctx),
            mainMenu: new MainMenu(this, ctx),
            pause: new Pause(this, ctx),
            gameover: new GameOver(this, ctx),
        };
        this.currentState = this.states.mainMenu;
    }

    changeState(state) {
        const newState = this.states[state];
        if (!newState) {
            throw new Error(`State '${state}' not found`)
        }
        this.currentState = newState;
    }

    update(dt) {
        this.currentState.update(dt);
    }

    handleEvent(ev) {
        this.currentState.handleEvent(ev);
    }

    render() {
        this.currentState.render(this.ctx);
    }
}

class BaseState {

    objects = [];

    constructor(stateManager, ctx) {
        this.stateManager = stateManager;
        this.ctx = ctx;
    }

    render() {

        this.objects.forEach(object => object.render(this.ctx));
    }

    update(dt) {

    }

    handleEvent(ev) {

    }
}

class MainMenu extends BaseState {
    constructor(manager, ctx) {
        //consrtuctor rodica
        super(manager, ctx);


        this.bgStartImage = resourceManager.getImageSource('bgStart');
        this.startSound = resourceManager.getSoundSource('start');

        const sound = new Sound('start');
        const sound1 = new Sound('eating');
        const sound2 = new Sound('die');
        this.isMuted = true;

        const soundOffButton = new ImageButton(450, 500, 30, 30, resourceManager.getImageSource('soundOff'));
        soundOffButton.onClick((ev) => {
            sound.playsound();
            sound1.playsound();
            sound2.playsound();
            // if (this.isMuted) {
            //     sound.play();
            //     this.isMuted = false;
            // } else if (!this.isMuted) {
            //     sound.pause();
            //     this.isMuted = true;
            // }
            // this.startSound.play();
        });

        const startGameButton = new TextButton(140, 270, 200, 40, 40, 'New game', 'yellow');
        startGameButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        const infoButton = new TextButton(190, 330, 200, 40, 40, 'Info', 'yellow');
        infoButton.onClick((ev) => {
            this.stateManager.changeState(STATES.INFO);
        });


        const controlsButton = new TextButton(155, 390, 200, 40, 40, 'Controls', 'yellow');
        controlsButton.onClick((ev) => {
            this.stateManager.changeState(STATES.CONTROLS);
        });

        const pauseButton = new TextButton(155, 460, 200, 40, 40, 'Pause', 'yellow');
        pauseButton.onClick((ev) => {
            this.stateManager.changeState(STATES.PAUSE);
        });

        const gameoverButton = new TextButton(155, 510, 200, 40, 40, 'Game Over', 'yellow');
        gameoverButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAMEOVER);
        });

        this.objects = [
            infoButton,
            controlsButton,
            soundOffButton,
            startGameButton,
            pauseButton,
            gameoverButton,
        ];

    }

    render(ctx) {
        this.ctx.drawImage(this.bgStartImage, 0, 0, 490, 550);
        this.objects.forEach(object => object.render(this.ctx));
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }

        if (isKeyPressEvent(ev) && ev.key === 'o') {
            this.stateManager.changeState(STATES.GAMEOVER);
        }
    }

}

class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.bgImage = resourceManager.getImageSource('bg');
        this.fgImage = resourceManager.getImageSource('fg');
        this.labyrinthPath = new Path2D();
        this.calculateLabyrinth(this.labyrinthPath);
        this.cherryImage = resourceManager.getImageSource('cherry');
        this.foodImage = resourceManager.getImageSource('food');

        const backButton = new TextButton(canvas.width * 0.06, canvas.height * 0.97, 300, 40, 40, 'Back to Menu', 'black');
        backButton.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });

        const duch = new Duch();

        const pacman = new Pacman();

        // duch a pacman
        this.objects = [
            backButton,
            duch,
            pacman,
        ];
    }

    calculateLabyrinth(path){
        this.gridState = getGridState();
        // Draw Cells
        path.fillStyle = 'black';
        for (let i = 0; i < this.gridState.length; i++) {
            const row = this.gridState[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                // let point = new Point(j, i, cell.type);
                if(cell.type == 1) {
                    path.rect(j*20, i*20, 20, 20);
                }    
            }
        }
    }

    update(dt) {
        for (let index = 0; index < this.objects.length; index++) {
            const element = this.objects[index];
            element.update(dt);
        }

        // this.objects[0].update(dt)
        // this.objects[1].update(dt);
        // this.objects[2].update(dt);
    }

    drawFood(ctx, pic){
        ctx.drawImage(pic, 10, 10, 15, 15);
        ctx.drawImage(pic, 63, 10, 10, 10);
        ctx.drawImage(pic, 115, 10, 10, 10);
        ctx.drawImage(pic, 168, 10, 10, 10);
        ctx.drawImage(pic, 220, 10, 15, 15);

        ctx.drawImage(pic, 260, 10, 10, 10);
        ctx.drawImage(pic, 312, 10, 10, 10);
        ctx.drawImage(pic, 365, 10, 10, 10);
        ctx.drawImage(pic, 417, 10, 10, 10);
        ctx.drawImage(pic, 470, 10, 10, 10);

        //2 line 
        ctx.drawImage(pic, 10, 45, 10, 10);
        ctx.drawImage(pic, 115, 45, 10, 10);
        ctx.drawImage(pic, 220, 45, 10, 10);

        ctx.drawImage(pic, 260, 45, 10, 10);
        ctx.drawImage(pic, 365, 45, 10, 10);
        ctx.drawImage(pic, 470, 45, 10, 10);

        //3 line     
        ctx.drawImage(pic, 10, 80, 10, 10);
        ctx.drawImage(pic, 63, 80, 10, 10);
        ctx.drawImage(pic, 115, 80, 10, 10);
        ctx.drawImage(pic, 168, 80, 10, 10);
        ctx.drawImage(pic, 220, 80, 10, 10);

        ctx.drawImage(pic, 260, 80, 10, 10);
        ctx.drawImage(pic, 312, 80, 10, 10);
        ctx.drawImage(pic, 365, 80, 10, 10);
        ctx.drawImage(pic, 417, 80, 10, 10);
        ctx.drawImage(pic, 470, 80, 10, 10);

        //4 line     
        ctx.drawImage(pic, 10, 115, 10, 10);
        ctx.drawImage(pic, 63, 115, 10, 10);
        ctx.drawImage(pic, 115, 115, 10, 10);
        ctx.drawImage(pic, 168, 115, 10, 10);
        ctx.drawImage(pic, 220, 115, 10, 10);

        ctx.drawImage(pic, 260, 115, 10, 10);
        ctx.drawImage(pic, 312, 115, 10, 10);
        ctx.drawImage(pic, 365, 115, 10, 10);
        ctx.drawImage(pic, 417, 115, 10, 10);
        ctx.drawImage(pic, 470, 115, 10, 10);

        //5 line     
        ctx.drawImage(pic, 10, 150, 10, 10);
        ctx.drawImage(pic, 115, 150, 10, 10);
        ctx.drawImage(pic, 168, 150, 10, 10);
        ctx.drawImage(pic, 220, 150, 10, 10);

        ctx.drawImage(pic, 260, 150, 10, 10);
        ctx.drawImage(pic, 312, 150, 10, 10);
        ctx.drawImage(pic, 365, 150, 10, 10);
        ctx.drawImage(pic, 470, 150, 10, 10);

        //6 line     
        ctx.drawImage(pic, 10, 185, 10, 10);
        ctx.drawImage(pic, 63, 185, 10, 10);
        ctx.drawImage(pic, 115, 185, 10, 10);

        ctx.drawImage(pic, 365, 185, 10, 10);
        ctx.drawImage(pic, 417, 185, 10, 10);
        ctx.drawImage(pic, 470, 185, 10, 10);

        //7 line
        ctx.drawImage(pic, 10, 225, 10, 10);
        ctx.drawImage(pic, 115, 225, 10, 10);
        ctx.drawImage(pic, 63, 225, 10, 10);

        ctx.drawImage(pic, 417, 225, 10, 10);
        ctx.drawImage(pic, 365, 225, 10, 10);
        ctx.drawImage(pic, 470, 225, 10, 10);

        //8 line 
        ctx.drawImage(pic, 10, 260, 10, 10);
        ctx.drawImage(pic, 63, 260, 10, 10);
        ctx.drawImage(pic, 115, 260, 10, 10);
        ctx.drawImage(pic, 168, 260, 10, 10);
        ctx.drawImage(pic, 220, 260, 10, 10);

        ctx.drawImage(pic, 260, 260, 10, 10);
        ctx.drawImage(pic, 312, 260, 10, 10);
        ctx.drawImage(pic, 365, 260, 10, 10);
        ctx.drawImage(pic, 417, 260, 10, 10);
        ctx.drawImage(pic, 470, 260, 10, 10);

        //9 line
        ctx.drawImage(pic, 10, 295, 10, 10);
        ctx.drawImage(pic, 63, 295, 10, 10);
        ctx.drawImage(pic, 115, 295, 10, 10);
        ctx.drawImage(pic, 168, 295, 10, 10);
        ctx.drawImage(pic, 220, 295, 10, 10);

        ctx.drawImage(pic, 260, 295, 10, 10);
        ctx.drawImage(pic, 312, 295, 10, 10);
        ctx.drawImage(pic, 365, 295, 10, 10);
        ctx.drawImage(pic, 417, 295, 10, 10);
        ctx.drawImage(pic, 470, 295, 10, 10);

        //10 line
        ctx.drawImage(pic, 10, 330, 10, 10);
        ctx.drawImage(pic, 63, 330, 10, 10);
        ctx.drawImage(pic, 115, 330, 10, 10);
        ctx.drawImage(pic, 220, 330, 10, 10);

        ctx.drawImage(pic, 260, 330, 10, 10);
        ctx.drawImage(pic, 365, 330, 10, 10);
        ctx.drawImage(pic, 417, 330, 10, 10);
        ctx.drawImage(pic, 470, 330, 10, 10);

        //11 line
        ctx.drawImage(pic, 10, 365, 10, 10);
        ctx.drawImage(pic, 63, 365, 10, 10);
        ctx.drawImage(pic, 115, 365, 10, 10);
        ctx.drawImage(pic, 168, 365, 10, 10);
        ctx.drawImage(pic, 220, 365, 10, 10);

        ctx.drawImage(pic, 260, 365, 10, 10);
        ctx.drawImage(pic, 312, 365, 10, 10);
        ctx.drawImage(pic, 365, 365, 10, 10);
        ctx.drawImage(pic, 417, 365, 10, 10);
        ctx.drawImage(pic, 470, 365, 10, 10);

        //12 line
        ctx.drawImage(pic, 10, 435, 10, 10);
        ctx.drawImage(pic, 63, 435, 10, 10);
        ctx.drawImage(pic, 115, 435, 10, 10);
        ctx.drawImage(pic, 168, 435, 10, 10);
        ctx.drawImage(pic, 220, 435, 10, 10);

        ctx.drawImage(pic, 260, 435, 10, 10);
        ctx.drawImage(pic, 312, 435, 10, 10);
        ctx.drawImage(pic, 365, 435, 10, 10);
        ctx.drawImage(pic, 417, 435, 10, 10);
        ctx.drawImage(pic, 470, 435, 10, 10);

        //13 line
        ctx.drawImage(pic, 10, 400, 10, 10);
        ctx.drawImage(pic, 115, 400, 10, 10);
        ctx.drawImage(pic, 168, 400, 10, 10);
        ctx.drawImage(pic, 220, 400, 10, 10);

        ctx.drawImage(pic, 260, 400, 10, 10);
        ctx.drawImage(pic, 312, 400, 10, 10);
        ctx.drawImage(pic, 365, 400, 10, 10);
        ctx.drawImage(pic, 470, 400, 10, 10);

        //14 line
        ctx.drawImage(pic, 10, 470, 10, 10);
        ctx.drawImage(pic, 63, 470, 10, 10);
        ctx.drawImage(pic, 115, 470, 10, 10);
        ctx.drawImage(pic, 168, 470, 10, 10);
        ctx.drawImage(pic, 220, 470, 10, 10);

        ctx.drawImage(pic, 260, 470, 10, 10);
        ctx.drawImage(pic, 312, 470, 10, 10);
        ctx.drawImage(pic, 365, 470, 10, 10);
        ctx.drawImage(pic, 417, 470, 10, 10);
        ctx.drawImage(pic, 470, 470, 10, 10);
    }

    render(ctx) {
        // this.ctx.drawImage(this.bgImage, 0, 0, 490, 490);
        // this.ctx.drawImage(this.fgImage, 0, 0, 490, 490);
        //food
        ctx.fillStyle = 'black';
        ctx.fill(this.labyrinthPath);

        // this.drawFood(this.ctx, this.foodImage);
        // 1 line 

        // this.objects.forEach(object => object.render(this.ctx));
        for (let index = 0; index < this.objects.length; index++) {
            const element = this.objects[index];
            element.render(this.ctx);
        }
        // this.backButton.render(this.ctx);

    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });


        if (isKeyPressEvent(ev) && ev.key === 'q') {
            this.stateManager.changeState(STATES.MAIN_MENU);
        }

        if (isKeyPressEvent(ev) && ev.key === 'p') {
            this.stateManager.changeState(STATES.PAUSE);
        }
    }
}

class InfoState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        this.infoImage = resourceManager.getImageSource('info');

        const backButton = new TextButton(180, 500, 200, 40, 40, 'Back', 'yellow');
        backButton.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });


        this.objects = [
            backButton,
        ];
    }

    render(ctx) {
        this.ctx.drawImage(this.infoImage, 0, 0, 490, 550);
        this.objects.forEach(object => object.render(this.ctx));
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.MAIN_MENU);
        }
    }
}


class ControlsState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        this.controlsImage = resourceManager.getImageSource('controls');
        const backButton = new TextButton(180, 500, 200, 40, 40, 'Back', 'yellow');
        backButton.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });


        this.objects = [
            backButton,
        ];

    }
    render(ctx) {
        this.ctx.drawImage(this.controlsImage, 0, 0, 490, 550);
        this.objects.forEach(object => object.render(this.ctx));
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.MAIN_MENU);
        }
    }
}

class Pause extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.pauseImage = resourceManager.getImageSource('bgpause');

        const continueButton = new TextButton(140, 300, 200, 40, 40, 'continue', 'yellow');
        continueButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        this.objects = [
            continueButton,
        ];

    }
    render(ctx) {
        this.ctx.drawImage(this.pauseImage, 0, 0, 490, 550);
        this.objects.forEach(object => object.render(this.ctx));
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
        if (isKeyPressEvent(ev) && ev.key === 'c') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}

class GameOver extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.GameOver = resourceManager.getImageSource('gameover');
    }
    update(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }

    render(ctx) {
        this.ctx.drawImage(this.GameOver, 0, 0, 490, 550);
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'm') {
            this.stateManager.changeState(STATES.MAIN_MENU);
        }
    }
}