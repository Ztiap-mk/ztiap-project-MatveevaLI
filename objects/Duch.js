class Duch extends BaseObject {
    constructor(x, y, width, height) {
        super(Math.random() * canvas.width, Math.random() * 490, 40, 40);
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('duch');

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * 490;
        this.dx = Math.random() * 50 - 25;
        this.dy = Math.random() * 50 - 25;
        this.size = Math.random() + .3;
        this.rotation = 0;
    }

    handleEvent(ev) {
    }

    // Movement logic
    move(dt) {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
            this.dx = -Math.abs(this.dx)
        }
        if (this.x < 0) {
            this.x = 0
            this.dx = Math.abs(this.dx)
        }
        if (this.y > canvas.height) {
            this.y = 490
            this.dy = -Math.abs(this.dy)
        }
        if (this.y < 0) {
            this.y = 0
            this.dy = Math.abs(this.dy) * 0.2
        }

        // Movement
        this.x += this.dx * dt
        this.y += 0 * dt
        this.rotation += dt / 3
    }
    update(dt) {
        this.move(dt);
    }
    // Render self
    render(ctx) {
        return;
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }
}