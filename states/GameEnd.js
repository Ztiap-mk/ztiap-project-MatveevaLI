class GameEnd extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.GameEnd = resourceManager.getImageSource('gameEnd');
        const backButton = new TextButton(canvas.width * 0.5, canvas.height * 0.48, 200, 30, 30, 'Main menu', 'yellow');
        backButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.MAINMENU);
        });

        this.objects = [
            backButton,
        ];
    }

    render(ctx) {
        this.ctx.drawImage(this.GameEnd, 0, 0, canvas.width, canvas.height);
        this.objects.forEach(object => object.render(this.ctx));
    }
    
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}