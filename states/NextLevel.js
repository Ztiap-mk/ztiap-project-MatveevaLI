class NextLevel extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.nextLevel = resourceManager.getImageSource('gamePause');
        const nextLevelButton = new TextButton(canvas.width * 0.5, canvas.height * 0.48, 200, 30, 30, 'Next Level', 'yellow');
        nextLevelButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.GAME);
        });

        this.objects = [
            nextLevelButton,
        ];
    }

    render(ctx) {
        this.ctx.drawImage(this.nextLevel, 0, 0, canvas.width, canvas.height);
        this.objects.forEach(object => object.render(this.ctx));
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}