class MainMenu extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.bgStartImage = resourceManager.getImageSource('bgStart');
        this.startSound = resourceManager.getSoundSource('start');

        const sound = new Sound('start');
        sound.sound.loop = true;
        sound.playsound();

        const soundOffButton = new ImageButton('SoundOffButton', 450, 500, 30, 30, resourceManager.getImageSource('soundOff'));
        const soundOnButton = new ImageButton('SoundOnButton', 450, 500, 30, 30, resourceManager.getImageSource('soundOn'));

        soundOffButton.onClick((ev) => {
            noSound = !noSound;
            if (sound.sound.paused) {
                sound.play();
            } else {
                sound.pause();
            }
        });

        const startGameButton = new TextButton(canvas.width / 2, canvas.height / 2, 200, 40, 40, 'New game', 'yellow');
        startGameButton.onClick((ev) => {
            sound.pause();
            sound.sound.currentTime = 0;
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
            soundOnButton,
            startGameButton,
            editorButton,
            gameoverButton
        ];
    }

    render(ctx) {
        this.ctx.drawImage(this.bgStartImage, 0, 0, canvas.width, canvas.height);
        this.objects.forEach((object) => {
            if (object instanceof ImageButton) {
                if (object.id == 'SoundOffButton' && noSound || object.id == 'SoundOnButton' && !noSound) {
                    return;
                }
            }
            object.render(this.ctx);
        });
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