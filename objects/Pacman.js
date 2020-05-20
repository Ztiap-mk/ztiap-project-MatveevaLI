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

        this.foodEatenSound = new Sound('eating');

        this._currentCoordinate = null;
        this.currentCoordinate = game.grid.getCoordinateFromPX(250, 400);
        this.height = quant;
        this.width = quant;
        this.currentLevel = game.grid.currentLevel;
        this.game = game;
        this.grid = game.grid;
        this.counter = 0;
        this.currentFrameHeight = 1;

        this.movementHistory = [];
        this.trackMovement = false;
    }

    handleMovement(pacman, newCoordinate) {
        pacman.currentCoordinate = newCoordinate;
    }

    nextLevel() {
        if (lastLevel == true) {
            this.game.stateManager.changeState(StateManager.STATES.GAMEEND);
        }
        else {
            this.game.stateManager.changeState(StateManager.STATES.NEXTLEVEL);
        }
    }
    handleFood(newCoordinate) {
        if (this.grid.CurrentLevel[newCoordinate.cellY][newCoordinate.cellX].type == Coordinate.CoordinateType.Food) {
            score += 10;
            foodLeft--;
        }
        else if (this.grid.CurrentLevel[newCoordinate.cellY][newCoordinate.cellX].type == Coordinate.CoordinateType.BigFood) {
            score += 100;
            foodLeft--;
        }
        else if (this.grid.CurrentLevel[newCoordinate.cellY][newCoordinate.cellX].type == Coordinate.CoordinateType.Cherry) {
            score += 1000;
        }

        this.foodEatenSound.play();
        this.grid.CurrentLevel[newCoordinate.cellY][newCoordinate.cellX].type = Coordinate.CoordinateType.Empty;

        this.game.calculateLabyrinthPath();

        if (foodLeft == 0) {
            this.nextLevel();
        }
    }

    move(dt) {
        // Prevent multiple keys hit together
        if (Object.keys(keys).filter(key => key.indexOf("Arrow") > -1 && keys[key] == true).length != 1) {
            return;
        }

        let deltaX = this.currentCoordinate.pxX;
        let deltaY = this.currentCoordinate.pxY;
        let deltaXOffset = this.currentCoordinate.pxX;
        let deltaYOffset = this.currentCoordinate.pxY;
        let newCoordinate = null;
        let newCoordinateOffset = null;

        if (keys["ArrowLeft"]) { deltaX--; deltaY += quant; }
        if (keys["ArrowRight"]) { deltaX += quant + 1; deltaY += quant; }
        if (keys["ArrowUp"]) { deltaX += quant; deltaY -= 1; }
        if (keys["ArrowDown"]) { deltaX += quant; deltaY += quant + 1; }
        newCoordinate = this.grid.getCoordinateFromPX(deltaX, deltaY);

        // Cancel Collision
        if (keys["ArrowLeft"]) { newCoordinate.pxY -= quant; }
        if (keys["ArrowRight"]) { newCoordinate.pxX -= quant; newCoordinate.pxY -= quant; }
        if (keys["ArrowUp"]) { newCoordinate.pxX -= quant; }
        if (keys["ArrowDown"]) { newCoordinate.pxX -= quant; newCoordinate.pxY -= quant; }

        // Process Offset
        if (keys["ArrowLeft"]) { deltaXOffset--; }
        if (keys["ArrowRight"]) { deltaXOffset += quant + 1; }
        if (keys["ArrowUp"]) { deltaYOffset--; }
        if (keys["ArrowDown"]) { deltaYOffset += quant + 1; }
        newCoordinateOffset = this.grid.getCoordinateFromPX(deltaXOffset, deltaYOffset);

        if (newCoordinate && newCoordinateOffset.type != Coordinate.CoordinateType.Wall) {
            switch (newCoordinate.type) {
                case Coordinate.CoordinateType.Empty: this.handleMovement(this, newCoordinate); break;
                case Coordinate.CoordinateType.Wall: break;
                case Coordinate.CoordinateType.Food: this.handleFood(newCoordinate); this.handleMovement(this, newCoordinate); break;
                case Coordinate.CoordinateType.BigFood: this.handleFood(newCoordinate); this.handleMovement(this, newCoordinate); break;
                case Coordinate.CoordinateType.Cherry: this.handleFood(newCoordinate); this.handleMovement(this, newCoordinate); break;
                default: throw "Error";
            }
        }

        if (this.trackMovement == true && this.game.objects[2].indexMovementHistory >= -1) {
            this.movementHistory.push({ x: newCoordinate.pxX, y: newCoordinate.pxY });
            if (this.game.objects[2].indexMovementHistory == -1) {
                this.game.objects[2].indexMovementHistory = 0;
            }
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
        ctx.fillText("Score " + score, canvas.width * 0.47, canvas.height * 0.97);
        ctx.restore();
    }
}