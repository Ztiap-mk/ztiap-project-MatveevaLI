class Duch extends BaseObject {
    get currentCoordinate() {
        return this._currentCoordinate;
    }
    set currentCoordinate(value) {
        this.x = value.pxX;
        this.y = value.pxY;
        this._currentCoordinate = value;
    }

    constructor(game) {
        super(Math.random() * canvas.width, Math.random() * 500, 40, 40);
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('duch');
        this.game = game;


        this._currentCoordinate = null;
        //this.currentCoordinate = this.game.grid.getPXCoordinateFromCell(this.waypoint[0].x, this.waypoint[0].y);
        this.waypoint = this.initializeWaypoint();
    }

    handleEvent(ev) {
    }

    initializeWaypoint() {
        return [
            {x: 1, y: 4},
            {x: 5, y: 4},
            {x: 5, y: 9},
            {x: 3, y: 9},
            {x: 3, y: 6},
            {x: 1, y: 6},
            {x: 1, y: 4},
        ];
    }

    move(dt) {
        this.currentCoordinate = this.game.grid.getPXCoordinateFromCell(this.waypoint[0].x, this.waypoint[0].y);
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