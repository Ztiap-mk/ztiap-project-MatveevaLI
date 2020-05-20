class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        gameStartedOn = Date.now();

        this.background = resourceManager.getImageSource('gamePause');
        this.grid = new Grid();
        this.grid.redrawLabyrinthCallback = this.updateLabyrinthPath;

        this.randX = null;
        this.randY = null;

        if (killPacman == false && score == 0 && lastLevel == false) {
            this.grid.LoadLevel("level1");
            foodLeft = this.grid.getFoodCount("level1");
            console.log('Food left : ' + foodLeft);
        }
        else if (killPacman == true && lastLevel == false) {
            killPacman = false;
            this.grid.LoadLevel("level1");
            score = 0;
        }

        else if (killPacman == false && foodLeft == 0 && lastLevel == false) {
            this.grid.LoadLevel("level2");
            foodLeft = this.grid.getFoodCount("level2");
            lastLevel = true;
        }

        else {
            this.grid.LoadLevel("level1");
            score = 0;
        }

        quant = Math.floor(canvas.width / this.grid.CurrentLevel.length);

        const soundEating = new Sound('eating');
        const soundDie = new Sound('die');

        this.cherryImg = null;

        this.calculateLabyrinthPath();

        this.cherryImage = resourceManager.getImageSource('cherry');
        this.foodImage = resourceManager.getImageSource('food');

        const backButton = new TextButton(canvas.width * 0.17, canvas.height * 0.97, 300, 20, 20, 'Back to Menu', 'black');
        const pauseButton = new TextButton(canvas.width * 0.9, canvas.height * 0.97, 300, 20, 20, 'Pause', 'black');

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
                if (cell.type == Coordinate.CoordinateType.Wall) {
                    this.labyrinthPath.rect(y * quant, x * quant, quant, quant);
                }
                if (cell.type == Coordinate.CoordinateType.Food) {
                    this.labyrinthPath.moveTo(y * quant + quant / 2, x * quant + quant / 2);
                    this.labyrinthPath.arc(y * quant + quant / 2, x * quant + quant / 2, 5, 0, 2 * Math.PI);
                }
                if (cell.type == Coordinate.CoordinateType.BigFood) {
                    this.labyrinthPath.moveTo(y * quant + quant / 2, x * quant + quant / 2);
                    this.labyrinthPath.arc(y * quant + quant / 2, x * quant + quant / 2, 8, 0, 2 * Math.PI);
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

    processButtons(x, y) {
        if ((x >= canvas.width * 0.17 - 90 && x <= canvas.width * 0.17 + 80) && (y >= canvas.height * 0.97 - 20 && y <= canvas.height * 0.98)) {
            this.stateManager.changeState(StateManager.STATES.MAINMENU);
        }
        else if ((x >= canvas.width * 0.9 - 40 && x <= canvas.width * 0.9 + 40) && (y >= canvas.height * 0.97 - 20 && y <= canvas.height * 0.98)) {
            this.stateManager.changeState(StateManager.STATES.PAUSE);
        }
    }

    handleEvent(ev) {
        if (ev.type == "click") {
            var rect = canvas.getBoundingClientRect();
            var x = ev.clientX - rect.left;
            var y = ev.clientY - rect.top;
            this.processButtons(x, y);
        }

        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'q') {
            this.stateManager.changeState(StateManager.STATES.MAINMENU);
        }

        if (isKeyPressEvent(ev) && ev.key === 'p') {
            this.stateManager.changeState(StateManager.STATES.PAUSE);
        }
    }
}