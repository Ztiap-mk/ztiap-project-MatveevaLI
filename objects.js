class Pacman extends BaseObject {
    // Initialization
    constructor(currentLevel) {
        super(150, 250, 20, 20);
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('pacman');
        this.x = 150;
        this.y = 250;
        this.height = 20;
        this.width = 20;
        this.currentLevel = currentLevel;
     }

    getCoordinate(x, y) {
        if (this.currentLevel && this.currentLevel[x] && this.currentLevel[y]) {
            return this.currentLevel[y][x];
        }
    }

    handleMovement(pacman, newCoordinate, currentCoordinate, offset) {
        if (offset == "+X") {
            pacman.x++;
        }
        else if (offset == "-X") {
            pacman.x--;
        }
        else if (offset == "+Y") {
            pacman.y++;
        }
        else if (offset == "-Y") {
            pacman.y--;
        }
        // const dxMin = Math.floor(pacman.x / 20) * 20;

        // const dyMin = Math.floor(pacman.y / 20) * 20;
        // const dyMax = Math.ceil(pacman.y / 20) * 20;

        // if (newCoordinate.x * 20 < dxMin || newCoordinate.x * 20 > dxMax) {
        //     pacman.x = newCoordinate.x * 20;
        // }
        // if (newCoordinate.y * 20 < dyMin || newCoordinate.y * 20 > dyMax) {
        //     pacman.y = newCoordinate.y * 20;
        // }
    }

    // Movement logic
    move(dt) {
 
        let currentCoordinate = this.getCoordinate(Math.floor((this.x) / 20), Math.floor(this.y / 20));
        let newCoordinate = null;
        let offset = "";
        
        let currentPointX = Math.floor(this.x / 20);
        let currentPointY = Math.floor(this.y / 20);

        if (keys["ArrowLeft"]) {
            let newPointX = Math.floor((this.x - 1) / 20);
            if (newPointX == currentPointX) {
                this.x--;
                return;
            }
            else {
                newCoordinate = this.getCoordinate(newPointX, currentPointY);
                offset = "-X";
            }
        }

        if (keys["ArrowRight"]) {
            
            let newPointX = Math.floor((this.x + 1) / 20);
            if (newPointX == currentPointX) {
                this.x++;
                return;
            }
            else {
                newCoordinate = this.getCoordinate(newPointX, currentPointY);
                offset = "+X";
            }
        }

        if (keys["ArrowUp"]) {
            let newPointY = Math.floor((this.y - 1) / 20);
            if (newPointY == currentPointY) {
                this.y--;
                return;
            }
            else {
                newCoordinate = this.getCoordinate(currentPointX, newPointY);
                offset = "-Y";
            }
        }
        if (keys["ArrowDown"]) {
            let newPointY = Math.floor((this.y + 1) / 20);
            if (newPointY == currentPointY) {
                this.y++;
                return;
            }
            else {
                newCoordinate = this.getCoordinate(currentPointX, newPointY);
                offset = "+Y";
            }
        };
        if (newCoordinate) {

            switch (newCoordinate.type) {
                case Cell.CellType.Empty: this.handleMovement(this, newCoordinate, currentCoordinate, offset);
                case Cell.CellType.Wall: break;
                case Cell.CellType.Food: break;
                case Cell.CellType.BigFood: break;
                default: throw "Error";
            }
        }
    }
    update(dt) {
        this.move(dt);
    }

    // Render self
    render(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

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
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }
}

class Food {
    constructor(x, y, width, height) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('food');

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(ctx) {
        ctx.save()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore()
    }
}

class Sound {
    constructor(src) {
        this.sound = resourceManager.getSoundSource(src);
        this.isPlaying = false;
    }

    play() {
        this.sound.play();
        this.sound.muted = false;
    }

    pause() {
        // this.sound.pause();
        this.sound.muted = true;
    }

    playsound() {
        if (this.isPlaying == false) {
            this.play();
            this.isPlaying = true;
        }
        else {
            this.pause();
            this.isPlaying = false;
        }
    }
}
