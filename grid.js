function getGridState(){
    var grid = [
        [
            {type: 1},
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}, 
            {type: 1}
        ], // line 0
        [
            {type: 1},//0
            {type: 3},//1
            {type: 2},//2
            {type: 2}, //3
            {type: 2}, //4
            {type: 2}, //5
            {type: 2}, //6
            {type: 2}, //7
            {type: 2}, //8
            {type: 2}, //9
            {type: 2}, //10
            {type: 2}, //11
            {type: 2}, //12
            {type: 2}, //13
            {type: 2}, //14
            {type: 2}, //15
            {type: 3}, //16
            {type: 2}, //17
            {type: 2}, //18
            {type: 3}, //19
            {type: 2}, //20
            {type: 1}, //21
            {type: 3}, //22
            {type: 2}, //23
            {type: 1} //24
        ], // line 1
        [
            {type: 1},//0
            {type: 3},//1
            {type: 2},//2
            {type: 2}, //3
            {type: 2}, //4
            {type: 2}, //5
            {type: 2}, //6
            {type: 2}, //7
            {type: 2}, //8
            {type: 2}, //9
            {type: 2}, //10
            {type: 2}, //11
            {type: 2}, //12
            {type: 2}, //13
            {type: 2}, //14
            {type: 2}, //15
            {type: 3}, //16
            {type: 3}, //17
            {type: 3}, //18
            {type: 3}, //19
            {type: 3}, //20
            {type: 1}, //21
            {type: 3}, //22
            {type: 2}, //23
            {type: 1} //24     
        ], // line 2
        [
            {type: 1},//0
            {type: 2},//1
            {type: 2},//2
            {type: 1}, //3
            {type: 1}, //4
            {type: 1}, //5
            {type: 1}, //6
            {type: 1}, //7
            {type: 1}, //8
            {type: 1}, //9
            {type: 2}, //10
            {type: 2}, //11
            {type: 1}, //12
            {type: 1}, //13
            {type: 1}, //14
            {type: 1}, //15
            {type: 1}, //16
            {type: 1}, //17
            {type: 1}, //18
            {type: 3}, //19
            {type: 3}, //20
            {type: 1}, //21
            {type: 3}, //22
            {type: 2}, //23
            {type: 1} //24
        ], // line 3
        [
            {type: 1},//0
            {type: 2},//1
            {type: 2},//2
            {type: 1}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 1}, //9
            {type: 2}, //10
            {type: 2}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 0}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 2}, //19
            {type: 2}, //20
            {type: 1}, //21
            {type: 3}, //22
            {type: 2}, //23
            {type: 1} //24
        ], // line 4
        [
            {type: 1},//0
            {type: 2},//1
            {type: 2},//2
            {type: 1}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 1}, //9
            {type: 2}, //10
            {type: 2}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 0}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 2}, //19
            {type: 2}, //20
            {type: 1}, //21
            {type: 2}, //22
            {type: 2}, //23
            {type: 1} //24
        ], // line 5
        [
            {type: 1},//0
            {type: 2},//1
            {type: 2},//2
            {type: 1}, //3
            {type: 1}, //4
            {type: 1}, //5
            {type: 1}, //6
            {type: 1}, //7
            {type: 1}, //8
            {type: 1}, //9
            {type: 2}, //10
            {type: 2}, //11
            {type: 1}, //12
            {type: 1}, //13
            {type: 1}, //14
            {type: 1}, //15
            {type: 1}, //16
            {type: 1}, //17
            {type: 1}, //18
            {type: 3}, //19
            {type: 2}, //20
            {type: 1}, //21
            {type: 3}, //22
            {type: 2}, //23
            {type: 1} //24
        ], // line 6
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 0}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 0}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 0}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 7
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 0}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 0}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 0}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 8
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 1}, //3
            {type: 1}, //4
            {type: 1}, //5
            {type: 1}, //6
            {type: 1}, //7
            {type: 1}, //8
            {type: 1}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 1}, //16
            {type: 1}, //17
            {type: 1}, //18
            {type: 1}, //19
            {type: 1}, //20
            {type: 1}, //21
            {type: 1}, //22
            {type: 1}, //23
            {type: 1} //24
        ], // line 9
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 1}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 1}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 0}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 0}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 1}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 10
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 1}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 1}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 0}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 0}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 1}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 11
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 1}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 1}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 1}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 1}, //13
            {type: 1}, //14
            {type: 1}, //15
            {type: 1}, //16
            {type: 1}, //17
            {type: 1}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 1}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 12
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 1}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 0}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 0}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 13
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 1}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 0}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 0}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 14
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 1}, //3
            {type: 1}, //4
            {type: 1}, //5
            {type: 1}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 1}, //9
            {type: 1}, //10
            {type: 1}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 1}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 1}, //23
            {type: 1} //24
        ], // line 15
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 16
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 17
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 1}, //3
            {type: 1}, //4
            {type: 1}, //5
            {type: 1}, //6
            {type: 1}, //7
            {type: 1}, //8
            {type: 1}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 18
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 19
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 20
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 21
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 22
        [
            {type: 1},//0
            {type: 0},//1
            {type: 0},//2
            {type: 0}, //3
            {type: 0}, //4
            {type: 0}, //5
            {type: 0}, //6
            {type: 0}, //7
            {type: 0}, //8
            {type: 0}, //9
            {type: 0}, //10
            {type: 0}, //11
            {type: 1}, //12
            {type: 0}, //13
            {type: 0}, //14
            {type: 1}, //15
            {type: 0}, //16
            {type: 0}, //17
            {type: 1}, //18
            {type: 0}, //19
            {type: 0}, //20
            {type: 0}, //21
            {type: 0}, //22
            {type: 0}, //23
            {type: 1} //24
        ], // line 23
        [
            {type: 1},//0
            {type: 1},//1
            {type: 1},//2
            {type: 1}, //3
            {type: 1}, //4
            {type: 1}, //5
            {type: 1}, //6
            {type: 1}, //7
            {type: 1}, //8
            {type: 1}, //9
            {type: 1}, //10
            {type: 1}, //11
            {type: 1}, //12
            {type: 1}, //13
            {type: 1}, //14
            {type: 1}, //15
            {type: 1}, //16
            {type: 1}, //17
            {type: 1}, //18
            {type: 1}, //19
            {type: 1}, //20
            {type: 1}, //21
            {type: 1}, //22
            {type: 1}, //23
            {type: 1} //24
        ], // line 24
    ];
    
    // Types
    // 0 - Empty
    // 1 - Full
    // 2 - Food
    // 3 - Big Food
    
    return grid;
}

class Point {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
      }
}

class Row {
    
}