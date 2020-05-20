class Ghost extends BaseObject {
    get currentCoordinate() {
        return this._currentCoordinate;
    }
    set currentCoordinate(value) {
        this.x = value.pxX;
        this.y = value.pxY;
        this._currentCoordinate = value;
    }

    constructor(game) {
        super(null, null, quant, quant);
        this.canvas = document.getElementById("canvas");
        this.game = game;
        this.grid = game.grid;

        this.image = resourceManager.getImageSource('ghost');

        this.dieSound = new Sound('die');
        this.currentWaypointIndex = 0;

        this._currentCoordinate = null;
        this.waypoint = this.initializeWaypoint();
        this.currentCoordinate = this.game.grid.getPXCoordinateFromCell(this.waypoint[0].x, this.waypoint[0].y);

        this.indexMovementHistory = -1;
    }

    handleEvent(ev) {
    }

    initializeWaypoint() {

        return [
            { x: 4, y: 4 },
            { x: 10, y: 1 },
            { x: 10, y: 8 },
            { x: 1, y: 8 },
            { x: 4, y: 4 }
        ];
    }

    gameOver() {
        this.dieSound.play();
        killPacman = true;
        this.game.stateManager.changeState(StateManager.STATES.GAMEOVER);
    }

    killPacman(CoordinatePacmanpxX, CoordinatePacmanpxY) {

        if (this.currentCoordinate.pxX == CoordinatePacmanpxX && this.currentCoordinate.pxY == CoordinatePacmanpxY) {

            this.gameOver();
        }

        let newWaypointElement = this.game.objects[3].movementHistory[this.indexMovementHistory];
        let newCoordinate = this.game.grid.getCoordinateFromPX(newWaypointElement.x, newWaypointElement.y);

        if (this.currentCoordinate.pxX != newCoordinate.pxX) {
            var step = 0;
            while (this.currentCoordinate.pxX != newCoordinate.pxX && step != 2) {
                var directionPointer;
                if (this.currentCoordinate.pxX > newCoordinate.pxX) {
                    directionPointer = -1;
                }
                else {
                    directionPointer = 1;
                }
                this.currentCoordinate = new Coordinate(this.currentCoordinate.pxX + directionPointer, this.currentCoordinate.pxY, this.currentCoordinate.cellX, this.currentCoordinate.cellY, this.currentCoordinate.type);
                step++;
            }
        }

        if (this.currentCoordinate.pxX == newCoordinate.pxX && this.currentCoordinate.pxY != newCoordinate.pxY) {
            var step = 0;
            while (this.currentCoordinate.pxY != newCoordinate.pxY && step != 2) {
                var directionPointer;
                if (this.currentCoordinate.pxY > newCoordinate.pxY) {
                    directionPointer = -1;
                }
                else {
                    directionPointer = 1;
                }
                this.currentCoordinate = new Coordinate(this.currentCoordinate.pxX, this.currentCoordinate.pxY + directionPointer, this.currentCoordinate.cellX, this.currentCoordinate.cellY, this.currentCoordinate.type);
                step++;
            }
        }
        if ((this.currentCoordinate.pxX != CoordinatePacmanpxX) || (this.currentCoordinate.pxY != CoordinatePacmanpxY)) {
            if (this.currentCoordinate.pxY == newCoordinate.pxY && this.currentCoordinate.pxX == newCoordinate.pxX) {

                this.indexMovementHistory++;

                if (this.indexMovementHistory < this.game.objects[3].movementHistory[this.indexMovementHistory].length) {
                    while ((this.game.objects[3].movementHistory[this.indexMovementHistory].x == this.game.objects[3].movementHistory[this.indexMovementHistory + 1].x
                        && this.game.objects[3].movementHistory[this.indexMovementHistory].y == this.game.objects[3].movementHistory[this.indexMovementHistory + 1].y)) {
                        this.indexMovementHistory++;

                    }
                }
            }
        }
        else this.gameOver;
    }

    move(dt) {

        if (this.game.objects[3].trackMovement == false || this.indexMovementHistory == -1) {

            if (this.currentWaypointIndex + 1 == this.waypoint.length) {
                this.currentWaypointIndex = 0;
            }

            let newWaypointElement = this.waypoint[this.currentWaypointIndex + 1];
            let newCoordinate = this.game.grid.getPXCoordinateFromCell(newWaypointElement.x, newWaypointElement.y);

            if (this.currentCoordinate.pxX == newCoordinate.pxX && this.currentCoordinate.pxY != newCoordinate.pxY) {
                var directionPointer;
                if (this.currentCoordinate.pxY > newCoordinate.pxY) {
                    directionPointer = -1;
                }
                else {
                    directionPointer = 1;
                }

                this.currentCoordinate = new Coordinate(this.currentCoordinate.pxX, this.currentCoordinate.pxY + directionPointer, this.currentCoordinate.cellX, this.currentCoordinate.cellY, this.currentCoordinate.type);
            }
            else if (this.currentCoordinate.pxX != newCoordinate.pxX && this.currentCoordinate.pxY == newCoordinate.pxY) {
                var directionPointer;
                if (this.currentCoordinate.pxX > newCoordinate.pxX) {
                    directionPointer = -1;
                }
                else {
                    directionPointer = 1;
                }
                this.currentCoordinate = new Coordinate(this.currentCoordinate.pxX + directionPointer, this.currentCoordinate.pxY, this.currentCoordinate.cellX, this.currentCoordinate.cellY, this.currentCoordinate.type);
            }

            if (this.currentCoordinate.pxX == this.waypoint[this.currentWaypointIndex + 1].x * quant &&
                this.currentCoordinate.pxY == this.waypoint[this.currentWaypointIndex + 1].y * quant) {
                this.currentWaypointIndex++;
            }
        }

        var CoordinatePacmanpxX = this.game.objects[3].x;
        var CoordinatePacmanpxY = this.game.objects[3].y;

        if (this.game.objects[3].trackMovement == true && this.indexMovementHistory >= 0) {
            this.killPacman(CoordinatePacmanpxX, CoordinatePacmanpxY);
        }

        if (this.game.objects[3].trackMovement == false) {
            if (CoordinatePacmanpxX >= this.currentCoordinate.pxX - 25 && CoordinatePacmanpxX <= this.currentCoordinate.pxX + 45 &&
                CoordinatePacmanpxY >= this.currentCoordinate.pxY - 25 && CoordinatePacmanpxY <= this.currentCoordinate.pxY + 45) {
                this.game.objects[3].trackMovement = true;

            }
        }

    }

    update(dt) {
        this.move(dt);
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.image, 0, 0, quant, quant);
        ctx.restore();
    }
}