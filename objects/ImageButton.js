class ImageButton extends BaseObject {
    constructor(id, x, y, width, height, image) {
        super(x, y, width, height);
        this.image = image;
        this.id = id;
    }

    render(ctx) {
        const { image, x, y, width, height } = this;
        ctx.drawImage(image, x, y, width, height);
    }
}