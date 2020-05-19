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
        super(null, null, 40, 40);
        this.canvas = document.getElementById("canvas");
        this.game = game;
        this.grid = game.grid;
        var movableNodes = this.calculateMovableNodes();
        this.image = resourceManager.getImageSource('ghost');

        this.currentWaypointIndex = 0;

        this._currentCoordinate = null;
        this.waypoint = this.initializeWaypoint();
        this.currentCoordinate = this.game.grid.getPXCoordinateFromCell(this.waypoint[0].x, this.waypoint[0].y);

        this.indexMovementHistory = -1;
    }

    handleEvent(ev) {
    }

    calculateMovableNodes() {
        var movableNodes = [];
        for (let y = 0; y < this.grid.CurrentLevel.length; y++) {
            for (let x = 0; x < this.grid.CurrentLevel[y].length; x++) {
                const cur = this.grid.CurrentLevel[y][x];
                if (cur && cur.type != Coordinate.CoordinateType.Wall) {
                    const curPX = this.grid.CurrentLevel[y][x + 1];
                    const curMX = this.grid.CurrentLevel[y][x - 1];
                    const curPY = this.grid.CurrentLevel[y + 1][x];
                    const curMY = this.grid.CurrentLevel[y - 1][x];
                    if ((curPY && curPY.type != Coordinate.CoordinateType.Wall) || (curMY && curMY.type != Coordinate.CoordinateType.Wall)) {
                        if ((curPX && curPX.type != Coordinate.CoordinateType.Wall) || (curMX && curMX.type != Coordinate.CoordinateType.Wall)) {
                            movableNodes.push(this.grid.CurrentLevel[y][x]);
                        }
                    }
                }
            }
        }
        return movableNodes;
    }

    findShortestPath(start, end, existingPathes, currentPath) {
        existingPathes = [];
        if (currentPath == null) {
            currentPath.nodes = [start];
            currentPath.length = 0;
        }

        let i = 0;
        for (let i = 0; i < this.grid.CurrentLevel.length - start.cellX; i++) {
            if (this.grid.CurrentLevel[start.cellY][start.cellX + i].type == Coordinate.CoordinateType.Wall) {
                break;
            }
        }
        var endNode = this.grid.CurrentLevel[start.cellY][start.cellX + i];
        currentPath.nodes.push(endNode);
        currentPath.length += i;
    }

    initializeWaypoint() {

        return [
            { x: 1, y: 1 },
            { x: 10, y: 1 },
            { x: 10, y: 8 },
            { x: 1, y: 8 },
            { x: 1, y: 1 }
        ];
    }

    killPacman(CoordinatePacmanpxX, CoordinatePacmanpxY) {

        if (this.currentCoordinate.pxX == CoordinatePacmanpxX && this.currentCoordinate.pxY == CoordinatePacmanpxY) {
            debugger;
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

        if (this.currentCoordinate.pxY == newCoordinate.pxY && this.currentCoordinate.pxX == newCoordinate.pxX) {
            this.indexMovementHistory++; 
            while (this.game.objects[3].movementHistory[this.indexMovementHistory].x == this.game.objects[3].movementHistory[this.indexMovementHistory+1].x
               &&  this.game.objects[3].movementHistory[this.indexMovementHistory].y ==  this.game.objects[3].movementHistory[this.indexMovementHistory+1].y ) { 
                this.indexMovementHistory++; 
            }
        }
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
        ctx.drawImage(this.image, 0, 0, 20, 20);
        ctx.restore();
    }
}