const STATES = {
    GAME: 'gameState',
    MAIN_MENU:'mainMenu',
    INFO:'info',
    CONTROLS:'controls',
    //PAUSED
}

class StateManager {
    states = {};
    //изначальное состояние
    currentState = null;

    constructor(resourseManager, ctx) {
        this.resourseManager = resourseManager;
        this.ctx = ctx;
    }
    //содержит все изображения
    init() {
        const ctx = this.ctx;
        this.states = {
            gameState: new GameState(this, ctx),
            mainMenu: new MainMenu(this, ctx),
            info: new InfoState(this, ctx),
            controls: new ControlsState(this, ctx),
        };
        //содержит актуальную картинку, которую должен рендерить
        this.currentState = this.states.mainMenu;
    }

    changeState(state) {
        const newState = this.states[state];
        if (!newState) {
            //объект ошибкиб тип new Error,  используется для генерации исключения.
            throw new Error (`State '${state}' not found`)
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

    update(dt){

    }
    handleEvent(ev){

    }
}

class MainMenu extends BaseState {
    constructor(manager, ctx) {
        //вызов родительского конструктора
        super(manager, ctx);
        const canvas = document.getElementById("canvas");
        
        const soundOffButton = new ImageButton (450,450,30,30, resourceManager.getImageSource('soundOff'));
        soundOffButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        const startGameButton = new TextButton (140,270, 200, 40, 40, 'New game');
        startGameButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        const infoButton = new TextButton (190, 320, 200, 40, 40, 'Info');
        infoButton.onClick((ev) => {
            this.stateManager.changeState(STATES.INFO);
        });

        const controlsButton = new TextButton (155, 370, 200, 40, 40, 'Controls');
        controlsButton.onClick((ev) => {
            this.stateManager.changeState(STATES.CONTROLS);
        });

        this.objects = [
            //new BackgroundStart(0, 0, 490, 490),
            infoButton,
            controlsButton,
            soundOffButton,
            startGameButton,
        ];
    }
    
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'l') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}

class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
    
        this.bgImage = resourceManager.getImageSource('bg');
        this.fgImage = resourceManager.getImageSource('fg');
        this.cherryImage = resourceManager.getImageSource('cherry');
        this.foodImage = resourceManager.getImageSource('food');
         //  duch a pacman
        for (let i = 0; i < 1; i++) {
        this.objects.push(new Pacman());
        this.objects.push(new Duch());
        
        }
    }
    
    update(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }

    render(ctx) {
       
           
        this.ctx.drawImage(this.bgImage,0,0,490,490);
        this.ctx.drawImage(this.foodImage,this.x,this.y,10,10);        
        this.ctx.drawImage(this.fgImage,0,0,490,490);
        this.ctx.drawImage(this.cherryImage,400,50,50,50);
         
        this.objects.forEach(object => object.render(this.ctx));
        
        }
    }    



class InfoState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        //const canvas = document.getElementById("canvas");
        this.objects = [
             
            new TextButton(100, 100, 200, 40, 40, 'Info'),
           
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
        if (isKeyPressEvent(ev) && ev.key === 'l') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}


class ControlsState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        //const canvas = document.getElementById("canvas");
        this.objects = [
           
            new TextButton(100, 100, 200, 40, 40, 'P - PAUSE GAME'),
            new TextButton(100, 150, 200, 40, 40, 'Q - QUIT GAME'),
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}