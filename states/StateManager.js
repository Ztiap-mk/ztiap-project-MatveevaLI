class StateManager {
    static STATES = {
        GAME: 'gameState',
        MAINMENU: 'mainMenu',
        INFO: 'info',
        CONTROLS: 'controls',
        WORLDEDITOR: 'worldEditor',
        PAUSE: 'pause',
        GAMEOVER: 'gameover',
        NEXTLEVEL: 'nextLevel',
        GAMEEND: 'gameEnd',
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
            nextLevel: new NextLevel(this, ctx),
            gameEnd: new GameEnd(this, ctx),
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