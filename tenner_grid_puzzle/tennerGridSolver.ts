(() => {
    interface Cell {
        x: number;
        y: number;
    }

    type Neighbors = (Cell | null)[];

    type Grid = number[][];

    interface CellValues extends Cell{
        values: Set<number>
    }

    const gridString = `
        ......0915
        .8...5..7.
        .5.2...1..
        .....6.957
        8.0.9.5...
        73.......1
    `;

    const size = 6;
    const values = [33,22,13,34,26,41,22,29,32,18];
    const gameGrid: Grid = gridString.trim().split(/\n/).filter(x => x).map(x => x.trim().split('').map(x => x == '.' ? -1 : parseInt(x)));

    function clone(arr: any[]): any[] {
        return arr.map(row => [...row]);
    }

    // [left, top-left, top, top-right, right, bottom-right, bottom, bottom-left]
    function getNeighbors(grid: Grid, cell: Cell): Neighbors {
        let neighbors: Neighbors = new Array(8).fill(null);
        const gridHeight = grid.length;
        const gridWidth = grid[0].length;

        if (cell.y > 0) {
            neighbors[0] = {x: cell.x, y: cell.y - 1};
        }

        if (cell.x > 0 && cell.y > 0) {
            neighbors[1] = {x: cell.x - 1, y: cell.y - 1};
        }

        if (cell.x > 0) {
            neighbors[2] = {x: cell.x - 1, y: cell.y};
        }

        if (cell.x > 0 && cell.y < gridWidth - 1) {
            neighbors[3] = {x: cell.x - 1, y: cell.y + 1};
        }

        if (cell.y < gridWidth - 1) {
            neighbors[4] = {x: cell.x, y: cell.y + 1};
        }

        if (cell.x < gridHeight - 1 && cell.y < gridWidth - 1) {
            neighbors[5] = {x: cell.x + 1, y: cell.y + 1};
        }

        if (cell.x < gridHeight - 1) {
            neighbors[6] = {x: cell.x + 1, y: cell.y};
        }

        if (cell.x < gridHeight - 1 && cell.y > 0) {
            neighbors[7] = {x: cell.x + 1, y: cell.y - 1};
        }

        return neighbors;
    }

    function getPossibleValues(grid: Grid) {
        const rowsSets: Set<number>[] = new Array(size).fill(null).map(() => new Set());
        const cellSets: CellValues[] = [];

        for (let [i, row] of grid.entries()) {
            for (let n of row) {
                if (n !== -1 && !rowsSets[i].has(n)) {
                    rowsSets[i].add(n);
                }
            }
        }

        for (let [x, row] of grid.entries()) {
            for (let [y, n] of row.entries()) {
                if (n === -1) {
                    const sudokuSet = new Set();
                    for (let i = 0; i < 10; i++) {
                        const neighbors = getNeighbors(grid, {x, y}).filter(k => k !== null && grid[k!.x][k!.y] !== -1);
                        if (!rowsSets[x].has(i) && neighbors.every(k => grid[k!.x][k!.y] !== i)) {
                            sudokuSet.add(i);
                        }
                    }
                    cellSets.push({
                        x,
                        y,
                        values: sudokuSet
                    });
                }
            }
        }

        const kakuroSets = [];

        for (let i = 0; i < grid[0].length; i++) {
            let rowValue = values[i];
            let perms: number[][] = [];
            function traverse(perm: number[], rowValue: number) {
                if (perm.length == size) {
                    if (perm.reduce((sum, val) => sum + (val == -1 ? 0 : val), 0) == rowValue) {
                        perms.push([...perm]);
                    }
                    return;
                }

                let cell = grid[perm.length][i];

                if (cell == -1) {
                    let cellSet = cellSets.find(k => k.x == perm.length && k.y == i);

                    if (cellSet) {
                        const cellValues = cellSet.values;
                        for (let value of cellValues.values()) {
                            traverse([...perm, value], rowValue);
                        }
                    }
                } else {
                    rowValue -= cell;
                    traverse([...perm, -1], rowValue);
                }
            }

            traverse([], rowValue);

            for (let s = 0; s < size; s++) {
                let kakuroSet = new Set();
                for (let perm of perms) {
                    if (perm[s] >= 0) {
                        kakuroSet.add(perm[s]);
                    }
                }
                if (kakuroSet.size) {
                    kakuroSets.push({
                        x: s,
                        y: i,
                        values: new Set([...kakuroSet].sort())
                    });
                }
            }
        }

        return kakuroSets.sort((a, b) => a.values.size - b.values.size);
    }

    function checkValues(grid: Grid): boolean {
        for (let [i, value] of values.entries()) {
            let sum = 0;
            for (let s = 0; s < size; s++) {
                if (grid[s][i] === -1) {
                    sum = 0;
                    break;
                }
                sum += grid[s][i];
            }

            if (sum !== value) {
                return false;
            }
        }

        return true;
    }

    function solve(grid: Grid): Grid[] {
        const grids: Grid[] = [];

        function traverse(grid: Grid) {
            if (grids.length > 0) {
                return;
            }

            const possibleValues = getPossibleValues(grid);

            if (!possibleValues.length) {
                if (checkValues(grid)) {
                    grids.push(grid);
                }
                return;
            }

            const cell = possibleValues[0];

            for (let v of cell.values) {
                const newGrid = clone(grid);
                newGrid[cell.x][cell.y] = v;

                traverse(newGrid);
            }
        }

        traverse(grid);

        return grids;
    }

    console.log(gameGrid);
    console.log(getPossibleValues(gameGrid));

    console.time('solve');

    const solutions = solve(gameGrid);

    console.timeEnd('solve');

    for (let s of solutions) {
        console.log(s);
    }
})();