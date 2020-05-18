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
            { x: 1, y: 4 },
            { x: 5, y: 4 },
            { x: 5, y: 9 },
            { x: 3, y: 9 },
            { x: 3, y: 6 },
            { x: 1, y: 6 },
            { x: 1, y: 4 }
        ];
    }

    move(dt) {
        console.log(this.currentWaypointIndex);
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


        // if(pacman.X >= ghost.X - 5 && pacman.X <= ghost.X + 25 && pacman.Y >= ghost.Y - 5 && pacman.Y <= ghost.Y + 25){
            // killPacman();
        // }
       
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