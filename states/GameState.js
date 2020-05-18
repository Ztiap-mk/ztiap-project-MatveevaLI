class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.background = resourceManager.getImageSource('bgpause');

        this.grid = new Grid();
        this.grid.redrawLabyrinthCallback = this.updateLabyrinthPath;

        this.grid.LoadLevel("level1");
        quant = Math.floor(canvas.width / this.grid.CurrentLevel.length);

        const soundEating = new Sound('eating');
        const soundDie = new Sound('die');

        // this.isMuted = true;
        // soundEating.playsound();

        this.calculateLabyrinthPath();
        const backButton = new TextButton(canvas.width * 0.06, canvas.height * 0.97, 300, 20, 20, 'Back to Menu', 'black');
        backButton.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });

        const pauseButton = new TextButton(canvas.width * 0.8, canvas.height * 0.97, 300, 20, 20, 'Pause', 'black');
        pauseButton.onClick((ev) => {
            this.stateManager.changeState(STATES.PAUSE);
        });

        const gamer = this;

        const duch = new Duch(this);
        const pacman = new Pacman(this);

        // duch a pacman
        this.objects = [
            backButton,
            pauseButton,
            duch,
            pacman,
        ];
    }

    calculateLabyrinthPath() {
        this.labyrinthPath = new Path2D();
        this.labyrinthPath.fillStyle = 'black';
        for (let x = 0; x < this.grid.CurrentLevel.length; x++) {
            const row = this.grid.CurrentLevel[x];
            for (let y = 0; y < row.length; y++) {
                const cell = row[y];
                if (x == 14 && y == 9) console.log("Labyrint x = " + this.grid.CurrentLevel[x][y].x + " y = " + this.grid.CurrentLevel[x][y].y + " type = " + this.grid.CurrentLevel[x][y].type);
                if (cell.type == Coordinate.CoordinateType.Wall) {
                    this.labyrinthPath.rect(y * quant, x * quant, quant, quant);
                }
                if (cell.type == Coordinate.CoordinateType.Food) {
                    this.labyrinthPath.arc(y * quant, x * quant, 5, 0, 2 * Math.PI);
                }
                if (cell.type == Coordinate.CoordinateType.BigFood) {
                    this.labyrinthPath.arc(y * quant, x * quant, 8, 0, 2 * Math.PI);
                }
            }
        }
    }

    update(dt) {
        for (let index = 0; index < this.objects.length; index++) {
            const element = this.objects[index];
            element.update(dt);
        }
    }

    render(ctx) {
        this.ctx.drawImage(this.background, 0, 0, 500, 500);
        ctx.fillStyle = '#151584';
        ctx.fill(this.labyrinthPath);
 
        for (let index = 0; index < this.objects.length; index++) {
            const element = this.objects[index];
            element.render(this.ctx);
        }
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'q') {
            this.stateManager.changeState(STATES.MAIN_MENU);
        }

        if (isKeyPressEvent(ev) && ev.key === 'p') {
            this.stateManager.changeState(STATES.PAUSE);
        }
    }
}
