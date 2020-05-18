class GameOver extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.GameOver = resourceManager.getImageSource('gameover');
    }
    update(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }

    render(ctx) {
        this.ctx.drawImage(this.GameOver, 0, 0, canvas.width, canvas.height);
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'm') {
            this.stateManager.changeState(StateManager.STATES.MAIN_MENU);
        }
    }
}