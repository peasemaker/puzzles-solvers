(() => {
    interface Cell {
        x: number;
        y: number;
    }

    type Neighbors = (Cell | null)[];

    type Grid = number[][];

    interface StartCell extends Cell {
        id: number;
    }

    // const gameGrid: Grid = [
    //     [1,0,0,1,1,0,0,0,0,1],
    //     [1,0,0,0,0,0,0,0,0,0],
    //     [0,1,0,0,0,0,0,1,0,1],
    //     [0,0,0,0,0,0,0,0,0,0],
    //     [0,0,1,0,0,1,0,0,1,0],
    //     [0,0,0,0,0,0,0,1,0,0],
    //     [0,0,1,0,0,1,0,0,0,1],
    //     [0,0,0,0,0,0,1,0,0,0],
    //     [0,0,0,0,1,0,0,0,1,0],
    //     [0,0,0,0,0,0,0,0,1,0]
    // ];

    // const gameGrid: Grid = [
    //     [1,0,0,0,0,1,0,0,1],
    //     [0,0,0,0,1,0,0,1,0],
    //     [1,0,1,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,1],
    //     [0,0,1,0,1,1,1,0,0],
    //     [0,0,0,0,0,0,0,0,0],
    //     [1,1,0,0,0,0,0,1,0],
    //     [0,0,0,1,0,0,0,0,0],
    //     [1,0,0,0,1,0,0,0,1]
    // ];

    const gameGrid: Grid = [
        [0,0,0,1,0,0,1,0,0,0,0],
        [0,0,0,0,0,1,0,1,0,1,0],
        [1,0,0,0,0,0,1,0,0,0,0],
        [0,1,0,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1],
        [0,0,1,1,0,0,0,0,1,0,1],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0,0],
        [0,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,0,1],
        [0,0,0,0,0,0,0,0,0,0,0]
    ];

    // const gameGrid: Grid = [
    //     [1,0,0,1,1,0,0,0,0,0],
    //     [1,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0],
    //     [0,0,0,0,0,0,0,0,0,0]
    // ];

    const nailCount = gameGrid.reduce((i, row) => {
        return i + row.reduce((j, cell) => {
            return j + (cell !== 0 ? 1 : 0);
        }, 0);
    }, 0);

    function clone(arr: any[]): any[] {
        return arr.map(row => [...row]);
    }

    function getNeighbors(grid: Grid, cell: Cell): Neighbors {
        let neighbors: Neighbors = [null, null, null, null];
        const gridHeight = grid.length;
        const gridWidth = grid[0].length;

        if (cell.x > 0) {
            neighbors[0] = {x: cell.x - 1, y: cell.y};
        }

        if (cell.x < gridHeight - 1) {
            neighbors[1] = {x: cell.x + 1, y: cell.y};
        }

        if (cell.y > 0) {
            neighbors[2] = {x: cell.x, y: cell.y - 1};
        }

        if (cell.y < gridWidth - 1) {
            neighbors[3] = {x: cell.x, y: cell.y + 1};
        }

        return neighbors;
    }

    function getStartCells(grid: Grid): [StartCell[], Grid] {
        const startNumbers = [];
        let id = 1;
        const newGrid = clone(grid);

        for (let [x, row] of grid.entries()) {
            for (let [y, cell] of row.entries()) {
                if (cell !== 0) {
                    startNumbers.push({x, y, id});
                    newGrid[x][y] = id;
                    id++;
                }
            }
        }

        return [startNumbers, newGrid];
    }

    function getPlanksForNail(grid: Grid, nail: StartCell): StartCell[][] {
        const planks: StartCell[][] = [];

        const x = nail.x;
        const y = nail.y;
        const id = nail.id;

        if (x - 2 >= 0) {
            let plank = [
                {
                    x: x - 2,
                    y,
                    id
                },
                {
                    x: x - 1,
                    y,
                    id
                },
                {
                    x,
                    y,
                    id
                }
            ];

            if (plank.every(cell => grid[cell.x][cell.y] == 0 || grid[cell.x][cell.y] == id)) {
                planks.push(plank);
            }
        }

        if (x - 1 >= 0 && x + 1 < grid[0].length ) {
            let plank = [
                {
                    x: x - 1,
                    y,
                    id
                },
                {
                    x,
                    y,
                    id
                },
                {
                    x: x + 1,
                    y,
                    id
                }
            ];

            if (plank.every(cell => grid[cell.x][cell.y] == 0 || grid[cell.x][cell.y] == id)) {
                planks.push(plank);
            }
        }

        if (x + 2 < grid[0].length ) {
            let plank = [
                {
                    x,
                    y,
                    id
                },
                {
                    x: x + 1,
                    y,
                    id
                },
                {
                    x: x + 2,
                    y,
                    id
                }
            ];

            if (plank.every(cell => grid[cell.x][cell.y] == 0 || grid[cell.x][cell.y] == id)) {
                planks.push(plank);
            }
        }

        if (y - 2 >= 0) {
            let plank = [
                {
                    x,
                    y: y - 2,
                    id
                },
                {
                    x,
                    y: y - 1,
                    id
                },
                {
                    x: x,
                    y: y,
                    id
                }
            ];

            if (plank.every(cell => grid[cell.x][cell.y] == 0 || grid[cell.x][cell.y] == id)) {
                planks.push(plank);
            }
        }

        if (y - 1 >= 0 && y + 1 < grid.length ) {
            let plank = [
                {
                    x,
                    y: y - 1,
                    id
                },
                {
                    x,
                    y,
                    id
                },
                {
                    x,
                    y: y + 1,
                    id
                }
            ];

            if (plank.every(cell => grid[cell.x][cell.y] == 0 || grid[cell.x][cell.y] == id)) {
                planks.push(plank);
            }
        }

        if (y + 2 < grid.length ) {
            let plank = [
                {
                    x,
                    y,
                    id
                },
                {
                    x: x,
                    y: y + 1,
                    id
                },
                {
                    x,
                    y: y + 2,
                    id
                }
            ];

            if (plank.every(cell => grid[cell.x][cell.y] == 0 || grid[cell.x][cell.y] == id)) {
                planks.push(plank);
            }
        }

        return planks;
    }

    function checkChainRule(grid: Grid): boolean {
        let start: Cell = {x: -1, y: -1};
        let testGrid: Grid = clone(grid);

        for (let [x, row] of grid.entries()) {
            if (start.x > 0 && start.y > 0) {
                break;
            }

            for (let [y, cell] of row.entries()) {
                if (cell !== 0) {
                    start = {x, y};
                    break;
                }
            }
        }

        if (start.x < 0 && start.y < 0) {
            return false;
        }

        testGrid[start.x][start.y] = -1;
        let neighbors = getNeighbors(testGrid, start);
        neighbors = neighbors.filter(i => i && testGrid[i.x][i.y] !== -1 && testGrid[i.x][i.y] !== 0);

        const fillAmount = grid.reduce((i, row) => {
            return i + row.reduce((j, cell) => {
                return j + (cell !== 0 ? 1 : 0);
            }, 0);
        }, 0);

        function traverse(neighbors: Neighbors) {
            if (neighbors.length === 0) {
                return;
            }

            for (let n of neighbors) {
                if (n !== null) {
                    testGrid[n.x][n.y] = -1;
                    const newNeighbors = getNeighbors(testGrid, n).filter(i => i && testGrid[i.x][i.y] !== -1 && testGrid[i.x][i.y] !== 0);

                    traverse(newNeighbors);
                }
            }
        }

        traverse(neighbors);

        let counter = testGrid.reduce((i, row) => {
            return i + row.reduce((j, cell) => {
                return j + (cell === -1 ? 1 : 0);
            }, 0);
        }, 0);

        return counter === fillAmount;
    }

    function checkConnectionRule(grid: Grid, isNotFinished?: boolean): boolean {
        const checked = new Array(nailCount).fill(0).map(() => ({ connections: 0, ids: new Set()}));

        for (let [x, row] of grid.entries()) {
            for (let [y, cell] of row.entries()) {
                if (cell !== 0) {
                    const neighbors = getNeighbors(grid, {x, y});

                    for (let n of neighbors) {
                        if (n !== null) {
                            const nCell = grid[n.x][n.y];
                            if (nCell !== 0 && nCell !== cell && !checked[cell - 1].ids.has(nCell)) {
                                checked[cell - 1].connections++;
                                checked[cell - 1].ids.add(nCell);
                            }
                        }
                    }
                }
            }
        }

        if (isNotFinished) {
            return checked.every(x => x.connections <= 2);
        }

        return checked.every(x => x.connections === 2);
    }

    function solve(grid: Grid): Grid[] {
        const [startCells, startGrid] = getStartCells(grid);
        const grids: Grid[] = [];

        function traverse(grid: Grid, usedIds: Set<number>) {
            if (grids.length > 0) {
                return;
            }

            if (usedIds.size == startCells.length) {
                if (checkConnectionRule(grid) && checkChainRule(grid)) {
                    grids.push(grid);
                }
                return;
            }

            if (!checkConnectionRule(grid, true)) {
                return;
            }

            const startCellFiltered = startCells.filter(x => !usedIds.has(x.id));

            const planksArray = startCellFiltered
                .map(cell => getPlanksForNail(grid, cell))
                .sort((a, b) => a.length - b.length);

            const planks = planksArray[0];

            for (let plank of planks) {
                const newGrid = clone(grid);
                const newSet = new Set(usedIds);

                for (let c of plank) {
                    newGrid[c.x][c.y] = c.id;
                    newSet.add(c.id)
                }

                traverse(newGrid, newSet);
            }
        }

        traverse(startGrid, new Set());

        return grids;
    }

    console.time('solve');

    const solution = solve(gameGrid);

    console.timeEnd('solve');

    for (let s of solution) {
        console.log(s.map(row => row.map(number => number ? 1 : 0)));
    }
})();