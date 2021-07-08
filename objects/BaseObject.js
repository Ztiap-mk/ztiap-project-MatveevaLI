class BaseObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    onClickHandler = null;
    onMouseUpHandler = null;
    onMouseDownHandler = null;

    update(dt) {

    }

    render(ctx) {
        const { x, y, width, height } = this;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
    }

    handleEvent(ev) {
        if (this.onClickHandler && this.isClicked(ev)) {
            this.onClickHandler(ev);
        }
    }

    onMouseDownHandler(fn) {
        this.onMouseDownHandler = fn;
    }

    onMouseUp(fn) {
        this.onMouseUpHandler = fn;
    }

    onClick(fn) {
        this.onClickHandler = fn;
    }

    isClicked(ev) {
        if (isMouseClickEvent(ev)) {
            const mouseX = ev.offsetX;
            const mouseY = ev.offsetY;
            if (mouseX >= this.x && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + this.height) {
                return true;
            }
        }
        return false;
    }
}