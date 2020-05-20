class GameOver extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.GameOver = resourceManager.getImageSource('gameOver');
        const backButton = new TextButton(canvas.width * 0.5, canvas.height * 0.48, 200, 30, 30, 'Main menu', 'yellow');
        backButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.MAINMENU);
        });

        this.objects = [
            backButton,
        ];
    }

    render(ctx) {
        this.ctx.drawImage(this.GameOver, 0, 0, canvas.width, canvas.height);
        this.objects.forEach(object => object.render(this.ctx));
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'm') {
            this.stateManager.changeState(StateManager.STATES.MAINMENU);
        }
    }
}