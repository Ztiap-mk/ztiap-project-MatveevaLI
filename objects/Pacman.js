class Pacman extends BaseObject {

    get currentCoordinate() {
        return this._currentCoordinate;
    }
    set currentCoordinate(value) {
        this.x = value.pxX;
        this.y = value.pxY;
        this._currentCoordinate = value;
    }

    constructor(game) {
        super(150, 250, quant, quant);
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('pacman');

        this._currentCoordinate = null;
        this.currentCoordinate = game.grid.getCoordinateFromPX(150, 250);
        this.height = quant;
        this.width = quant;
        this.currentLevel = game.grid.currentLevel;
        this.game = game;
        this.grid = game.grid;
        this.counter = 0;
        this.currentFrameHeight = 1;
        this.score = 0;

        this.movementHistory = [];
        this.trackMovement = false;
    }

    handleMovement(pacman, newCoordinate) {
        pacman.currentCoordinate = newCoordinate;
    }

    handleFood(newCoordinate) {
        if (this.grid.CurrentLevel[newCoordinate.cellY][newCoordinate.cellX].type == Coordinate.CoordinateType.Food) {
            this.score += 10;
        }

        if (this.grid.CurrentLevel[newCoordinate.cellY][newCoordinate.cellX].type == Coordinate.CoordinateType.BigFood) {
            this.score += 100;
        }

        this.grid.CurrentLevel[newCoordinate.cellY][newCoordinate.cellX].type = Coordinate.CoordinateType.Empty;
        this.game.calculateLabyrinthPath();
        //console.log("score: " + this.score);
    }

    move(dt) {

        // Prevent multiple keys hit together
        if (Object.keys(keys).filter(key => key.indexOf("Arrow") > -1 && keys[key] == true).length != 1) {
            return;
        }

        let deltaX = this.currentCoordinate.pxX;
        let deltaY = this.currentCoordinate.pxY;
        let newCoordinate = null;

        if (keys["ArrowLeft"]) { deltaX -= 3; }
        if (keys["ArrowRight"]) { deltaX += quant + 3; deltaY += quant; }
        if (keys["ArrowUp"]) { deltaY -= 3; deltaX += quant; }
        if (keys["ArrowDown"]) { deltaY += quant + 3; deltaX += quant; }

        newCoordinate = this.grid.getCoordinateFromPX(deltaX, deltaY);

        // Cancel Collision 
        if (keys["ArrowRight"]) { newCoordinate.pxX -= quant; newCoordinate.pxY -= quant; }
        if (keys["ArrowUp"]) { newCoordinate.pxX -= quant; }
        if (keys["ArrowDown"]) { newCoordinate.pxX -= quant; newCoordinate.pxY -= quant; }

        if (newCoordinate) {

            switch (newCoordinate.type) {
                case Coordinate.CoordinateType.Empty: this.handleMovement(this, newCoordinate);
                case Coordinate.CoordinateType.Wall: break;
                case Coordinate.CoordinateType.Food: this.handleFood(newCoordinate); this.handleMovement(this, newCoordinate); break;
                case Coordinate.CoordinateType.BigFood: this.handleFood(newCoordinate); this.handleMovement(this, newCoordinate); break;
                default: throw "Error";
            }
        }

        if (this.trackMovement == true && this.game.objects[2].indexMovementHistory >= -1) {
            
            this.movementHistory.push({ x: newCoordinate.pxX, y: newCoordinate.pxY });

            if (this.game.objects[2].indexMovementHistory == -1) { 
                this.game.objects[2].indexMovementHistory = 0; 
            }
            console.log(`Track:` + this.trackMovement);
        }
    }

    update(dt) {
        this.move(dt);
    }

    render(ctx) {
        ctx.save();
        var frame_width = 193;
        var frame_height = 193;
        var frame = Math.floor(this.counter % 3);

        if (keys["ArrowRight"]) {
            this.currentFrameHeight = 0 * frame_height;
            ctx.drawImage(this.image, frame * frame_width, this.currentFrameHeight, frame_width, frame_height, this.x, this.y, this.width, this.height);
        }

        if (keys["ArrowLeft"]) {
            this.currentFrameHeight = 1 * frame_height;
            ctx.drawImage(this.image, frame * frame_width, this.currentFrameHeight, frame_width, frame_height, this.x, this.y, this.width, this.height);
        }

        if (keys["ArrowUp"]) {
            this.currentFrameHeight = 2 * frame_height;
            ctx.drawImage(this.image, frame * frame_width, this.currentFrameHeight, frame_width, frame_height, this.x, this.y, this.width, this.height);
        }

        if (keys["ArrowDown"]) {
            this.currentFrameHeight = 3 * frame_height;
            ctx.drawImage(this.image, frame * frame_width, this.currentFrameHeight, frame_width, frame_height, this.x, this.y, this.width, this.height);
        }

        else ctx.drawImage(this.image, frame * frame_width, this.currentFrameHeight, frame_width, frame_height, this.x, this.y, this.width, this.height);
        this.counter = this.counter + .05;

        ctx.font = `20px Verdana`;
        ctx.fillStyle = 'black';
        ctx.fillText("Score " + this.score, canvas.width * 0.47, canvas.height * 0.97);
        ctx.restore();
    }
}