class ControlsState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        this.controlsImage = resourceManager.getImageSource('controls');
        this.backButton = new TextButton(canvas.width * 0.49, canvas.height * 0.9, 200, 40, 40, 'Back', 'yellow');
    }

    render(ctx) {
        this.ctx.drawImage(this.controlsImage, 0, 0, canvas.width, canvas.height);
        this.backButton.render(ctx);
    }

    processButtons(x, y) {
        if ((x >= canvas.width / 2 - 100 && x <= canvas.width / 2 + 100) && (y >= canvas.height * 0.9 - 20 && y <= canvas.height * 0.9 + 20)) {
            this.stateManager.changeState(StateManager.STATES.MAINMENU);
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