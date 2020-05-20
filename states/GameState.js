class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        gameStartedOn = Date.now();

        this.background = resourceManager.getImageSource('bgpause');
        this.grid = new Grid();
        this.grid.redrawLabyrinthCallback = this.updateLabyrinthPath;

        this.randX = null;
        this.randY = null;

        this.grid.LoadLevel("level1");
        quant = Math.floor(canvas.width / this.grid.CurrentLevel.length);

        this.bgImage = resourceManager.getImageSource('bg');
        this.fgImage = resourceManager.getImageSource('fg');

        const soundEating = new Sound('eating');
        const soundDie = new Sound('die');

        this.cherryImg = null;

        this.calculateLabyrinthPath();

        this.cherryImage = resourceManager.getImageSource('cherry');
        this.foodImage = resourceManager.getImageSource('food');

        const backButton = new TextButton(canvas.width * 0.17, canvas.height * 0.97, 300, 20, 20, 'Back to Menu', 'black');
        backButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.MAIN_MENU);
        });

        const pauseButton = new TextButton(canvas.width * 0.9, canvas.height * 0.97, 300, 20, 20, 'Pause', 'black');
        pauseButton.onClick((ev) => {
            this.stateManager.changeState(StateManager.STATES.PAUSE);
        });

        const ghost = new Ghost(this);
        const pacman = new Pacman(this);

        this.objects = [
            backButton,
            pauseButton,
            ghost,
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

    getRand() {
        this.randX = Math.trunc(Math.random() * quant);
        this.randY = Math.trunc(Math.random() * quant);
        if (this.grid.CurrentLevel[this.randY][this.randX].type != Coordinate.CoordinateType.Empty) {
            this.getRand();
        }
    }

    renderCherry(ctx) {
        if (Math.trunc((Date.now() - gameStartedOn) / 1000) >= 7 && 20 >= Math.trunc((Date.now() - gameStartedOn) / 1000)) {
            if (this.cherryImg == null) {
                this.getRand();
                this.grid.CurrentLevel[this.randY][this.randX].type = Coordinate.CoordinateType.Cherry;
                const pxX = this.randX * quant;
                const pxY = this.randY * quant;
                this.cherryImg = new ImageButton('CherryImg', pxX, pxY, quant, quant, resourceManager.getImageSource('cherry'));
            }
            if (this.grid.CurrentLevel[this.randY][this.randX].type == Coordinate.CoordinateType.Cherry) {
                this.cherryImg.render(ctx);
            }
        }
    }

    render(ctx) {
        this.ctx.drawImage(this.background, 0, 0, canvas.width, 500);
        ctx.fillStyle = '#151584';
        ctx.fill(this.labyrinthPath);

        for (let index = 0; index < this.objects.length; index++) {
            const element = this.objects[index];
            element.render(this.ctx);
        }
        this.renderCherry(ctx);
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });


        if (isKeyPressEvent(ev) && ev.key === 'q') {
            this.stateManager.changeState(StateManager.STATES.MAIN_MENU);
        }

        if (isKeyPressEvent(ev) && ev.key === 'p') {
            this.stateManager.changeState(StateManager.STATES.PAUSE);
        }
    }
}