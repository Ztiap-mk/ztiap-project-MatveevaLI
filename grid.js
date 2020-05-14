class Grid {
    static Levels = [
        {
            name: "level1",
            data: '[[{"type":1,"x":0,"y":0},{"type":1,"x":1,"y":0},{"type":1,"x":2,"y":0},{"type":1,"x":3,"y":0},{"type":1,"x":4,"y":0},{"type":1,"x":5,"y":0},{"type":1,"x":6,"y":0},{"type":1,"x":7,"y":0},{"type":1,"x":8,"y":0},{"type":1,"x":9,"y":0},{"type":1,"x":10,"y":0},{"type":1,"x":11,"y":0},{"type":1,"x":12,"y":0},{"type":1,"x":13,"y":0},{"type":1,"x":14,"y":0},{"type":1,"x":15,"y":0},{"type":1,"x":16,"y":0},{"type":1,"x":17,"y":0},{"type":1,"x":18,"y":0},{"type":1,"x":19,"y":0},{"type":1,"x":20,"y":0},{"type":1,"x":21,"y":0},{"type":1,"x":22,"y":0},{"type":1,"x":23,"y":0},{"type":1,"x":24,"y":0}],[{"type":1,"x":0,"y":1},{"type":0,"x":1,"y":1},{"type":0,"x":2,"y":1},{"type":0,"x":3,"y":1},{"type":0,"x":4,"y":1},{"type":0,"x":5,"y":1},{"type":0,"x":6,"y":1},{"type":0,"x":7,"y":1},{"type":0,"x":8,"y":1},{"type":0,"x":9,"y":1},{"type":0,"x":10,"y":1},{"type":0,"x":11,"y":1},{"type":0,"x":12,"y":1},{"type":0,"x":13,"y":1},{"type":0,"x":14,"y":1},{"type":0,"x":15,"y":1},{"type":0,"x":16,"y":1},{"type":0,"x":17,"y":1},{"type":0,"x":18,"y":1},{"type":0,"x":19,"y":1},{"type":0,"x":20,"y":1},{"type":1,"x":21,"y":1},{"type":0,"x":22,"y":1},{"type":0,"x":23,"y":1},{"type":1,"x":24,"y":1}],[{"type":1,"x":0,"y":2},{"type":0,"x":1,"y":2},{"type":0,"x":2,"y":2},{"type":0,"x":3,"y":2},{"type":0,"x":4,"y":2},{"type":0,"x":5,"y":2},{"type":0,"x":6,"y":2},{"type":0,"x":7,"y":2},{"type":0,"x":8,"y":2},{"type":0,"x":9,"y":2},{"type":0,"x":10,"y":2},{"type":0,"x":11,"y":2},{"type":0,"x":12,"y":2},{"type":0,"x":13,"y":2},{"type":0,"x":14,"y":2},{"type":0,"x":15,"y":2},{"type":0,"x":16,"y":2},{"type":0,"x":17,"y":2},{"type":0,"x":18,"y":2},{"type":0,"x":19,"y":2},{"type":0,"x":20,"y":2},{"type":1,"x":21,"y":2},{"type":0,"x":22,"y":2},{"type":0,"x":23,"y":2},{"type":1,"x":24,"y":2}],[{"type":1,"x":0,"y":3},{"type":0,"x":1,"y":3},{"type":0,"x":2,"y":3},{"type":1,"x":3,"y":3},{"type":1,"x":4,"y":3},{"type":1,"x":5,"y":3},{"type":1,"x":6,"y":3},{"type":1,"x":7,"y":3},{"type":1,"x":8,"y":3},{"type":1,"x":9,"y":3},{"type":0,"x":10,"y":3},{"type":0,"x":11,"y":3},{"type":1,"x":12,"y":3},{"type":1,"x":13,"y":3},{"type":1,"x":14,"y":3},{"type":1,"x":15,"y":3},{"type":1,"x":16,"y":3},{"type":1,"x":17,"y":3},{"type":1,"x":18,"y":3},{"type":0,"x":19,"y":3},{"type":0,"x":20,"y":3},{"type":1,"x":21,"y":3},{"type":0,"x":22,"y":3},{"type":0,"x":23,"y":3},{"type":1,"x":24,"y":3}],[{"type":1,"x":0,"y":4},{"type":0,"x":1,"y":4},{"type":0,"x":2,"y":4},{"type":1,"x":3,"y":4},{"type":0,"x":4,"y":4},{"type":0,"x":5,"y":4},{"type":0,"x":6,"y":4},{"type":0,"x":7,"y":4},{"type":0,"x":8,"y":4},{"type":1,"x":9,"y":4},{"type":0,"x":10,"y":4},{"type":0,"x":11,"y":4},{"type":1,"x":12,"y":4},{"type":0,"x":13,"y":4},{"type":0,"x":14,"y":4},{"type":0,"x":15,"y":4},{"type":0,"x":16,"y":4},{"type":0,"x":17,"y":4},{"type":1,"x":18,"y":4},{"type":0,"x":19,"y":4},{"type":0,"x":20,"y":4},{"type":1,"x":21,"y":4},{"type":0,"x":22,"y":4},{"type":0,"x":23,"y":4},{"type":1,"x":24,"y":4}],[{"type":1,"x":0,"y":5},{"type":0,"x":1,"y":5},{"type":0,"x":2,"y":5},{"type":1,"x":3,"y":5},{"type":0,"x":4,"y":5},{"type":0,"x":5,"y":5},{"type":0,"x":6,"y":5},{"type":0,"x":7,"y":5},{"type":0,"x":8,"y":5},{"type":1,"x":9,"y":5},{"type":0,"x":10,"y":5},{"type":0,"x":11,"y":5},{"type":1,"x":12,"y":5},{"type":0,"x":13,"y":5},{"type":0,"x":14,"y":5},{"type":0,"x":15,"y":5},{"type":0,"x":16,"y":5},{"type":0,"x":17,"y":5},{"type":1,"x":18,"y":5},{"type":0,"x":19,"y":5},{"type":0,"x":20,"y":5},{"type":1,"x":21,"y":5},{"type":0,"x":22,"y":5},{"type":0,"x":23,"y":5},{"type":1,"x":24,"y":5}],[{"type":1,"x":0,"y":6},{"type":0,"x":1,"y":6},{"type":0,"x":2,"y":6},{"type":1,"x":3,"y":6},{"type":1,"x":4,"y":6},{"type":1,"x":5,"y":6},{"type":1,"x":6,"y":6},{"type":1,"x":7,"y":6},{"type":1,"x":8,"y":6},{"type":1,"x":9,"y":6},{"type":0,"x":10,"y":6},{"type":0,"x":11,"y":6},{"type":1,"x":12,"y":6},{"type":1,"x":13,"y":6},{"type":1,"x":14,"y":6},{"type":1,"x":15,"y":6},{"type":1,"x":16,"y":6},{"type":1,"x":17,"y":6},{"type":1,"x":18,"y":6},{"type":0,"x":19,"y":6},{"type":0,"x":20,"y":6},{"type":1,"x":21,"y":6},{"type":0,"x":22,"y":6},{"type":0,"x":23,"y":6},{"type":1,"x":24,"y":6}],[{"type":1,"x":0,"y":7},{"type":0,"x":1,"y":7},{"type":0,"x":2,"y":7},{"type":0,"x":3,"y":7},{"type":0,"x":4,"y":7},{"type":0,"x":5,"y":7},{"type":0,"x":6,"y":7},{"type":0,"x":7,"y":7},{"type":0,"x":8,"y":7},{"type":0,"x":9,"y":7},{"type":0,"x":10,"y":7},{"type":0,"x":11,"y":7},{"type":0,"x":12,"y":7},{"type":0,"x":13,"y":7},{"type":0,"x":14,"y":7},{"type":0,"x":15,"y":7},{"type":0,"x":16,"y":7},{"type":0,"x":17,"y":7},{"type":0,"x":18,"y":7},{"type":0,"x":19,"y":7},{"type":0,"x":20,"y":7},{"type":0,"x":21,"y":7},{"type":0,"x":22,"y":7},{"type":0,"x":23,"y":7},{"type":1,"x":24,"y":7}],[{"type":1,"x":0,"y":8},{"type":0,"x":1,"y":8},{"type":0,"x":2,"y":8},{"type":0,"x":3,"y":8},{"type":0,"x":4,"y":8},{"type":0,"x":5,"y":8},{"type":0,"x":6,"y":8},{"type":0,"x":7,"y":8},{"type":0,"x":8,"y":8},{"type":0,"x":9,"y":8},{"type":0,"x":10,"y":8},{"type":0,"x":11,"y":8},{"type":0,"x":12,"y":8},{"type":0,"x":13,"y":8},{"type":0,"x":14,"y":8},{"type":0,"x":15,"y":8},{"type":0,"x":16,"y":8},{"type":0,"x":17,"y":8},{"type":0,"x":18,"y":8},{"type":0,"x":19,"y":8},{"type":0,"x":20,"y":8},{"type":0,"x":21,"y":8},{"type":0,"x":22,"y":8},{"type":0,"x":23,"y":8},{"type":1,"x":24,"y":8}],[{"type":1,"x":0,"y":9},{"type":0,"x":1,"y":9},{"type":0,"x":2,"y":9},{"type":1,"x":3,"y":9},{"type":1,"x":4,"y":9},{"type":1,"x":5,"y":9},{"type":1,"x":6,"y":9},{"type":1,"x":7,"y":9},{"type":1,"x":8,"y":9},{"type":1,"x":9,"y":9},{"type":0,"x":10,"y":9},{"type":0,"x":11,"y":9},{"type":1,"x":12,"y":9},{"type":0,"x":13,"y":9},{"type":0,"x":14,"y":9},{"type":1,"x":15,"y":9},{"type":1,"x":16,"y":9},{"type":1,"x":17,"y":9},{"type":1,"x":18,"y":9},{"type":1,"x":19,"y":9},{"type":1,"x":20,"y":9},{"type":1,"x":21,"y":9},{"type":1,"x":22,"y":9},{"type":1,"x":23,"y":9},{"type":1,"x":24,"y":9}],[{"type":1,"x":0,"y":10},{"type":0,"x":1,"y":10},{"type":0,"x":2,"y":10},{"type":1,"x":3,"y":10},{"type":0,"x":4,"y":10},{"type":0,"x":5,"y":10},{"type":0,"x":6,"y":10},{"type":0,"x":7,"y":10},{"type":0,"x":8,"y":10},{"type":1,"x":9,"y":10},{"type":0,"x":10,"y":10},{"type":0,"x":11,"y":10},{"type":1,"x":12,"y":10},{"type":0,"x":13,"y":10},{"type":0,"x":14,"y":10},{"type":0,"x":15,"y":10},{"type":0,"x":16,"y":10},{"type":0,"x":17,"y":10},{"type":0,"x":18,"y":10},{"type":0,"x":19,"y":10},{"type":0,"x":20,"y":10},{"type":1,"x":21,"y":10},{"type":0,"x":22,"y":10},{"type":0,"x":23,"y":10},{"type":1,"x":24,"y":10}],[{"type":1,"x":0,"y":11},{"type":0,"x":1,"y":11},{"type":0,"x":2,"y":11},{"type":1,"x":3,"y":11},{"type":0,"x":4,"y":11},{"type":0,"x":5,"y":11},{"type":0,"x":6,"y":11},{"type":0,"x":7,"y":11},{"type":0,"x":8,"y":11},{"type":1,"x":9,"y":11},{"type":0,"x":10,"y":11},{"type":0,"x":11,"y":11},{"type":1,"x":12,"y":11},{"type":0,"x":13,"y":11},{"type":0,"x":14,"y":11},{"type":0,"x":15,"y":11},{"type":0,"x":16,"y":11},{"type":0,"x":17,"y":11},{"type":0,"x":18,"y":11},{"type":0,"x":19,"y":11},{"type":0,"x":20,"y":11},{"type":1,"x":21,"y":11},{"type":0,"x":22,"y":11},{"type":0,"x":23,"y":11},{"type":1,"x":24,"y":11}],[{"type":1,"x":0,"y":12},{"type":0,"x":1,"y":12},{"type":0,"x":2,"y":12},{"type":1,"x":3,"y":12},{"type":0,"x":4,"y":12},{"type":0,"x":5,"y":12},{"type":1,"x":6,"y":12},{"type":0,"x":7,"y":12},{"type":0,"x":8,"y":12},{"type":1,"x":9,"y":12},{"type":0,"x":10,"y":12},{"type":0,"x":11,"y":12},{"type":1,"x":12,"y":12},{"type":1,"x":13,"y":12},{"type":1,"x":14,"y":12},{"type":1,"x":15,"y":12},{"type":1,"x":16,"y":12},{"type":1,"x":17,"y":12},{"type":1,"x":18,"y":12},{"type":0,"x":19,"y":12},{"type":0,"x":20,"y":12},{"type":1,"x":21,"y":12},{"type":0,"x":22,"y":12},{"type":0,"x":23,"y":12},{"type":1,"x":24,"y":12}],[{"type":1,"x":0,"y":13},{"type":0,"x":1,"y":13},{"type":0,"x":2,"y":13},{"type":0,"x":3,"y":13},{"type":0,"x":4,"y":13},{"type":0,"x":5,"y":13},{"type":1,"x":6,"y":13},{"type":0,"x":7,"y":13},{"type":0,"x":8,"y":13},{"type":0,"x":9,"y":13},{"type":0,"x":10,"y":13},{"type":0,"x":11,"y":13},{"type":1,"x":12,"y":13},{"type":0,"x":13,"y":13},{"type":0,"x":14,"y":13},{"type":0,"x":15,"y":13},{"type":0,"x":16,"y":13},{"type":0,"x":17,"y":13},{"type":0,"x":18,"y":13},{"type":0,"x":19,"y":13},{"type":0,"x":20,"y":13},{"type":0,"x":21,"y":13},{"type":0,"x":22,"y":13},{"type":0,"x":23,"y":13},{"type":1,"x":24,"y":13}],[{"type":1,"x":0,"y":14},{"type":0,"x":1,"y":14},{"type":0,"x":2,"y":14},{"type":0,"x":3,"y":14},{"type":0,"x":4,"y":14},{"type":0,"x":5,"y":14},{"type":1,"x":6,"y":14},{"type":0,"x":7,"y":14},{"type":0,"x":8,"y":14},{"type":0,"x":9,"y":14},{"type":0,"x":10,"y":14},{"type":0,"x":11,"y":14},{"type":1,"x":12,"y":14},{"type":0,"x":13,"y":14},{"type":0,"x":14,"y":14},{"type":0,"x":15,"y":14},{"type":0,"x":16,"y":14},{"type":0,"x":17,"y":14},{"type":0,"x":18,"y":14},{"type":0,"x":19,"y":14},{"type":0,"x":20,"y":14},{"type":0,"x":21,"y":14},{"type":0,"x":22,"y":14},{"type":0,"x":23,"y":14},{"type":1,"x":24,"y":14}],[{"type":1,"x":0,"y":15},{"type":0,"x":1,"y":15},{"type":0,"x":2,"y":15},{"type":1,"x":3,"y":15},{"type":1,"x":4,"y":15},{"type":1,"x":5,"y":15},{"type":1,"x":6,"y":15},{"type":0,"x":7,"y":15},{"type":0,"x":8,"y":15},{"type":1,"x":9,"y":15},{"type":1,"x":10,"y":15},{"type":1,"x":11,"y":15},{"type":1,"x":12,"y":15},{"type":0,"x":13,"y":15},{"type":0,"x":14,"y":15},{"type":1,"x":15,"y":15},{"type":0,"x":16,"y":15},{"type":0,"x":17,"y":15},{"type":1,"x":18,"y":15},{"type":1,"x":19,"y":15},{"type":0,"x":20,"y":15},{"type":0,"x":21,"y":15},{"type":0,"x":22,"y":15},{"type":1,"x":23,"y":15},{"type":1,"x":24,"y":15}],[{"type":1,"x":0,"y":16},{"type":0,"x":1,"y":16},{"type":0,"x":2,"y":16},{"type":0,"x":3,"y":16},{"type":0,"x":4,"y":16},{"type":0,"x":5,"y":16},{"type":0,"x":6,"y":16},{"type":0,"x":7,"y":16},{"type":0,"x":8,"y":16},{"type":0,"x":9,"y":16},{"type":0,"x":10,"y":16},{"type":0,"x":11,"y":16},{"type":1,"x":12,"y":16},{"type":0,"x":13,"y":16},{"type":0,"x":14,"y":16},{"type":1,"x":15,"y":16},{"type":0,"x":16,"y":16},{"type":0,"x":17,"y":16},{"type":1,"x":18,"y":16},{"type":0,"x":19,"y":16},{"type":0,"x":20,"y":16},{"type":0,"x":21,"y":16},{"type":0,"x":22,"y":16},{"type":0,"x":23,"y":16},{"type":1,"x":24,"y":16}],[{"type":1,"x":0,"y":17},{"type":0,"x":1,"y":17},{"type":0,"x":2,"y":17},{"type":0,"x":3,"y":17},{"type":0,"x":4,"y":17},{"type":0,"x":5,"y":17},{"type":0,"x":6,"y":17},{"type":0,"x":7,"y":17},{"type":0,"x":8,"y":17},{"type":0,"x":9,"y":17},{"type":0,"x":10,"y":17},{"type":0,"x":11,"y":17},{"type":1,"x":12,"y":17},{"type":0,"x":13,"y":17},{"type":0,"x":14,"y":17},{"type":1,"x":15,"y":17},{"type":0,"x":16,"y":17},{"type":0,"x":17,"y":17},{"type":1,"x":18,"y":17},{"type":0,"x":19,"y":17},{"type":0,"x":20,"y":17},{"type":0,"x":21,"y":17},{"type":0,"x":22,"y":17},{"type":0,"x":23,"y":17},{"type":1,"x":24,"y":17}],[{"type":1,"x":0,"y":18},{"type":0,"x":1,"y":18},{"type":0,"x":2,"y":18},{"type":1,"x":3,"y":18},{"type":1,"x":4,"y":18},{"type":1,"x":5,"y":18},{"type":1,"x":6,"y":18},{"type":1,"x":7,"y":18},{"type":1,"x":8,"y":18},{"type":1,"x":9,"y":18},{"type":0,"x":10,"y":18},{"type":0,"x":11,"y":18},{"type":1,"x":12,"y":18},{"type":0,"x":13,"y":18},{"type":0,"x":14,"y":18},{"type":1,"x":15,"y":18},{"type":0,"x":16,"y":18},{"type":0,"x":17,"y":18},{"type":1,"x":18,"y":18},{"type":0,"x":19,"y":18},{"type":0,"x":20,"y":18},{"type":0,"x":21,"y":18},{"type":0,"x":22,"y":18},{"type":0,"x":23,"y":18},{"type":1,"x":24,"y":18}],[{"type":1,"x":0,"y":19},{"type":0,"x":1,"y":19},{"type":0,"x":2,"y":19},{"type":0,"x":3,"y":19},{"type":0,"x":4,"y":19},{"type":0,"x":5,"y":19},{"type":0,"x":6,"y":19},{"type":0,"x":7,"y":19},{"type":0,"x":8,"y":19},{"type":0,"x":9,"y":19},{"type":0,"x":10,"y":19},{"type":0,"x":11,"y":19},{"type":1,"x":12,"y":19},{"type":0,"x":13,"y":19},{"type":0,"x":14,"y":19},{"type":1,"x":15,"y":19},{"type":0,"x":16,"y":19},{"type":0,"x":17,"y":19},{"type":1,"x":18,"y":19},{"type":0,"x":19,"y":19},{"type":0,"x":20,"y":19},{"type":0,"x":21,"y":19},{"type":0,"x":22,"y":19},{"type":0,"x":23,"y":19},{"type":1,"x":24,"y":19}],[{"type":1,"x":0,"y":20},{"type":0,"x":1,"y":20},{"type":0,"x":2,"y":20},{"type":0,"x":3,"y":20},{"type":0,"x":4,"y":20},{"type":0,"x":5,"y":20},{"type":0,"x":6,"y":20},{"type":0,"x":7,"y":20},{"type":0,"x":8,"y":20},{"type":0,"x":9,"y":20},{"type":0,"x":10,"y":20},{"type":0,"x":11,"y":20},{"type":1,"x":12,"y":20},{"type":0,"x":13,"y":20},{"type":0,"x":14,"y":20},{"type":1,"x":15,"y":20},{"type":0,"x":16,"y":20},{"type":0,"x":17,"y":20},{"type":1,"x":18,"y":20},{"type":0,"x":19,"y":20},{"type":0,"x":20,"y":20},{"type":0,"x":21,"y":20},{"type":0,"x":22,"y":20},{"type":0,"x":23,"y":20},{"type":1,"x":24,"y":20}],[{"type":1,"x":0,"y":21},{"type":0,"x":1,"y":21},{"type":0,"x":2,"y":21},{"type":0,"x":3,"y":21},{"type":0,"x":4,"y":21},{"type":0,"x":5,"y":21},{"type":0,"x":6,"y":21},{"type":0,"x":7,"y":21},{"type":0,"x":8,"y":21},{"type":0,"x":9,"y":21},{"type":0,"x":10,"y":21},{"type":0,"x":11,"y":21},{"type":1,"x":12,"y":21},{"type":0,"x":13,"y":21},{"type":0,"x":14,"y":21},{"type":1,"x":15,"y":21},{"type":0,"x":16,"y":21},{"type":0,"x":17,"y":21},{"type":1,"x":18,"y":21},{"type":0,"x":19,"y":21},{"type":0,"x":20,"y":21},{"type":0,"x":21,"y":21},{"type":0,"x":22,"y":21},{"type":0,"x":23,"y":21},{"type":1,"x":24,"y":21}],[{"type":1,"x":0,"y":22},{"type":0,"x":1,"y":22},{"type":0,"x":2,"y":22},{"type":0,"x":3,"y":22},{"type":0,"x":4,"y":22},{"type":0,"x":5,"y":22},{"type":0,"x":6,"y":22},{"type":0,"x":7,"y":22},{"type":0,"x":8,"y":22},{"type":0,"x":9,"y":22},{"type":0,"x":10,"y":22},{"type":0,"x":11,"y":22},{"type":1,"x":12,"y":22},{"type":0,"x":13,"y":22},{"type":0,"x":14,"y":22},{"type":1,"x":15,"y":22},{"type":0,"x":16,"y":22},{"type":0,"x":17,"y":22},{"type":1,"x":18,"y":22},{"type":0,"x":19,"y":22},{"type":0,"x":20,"y":22},{"type":0,"x":21,"y":22},{"type":0,"x":22,"y":22},{"type":0,"x":23,"y":22},{"type":1,"x":24,"y":22}],[{"type":1,"x":0,"y":23},{"type":0,"x":1,"y":23},{"type":0,"x":2,"y":23},{"type":0,"x":3,"y":23},{"type":0,"x":4,"y":23},{"type":0,"x":5,"y":23},{"type":0,"x":6,"y":23},{"type":0,"x":7,"y":23},{"type":0,"x":8,"y":23},{"type":0,"x":9,"y":23},{"type":0,"x":10,"y":23},{"type":0,"x":11,"y":23},{"type":1,"x":12,"y":23},{"type":0,"x":13,"y":23},{"type":0,"x":14,"y":23},{"type":1,"x":15,"y":23},{"type":0,"x":16,"y":23},{"type":0,"x":17,"y":23},{"type":1,"x":18,"y":23},{"type":0,"x":19,"y":23},{"type":0,"x":20,"y":23},{"type":0,"x":21,"y":23},{"type":0,"x":22,"y":23},{"type":0,"x":23,"y":23},{"type":1,"x":24,"y":23}],[{"type":1,"x":0,"y":24},{"type":1,"x":1,"y":24},{"type":1,"x":2,"y":24},{"type":1,"x":3,"y":24},{"type":1,"x":4,"y":24},{"type":1,"x":5,"y":24},{"type":1,"x":6,"y":24},{"type":1,"x":7,"y":24},{"type":1,"x":8,"y":24},{"type":1,"x":9,"y":24},{"type":1,"x":10,"y":24},{"type":1,"x":11,"y":24},{"type":1,"x":12,"y":24},{"type":1,"x":13,"y":24},{"type":1,"x":14,"y":24},{"type":1,"x":15,"y":24},{"type":1,"x":16,"y":24},{"type":1,"x":17,"y":24},{"type":1,"x":18,"y":24},{"type":1,"x":19,"y":24},{"type":1,"x":20,"y":24},{"type":1,"x":21,"y":24},{"type":1,"x":22,"y":24},{"type":1,"x":23,"y":24},{"type":1,"x":24,"y":24}]]'
        }
    ];
    CurrentLevel = null;
    LoadLevel(levelName) {
        let level = Grid.Levels.filter(x => x.name == levelName);
        if (level && level.length == 1) {
            this.CurrentLevel = JSON.parse(level[0].data);
        }
        else {
            throw "Error"
        }
    }
    getCoordinateFromPX(x, y){
        const val = this.CurrentLevel[Math.floor(y / quant)][Math.floor(x / quant)];
        return new Coordinate(x, y, val.x, val.y, val.type);
    }
    getPXCoordinateFromCell(x, y){
        return new Coordinate(x * quant, y * quant);
    }
}

class Coordinate {
    static CoordinateType = {
        Empty: 0,
        Wall: 1,
        Food: 2,
        BigFood: 3
    }

    constructor(pxX, pxY, cellX, cellY, type) {
        this.pxX = pxX;
        this.pxY = pxY;
        this.cellX = cellX;
        this.cellY = cellY;
        this.type = type;
    }
}