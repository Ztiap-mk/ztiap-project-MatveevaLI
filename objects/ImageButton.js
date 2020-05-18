class ImageButton extends BaseObject {
    constructor(x, y, width, height, image) {
        super(x, y, width, height);
        this.image = image;
    }

    render(ctx) {
        const { image, x, y, width, height } = this;
        ctx.drawImage(image, x, y, width, height);
    }
}