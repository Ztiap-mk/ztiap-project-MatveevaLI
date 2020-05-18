class MainMenu extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.bgStartImage = resourceManager.getImageSource('bgStart');
        this.startSound = resourceManager.getSoundSource('start');

        const sound = new Sound('start');
        this.isMuted = true;

        const soundOffButton = new ImageButton(450, 500, 30, 30, resourceManager.getImageSource('soundOff'));
        soundOffButton.onClick((ev) => {
            sound.playsound();
        });

        const startGameButton = new TextButton(canvas.width / 2, canvas.height / 2, 200, 40, 40, 'New game', 'yellow');
        startGameButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.GAME);
        });

        const infoButton = new TextButton(canvas.width / 2, canvas.height / 2 + 0.1 * canvas.height, 200, 40, 40, 'Info', 'yellow');
        infoButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.INFO);
        });

        const controlsButton = new TextButton(canvas.width / 2, canvas.height / 2 + 0.2 * canvas.height, 200, 40, 40, 'Controls', 'yellow');
        controlsButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.CONTROLS);
        });

        const editorButton = new TextButton(canvas.width / 2, canvas.height / 2 + 0.3 * canvas.height, 200, 40, 40, 'World Editor', 'yellow');
        editorButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.WORLD_EDITOR);
        });

        const gameoverButton = new TextButton(canvas.width / 2, canvas.height / 2 + 0.4 * canvas.height, 200, 40, 40, 'Game Over', 'yellow');
        gameoverButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.GAMEOVER);
        });

        this.objects = [
            infoButton,
            controlsButton,
            soundOffButton,
            startGameButton,
            editorButton,
            gameoverButton,
        ];
    }

    render(ctx) {
        this.ctx.drawImage(this.bgStartImage, 0, 0, canvas.width, canvas.height);
        this.objects.forEach(object => object.render(this.ctx));
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(StateManager.STATES.GAME);
        }

        if (isKeyPressEvent(ev) && ev.key === 'o') {
            this.stateManager.changeState(StateManager.STATES.GAMEOVER);
        }
    }
}