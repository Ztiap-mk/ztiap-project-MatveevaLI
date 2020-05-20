class StateManager {
    static STATES = {
        GAME: 'gameState',
        MAIN_MENU: 'mainMenu',
        INFO: 'info',
        CONTROLS: 'controls',
        WORLD_EDITOR: 'worldEditor',
        PAUSE: 'pause',
        GAMEOVER: 'gameover',
    }

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
            mainMenu: new MainMenu(this, ctx),
            worldEditor: new WorldEditor(this, ctx),
            pause: new Pause(this, ctx),
            gameover: new GameOver(this, ctx),
        };
        this.currentState = this.states.mainMenu;
    }

    changeState(state) {
        let newState = null;
        if (state == StateManager.STATES.GAME) {
            newState = new GameState(this, this.ctx); 
        }
        else {
            newState = this.states[state];
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