class MainMenu extends BaseState {
    constructor(manager, ctx) {

        super(manager, ctx);

        this.bgStartImage = resourceManager.getImageSource('bgStart');
        this.startSound = resourceManager.getSoundSource('start');

        const sound = new Sound('start');
        // const sound1 = new Sound('eating');
        // const sound2 = new Sound('die');
        this.isMuted = true;

        const soundOffButton = new ImageButton(450, 500, 30, 30, resourceManager.getImageSource('soundOff'));
        soundOffButton.onClick((ev) => {
            // for (var i = 0; i < 2; i++)
            // {
            //     sound.playsound();
            //     i++;
            // }
            sound.playsound();
            //sound1.playsound();
            // sound2.playsound();
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
             
            //this.stateManager.states.gameStates = new GameState(this.stateManager, ctx);
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

        const gameoverButton = new TextButton(155, 510, 200, 40, 40, 'Game Over', 'yellow');
        gameoverButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAMEOVER);
        });

        this.objects = [
            infoButton,
            controlsButton,
            soundOffButton,
            startGameButton,
            gameoverButton,
        ];

    }

    render(ctx) {
        this.ctx.drawImage(this.bgStartImage, 0, 0, 500, 550);
        this.objects.forEach(object => object.render(this.ctx));
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'o') {
            this.stateManager.changeState(STATES.GAMEOVER);
        }
    }

}