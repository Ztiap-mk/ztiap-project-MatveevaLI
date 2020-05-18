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
            gameState: new GameState(this, ctx),
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