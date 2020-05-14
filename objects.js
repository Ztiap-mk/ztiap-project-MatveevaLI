class Pacman extends BaseObject {
 
    get currentCoordinate() {
        return this._currentCoordinate;
    }
    set currentCoordinate(value) {
        this.x = value.pxX;
        this.y = value.pxY;
        this._currentCoordinate = value;

    }

    constructor(grid) {
        super(150, 250, quant, quant);
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('pacman');

        this._currentCoordinate = null;
        this.currentCoordinate = grid.getCoordinateFromPX(150, 250);
        this.height = quant;
        this.width = quant;
        this.currentLevel = grid.currentLevel;
        this.grid = grid;
        this.counter = 0;
        this.currentFrameHeight = 1;
    }

    handleMovement(pacman, newCoordinate) {
        pacman.currentCoordinate = newCoordinate;
    }

    move(dt) {
 
        // Prevent multiple keys hit together
        if (Object.keys(keys).filter(key => key.indexOf("Arrow") > -1 && keys[key] == true).length != 1) {
            return;
        }

        let deltaX = this.currentCoordinate.pxX;
        let deltaY = this.currentCoordinate.pxY;
        let newCoordinate = null;

        if (keys["ArrowLeft"]) { deltaX--; }
        if (keys["ArrowRight"]) { deltaX += quant + 1; deltaY += quant; }
        if (keys["ArrowUp"]) { deltaY--; deltaX += quant; }
        if (keys["ArrowDown"]) { deltaY += quant + 1; deltaX += quant; }
 

        newCoordinate = this.grid.getCoordinateFromPX(deltaX, deltaY);
 
        // Cancel Collision 
        if (keys["ArrowRight"]) { newCoordinate.pxX -= quant; newCoordinate.pxY -= quant; }
        if (keys["ArrowUp"]) { newCoordinate.pxX -= quant; }
        if (keys["ArrowDown"]) { newCoordinate.pxX -= quant; newCoordinate.pxY -= quant; }
 
        if (newCoordinate) {

            switch (newCoordinate.type) {
                case Coordinate.CoordinateType.Empty: this.handleMovement(this, newCoordinate);
                case Coordinate.CoordinateType.Wall: break;
                case Coordinate.CoordinateType.Food: break;
                case Coordinate.CoordinateType.BigFood: break;
                default: throw "Error";
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
            ctx.drawImage(this.image,frame * frame_width,  this.currentFrameHeight , frame_width, frame_height, this.x, this.y, this.width, this.height);
        }

        if (keys["ArrowLeft"]) {
            this.currentFrameHeight = 1 * frame_height;
            ctx.drawImage(this.image,frame * frame_width,  this.currentFrameHeight,frame_width, frame_height, this.x, this.y, this.width, this.height);
        }
   
        if (keys["ArrowUp"]) {
            this.currentFrameHeight = 2 * frame_height;
            ctx.drawImage(this.image,frame * frame_width,  this.currentFrameHeight , frame_width, frame_height, this.x, this.y, this.width, this.height);
        }

        if (keys["ArrowDown"]) {
            this.currentFrameHeight = 3 * frame_height;
            ctx.drawImage(this.image,frame * frame_width, this.currentFrameHeight , frame_width, frame_height, this.x, this.y, this.width, this.height);
        }
                
        else  ctx.drawImage(this.image,frame * frame_width, this.currentFrameHeight , frame_width, frame_height, this.x, this.y, this.width, this.height);
        this.counter = this.counter + .05;
        ctx.restore();
    }
}