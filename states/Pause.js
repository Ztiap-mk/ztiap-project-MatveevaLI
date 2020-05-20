class Pause extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.pauseImage = resourceManager.getImageSource('gamePause');

        const continueButton = new TextButton(canvas.width * 0.5, canvas.height * 0.48, 200, 40, 40, 'continue', 'yellow');
        continueButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.GAME);
        });

        this.objects = [
            continueButton,
        ];
    }
    render(ctx) {
        this.ctx.drawImage(this.pauseImage, 0, 0,canvas.width, canvas.height);
        this.objects[0].render(this.ctx);
    }
    
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}