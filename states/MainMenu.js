class MainMenu extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.bgStartImage = resourceManager.getImageSource('bgStart');
        this.startSound = resourceManager.getSoundSource('start');

        this.sound = new Sound('start');
        this.sound.sound.loop = true;
        this.sound.playsound();

        const soundOffButton = new ImageButton('SoundOffButton', 450, 500, 30, 30, resourceManager.getImageSource('soundOff'));
        const soundOnButton = new ImageButton('SoundOnButton', 450, 500, 30, 30, resourceManager.getImageSource('soundOn'));

        soundOffButton.onClick((ev) => {
            noSound = !noSound;
            if (this.sound.sound.paused) {
                this.sound.play();
            } else {
                this.sound.pause();
            }
        });

        const startGameButton = new TextButton(canvas.width / 2, canvas.height / 2, 200, 40, 40, 'New game', 'yellow');
        const infoButton = new TextButton(canvas.width / 2, canvas.height / 2 + 0.1 * canvas.height, 200, 40, 40, 'Info', 'yellow');
        const controlsButton = new TextButton(canvas.width / 2, canvas.height / 2 + 0.2 * canvas.height, 200, 40, 40, 'Controls', 'yellow');
        const editorButton = new TextButton(canvas.width / 2, canvas.height / 2 + 0.3 * canvas.height, 240, 40, 40, 'World Editor', 'yellow');

        this.objects = [
            infoButton,
            controlsButton,
            soundOffButton,
            soundOnButton,
            startGameButton,
            editorButton,
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

    processButtons(x, y) {
        if ((x >= canvas.width / 2 - 100 && x <= canvas.width / 2 + 100) && (y >= canvas.height / 2 - 20 && y <= canvas.height / 2 + 20)) {
            this.sound.pause();
            this.sound.sound.currentTime = 0;
            this.stateManager.initGame();
            this.stateManager.changeState(StateManager.STATES.GAME);
        }
        else if ((x >= canvas.width / 2 - 100 && x <= canvas.width / 2 + 100) && (y >= (canvas.height / 2 + 0.1 * canvas.height) - 20 && y <= (canvas.height / 2 + 0.1 * canvas.height) + 20)) {
            this.stateManager.changeState(StateManager.STATES.INFO);
        }
        else if ((x >= canvas.width / 2 - 100 && x <= canvas.width / 2 + 100) && (y >= (canvas.height / 2 + 0.2 * canvas.height) - 20 && y <= (canvas.height / 2 + 0.2 * canvas.height) + 20)) {
            this.stateManager.changeState(StateManager.STATES.CONTROLS);
        }
        else if ((x >= canvas.width / 2 - 120 && x <= canvas.width / 2 + 120) && (y >= (canvas.height / 2 + 0.3 * canvas.height) - 20 && y <= (canvas.height / 2 + 0.3 * canvas.height) + 20)) {
            this.stateManager.changeState(StateManager.STATES.WORLDEDITOR);
        }
    }

    handleEvent(ev) {
        if (ev.type == "click") {
            var rect = canvas.getBoundingClientRect();
            var x = ev.clientX - rect.left;
            var y = ev.clientY - rect.top;
            this.processButtons(x, y);
        }

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(StateManager.STATES.GAME);
        }

        if (isKeyPressEvent(ev) && ev.key === 'o') {
            this.stateManager.changeState(StateManager.STATES.GAMEOVER);
        }
    }
}