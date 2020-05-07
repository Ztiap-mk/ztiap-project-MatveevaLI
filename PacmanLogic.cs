public enum Type = {
    0 = Empty,
    1 = Full,
    2 = Food,
    3 = BigFood
}

class Coordinate {
    public Type CoordinateType;
}

static class Grid {
    private List<Coordinate> listOfCoordinates;

    public Coordinate GetCoordinate(int x, int y) {
        return listOfCoordinates.Where(element => element.x = x && element.y = y);
    }
}

class Pacman {
    int x;
    int y;
    int Score = 0;

    public void move(int newCoordinateX, int newCoordinateY){
        Coordinate newCoordinate = Grid.GetCoordinate(newCoordinateX, newCoordinateY);
        switch (newCoordinate.CoordinateType) {
            case (Type.Empty): this.x = newCoordinateX; this.y = newCoordinateY; break;
            case (Type.Full): return;
            case (Type.Food): this.Score += 10; break;
            case (Type.BigFood): this.Score += 100; break;
        }
        return;
    }
}

Pacman pacman = new Pacman();

public EventHandler OnLeftArrow(){
    pacman.move(pacman.x - 1, pacman.y);
}

public EventHandler OnRightArrow(){
    pacman.move(pacman.x + 1, pacman.y);
}

public EventHandler OnDownArrow(){
    pacman.move(pacman.x, pacman.y + 1);
}

public EventHandler OnUpArrow(){
    pacman.move(pacman.x, pacman.y - 1);
}