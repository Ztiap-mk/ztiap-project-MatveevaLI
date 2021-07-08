class Pause extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.pauseImage = resourceManager.getImageSource('gamePause');
        this.continueButton = new TextButton(canvas.width * 0.5, canvas.height * 0.48, 200, 40, 40, 'continue', 'yellow');
    }
    render(ctx) {
        this.ctx.drawImage(this.pauseImage, 0, 0, canvas.width, canvas.height);
        this.continueButton.render(ctx);
    }

    processButtons(x, y) {
        if ((x >= canvas.width / 2 - 100 && x <= canvas.width / 2 + 100) && (y >= canvas.height / 2 - 40 && y <= canvas.height / 2)) {
            this.stateManager.changeState(StateManager.STATES.GAME);
        }
    }

    handleEvent(ev) {
        if (ev.type == "click") {
            var rect = canvas.getBoundingClientRect();
            var x = ev.clientX - rect.left;
            var y = ev.clientY - rect.top;
            this.processButtons(x, y);
        }
    }
}