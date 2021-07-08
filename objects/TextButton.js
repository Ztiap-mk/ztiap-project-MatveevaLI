class TextButton extends BaseObject {
    constructor(x, y, width, height, size, label, color) {
        super(x, y, width, height);
        this.label = label;
        this.size = size;
        this.color = color;
    }

    render(ctx) {
        const { label, x, y, width } = this;
        ctx.save();

        ctx.font = `${this.size}px Verdana`;
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.fillText(label, x, y, width);
        ctx.restore();
    }
}