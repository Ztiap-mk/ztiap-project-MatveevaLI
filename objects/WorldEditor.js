class WorldEditor {
    constructor() {
        this.quant = 22;
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('food');
        this.newLevel = this.createEmptyGrid(this.quant);
        this.strokePath = this.createStrokePath(this.quant);
        this.fillPath = this.createFillPath(this.quant);

        this.EmptySpaceText = new TextButton(canvas.width * 0.1, canvas.height * 0.95, 200, 40, 20, 'Empty', 'black');
        this.EmptySpaceButton = new ImageButton('emptySpaceTool', canvas.width * 0.2, canvas.height * 0.9, 30, 40, resourceManager.getImageSource('soundOn'));
        this.WallText = new TextButton(canvas.width * 0.3, canvas.height * 0.95, 200, 40, 20, 'Wall', 'black');
        this.WallButton = new ImageButton('WallTool', canvas.width * 0.4, canvas.height * 0.9, 30, 40, resourceManager.getImageSource('soundOn'));
        this.FoodText = new TextButton(canvas.width * 0.5, canvas.height * 0.95, 200, 40, 20, 'Food', 'black');
        this.FoodButton = new ImageButton('FoodTool', canvas.width * 0.6, canvas.height * 0.9, 30, 40, resourceManager.getImageSource('soundOn'));
        this.BigFoodText = new TextButton(canvas.width * 0.7, canvas.height * 0.95, 200, 40, 20, 'Big F.', 'black');
        this.BigFoodButton = new ImageButton('BigFoodTool', canvas.width * 0.8, canvas.height * 0.9, 30, 40, resourceManager.getImageSource('soundOn'));
    }

    createEmptyGrid(quant) {
        let newGrid = [];
        for (let i = 0; i < quant; i++) {
            newGrid[i] = [quant];
            for (let j = 0; j < quant; j++) {
                newGrid[i][j] = {
                    x: j,
                    y: i,
                    type: 0
                };
            }
        }
        return newGrid;
    }

    createStrokePath(quant) {
        let labyrinthPath = new Path2D();
        labyrinthPath.fillStyle = 'black';
        for (let i = 0; i < this.newLevel.length; i++) {
            if (!this.newLevel[i]) {
                this.newLevel[i] = [quant];
            }
            for (let j = 0; j < this.newLevel[i].length; j++) {
                if (!this.newLevel[i][j]) {
                    this.newLevel[i][j] = {
                        x: j,
                        y: i,
                        type: 0
                    };
                }
                labyrinthPath.rect(j * quant, i * quant, quant, quant);
            }
        }
        return labyrinthPath;
    }

    createFillPath(quant) {
        let labyrinthPath = new Path2D();
        labyrinthPath.fillStyle = 'black';
        for (let i = 0; i < this.newLevel.length; i++) {
            for (let j = 0; j < this.newLevel[i].length; j++) {
                if (this.newLevel[i][j].type == Coordinate.CoordinateType.Wall) {
                    labyrinthPath.rect(j * quant, i * quant, quant, quant);
                }
            }
        }
        return labyrinthPath;
    }

    updateFillPath() {
        this.fillPath = this.createFillPath(this.quant);
    }

    render(ctx) {
        ctx.stroke(this.strokePath);
        ctx.fillStyle = 'black';
        ctx.fill(this.fillPath);

        this.EmptySpaceText.render(ctx);
        this.EmptySpaceButton.render(ctx);
        this.WallText.render(ctx);
        this.WallButton.render(ctx);
        this.FoodText.render(ctx);
        this.FoodButton.render(ctx);
        this.BigFoodText.render(ctx);
        this.BigFoodButton.render(ctx);
    }

    handleEvent(e) {
        if (e.type == "click") {
            var rect = this.canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var cellX = Math.floor(x / this.quant);
            var cellY = Math.floor(y / this.quant);
            this.newLevel[cellY][cellX].type = Coordinate.CoordinateType.Wall;
            this.updateFillPath();
        }
    }

    update(dt) {
    }
}