class ControlsState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        this.controlsImage = resourceManager.getImageSource('controls');
        const backButton = new TextButton(canvas.width * 0.49, canvas.height * 0.9, 200, 40, 40, 'Back', 'yellow');
        backButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.MAINMENU);
        });

        this.objects = [
            backButton,
        ];
    }

    render(ctx) {
        this.ctx.drawImage(this.controlsImage, 0, 0, canvas.width, canvas.height);
        this.objects.forEach(object => object.render(this.ctx));
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}