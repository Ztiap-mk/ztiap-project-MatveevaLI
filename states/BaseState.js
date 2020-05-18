class BaseState {
    objects = [];

    constructor(stateManager, ctx) {
        this.stateManager = stateManager;
        this.ctx = ctx;
    }

    render() {
        this.objects.forEach(object => object.render(this.ctx));
    }

    update(dt) {
    }

    handleEvent(ev) {
    }
}