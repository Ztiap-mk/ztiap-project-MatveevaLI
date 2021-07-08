class WorldEditor {
    constructor() {
        this.quant = 22;
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('food');
        this.newLevel = this.createEmptyGrid(this.quant);
        this.strokePath = this.createStrokePath(this.quant);
        this.fillPath = this.createFillPath(this.quant);

        this.selectedTool = Coordinate.CoordinateType.Wall;

        this.EmptySpaceText = new TextButton(canvas.width * 0.1, canvas.height * 0.95, 200, 40, 20, 'Eraser', 'black');
        this.EmptySpaceButton = new ImageButton('emptySpaceTool', canvas.width * 0.165, canvas.height * 0.906, 32, 32, resourceManager.getImageSource('eraser'));
        this.WallText = new TextButton(canvas.width * 0.3, canvas.height * 0.95, 200, 40, 20, 'Wall', 'black');
        this.WallButton = new ImageButton('WallTool', canvas.width * 0.365, canvas.height * 0.906, 32, 32, resourceManager.getImageSource('wall'));
        this.FoodText = new TextButton(canvas.width * 0.5, canvas.height * 0.95, 200, 40, 20, 'Food', 'black');
        this.FoodButton = new ImageButton('FoodTool', canvas.width * 0.565, canvas.height * 0.906, 32, 32, resourceManager.getImageSource('food'));
        this.BigFoodText = new TextButton(canvas.width * 0.7, canvas.height * 0.95, 200, 40, 20, 'Big F.', 'black');
        this.BigFoodButton = new ImageButton('BigFoodTool', canvas.width * 0.77, canvas.height * 0.906, 32, 32, resourceManager.getImageSource('BigFood'));

        this.SaveLevelButton = new ImageButton('SaveLevel', canvas.width * 0.9, canvas.height * 0.906, 32, 32, resourceManager.getImageSource('saveLevel'));
    }

    createEmptyGrid(quant) {
        let newGrid = [];
        for (let i = 0; i < quant; i++) {
            newGrid[i] = [quant];
            for (let j = 0; j < quant; j++) {
                if (i == 0 || i == quant - 1 || j == 0 || j == quant - 1) {
                    newGrid[i][j] = {
                        x: j,
                        y: i,
                        type: Coordinate.CoordinateType.Wall
                    };
                }
                else {
                    newGrid[i][j] = {
                        x: j,
                        y: i,
                        type: Coordinate.CoordinateType.Empty
                    };
                }
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
                else if (this.newLevel[i][j].type == Coordinate.CoordinateType.Food) {
                    labyrinthPath.moveTo(j * quant + quant / 2, i * quant + quant / 2);
                    labyrinthPath.arc(j * quant + quant / 2, i * quant + quant / 2, 5, 0, 2 * Math.PI);
                }
                else if (this.newLevel[i][j].type == Coordinate.CoordinateType.BigFood) {
                    labyrinthPath.moveTo(j * quant + quant / 2, i * quant + quant / 2);
                    labyrinthPath.arc(j * quant + quant / 2, i * quant + quant / 2, 8, 0, 2 * Math.PI);
                }
            }
        }
        return labyrinthPath;
    }

    updateFillPath() {
        this.fillPath = this.createFillPath(this.quant);
    }

    renderSelectedTool(ctx) {
        switch (this.selectedTool) {
            case Coordinate.CoordinateType.Empty: {
                ctx.globalAlpha = 0.2;
                ctx.fillRect(canvas.width * 0.03, canvas.height * 0.90, 106, 40);
                ctx.globalAlpha = 1.0;
                break;
            }
            case Coordinate.CoordinateType.Wall: {
                ctx.globalAlpha = 0.2;
                ctx.fillRect(canvas.width * 0.25, canvas.height * 0.90, 95, 40);
                ctx.globalAlpha = 1.0;
                break;
            }
            case Coordinate.CoordinateType.Food: {
                ctx.globalAlpha = 0.2;
                ctx.fillRect(canvas.width * 0.45, canvas.height * 0.90, 94, 40);
                ctx.globalAlpha = 1.0;
                break;
            }
            case Coordinate.CoordinateType.BigFood: {
                ctx.globalAlpha = 0.2;
                ctx.fillRect(canvas.width * 0.64, canvas.height * 0.90, 100, 40);
                ctx.globalAlpha = 1.0;
                break;
            }
            default: break;
        }
    }

    render(ctx) {
        ctx.stroke(this.strokePath);
        ctx.fillStyle = 'black';
        ctx.fill(this.fillPath);

        this.renderSelectedTool(ctx);

        this.EmptySpaceText.render(ctx);
        this.EmptySpaceButton.render(ctx);
        this.WallText.render(ctx);
        this.WallButton.render(ctx);
        this.FoodText.render(ctx);
        this.FoodButton.render(ctx);
        this.BigFoodText.render(ctx);
        this.BigFoodButton.render(ctx);
        this.SaveLevelButton.render(ctx);
    }

    processGridClick(x, y) {
        var cellX = Math.floor(x / this.quant);
        var cellY = Math.floor(y / this.quant);
        if (this.newLevel[cellY] && this.newLevel[cellY][cellX]) {
            this.newLevel[cellY][cellX].type = this.selectedTool;
            this.updateFillPath();
        }
    }

    processToolClick(x, y) {
        if ((x >= canvas.width * 0.03 && x <= canvas.width * 0.03 + 80) && (y >= canvas.height * 0.90 && y <= canvas.height * 0.90 + 40)) {
            this.selectedTool = Coordinate.CoordinateType.Empty;
        }
        else if ((x >= canvas.width * 0.25 && x <= canvas.width * 0.25 + 95) && (y >= canvas.height * 0.90 && y <= canvas.height * 0.90 + 40)) {
            this.selectedTool = Coordinate.CoordinateType.Wall;
        }
        else if ((x >= canvas.width * 0.45 && x <= canvas.width * 0.45 + 94) && (y >= canvas.height * 0.90 && y <= canvas.height * 0.90 + 40)) {
            this.selectedTool = Coordinate.CoordinateType.Food;
        }
        else if ((x >= canvas.width * 0.64 && x <= canvas.width * 0.64 + 100) && (y >= canvas.height * 0.90 && y <= canvas.height * 0.90 + 40)) {
            this.selectedTool = Coordinate.CoordinateType.BigFood;
        }
    }

    processSaveLevelClick(x, y) {
        if ((x >= canvas.width * 0.9 && x <= canvas.width * 0.9 + 32) && (y >= canvas.height * 0.91 && y <= canvas.height * 0.91 + 32)) {
            const levelString = JSON.stringify(this.newLevel);
            var levelBlob = new Blob([levelString], {
                type: 'text/plain'
            });
            let a = document.createElement("a");
            let url = URL.createObjectURL(levelBlob);
            a.href = url;
            a.download = "level.json";
            a.text = "Download level.json";
            document.getElementById('downloadArea').className = "downloadArea";
            document.getElementById('downloadArea').appendChild(a);
        }
    }

    handleEvent(e) {
        if (e.type == "click") {
            var rect = this.canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            this.processGridClick(x, y);
            this.processToolClick(x, y);
            this.processSaveLevelClick(x, y);
        }
    }

    update(dt) {
    }
}