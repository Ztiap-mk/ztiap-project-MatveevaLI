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
    currentState = null;

    constructor(resourceManager, ctx) {
        this.resourceManager = resourceManager;
        this.ctx = ctx;
    }
    
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
        //gameState = this.states[state];
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







