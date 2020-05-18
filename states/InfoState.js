class InfoState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        this.infoImage = resourceManager.getImageSource('info');

        const backButton = new TextButton(180, 500, 200, 40, 40, 'Back', 'yellow');
        backButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.MAIN_MENU);
        });


        this.objects = [
            backButton,
        ];
    }

    render(ctx) {
        this.ctx.drawImage(this.infoImage, 0, 0, canvas.width, canvas.height);
        this.objects.forEach(object => object.render(this.ctx));
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(StateManager.STATES.MAIN_MENU);
        }
    }
}