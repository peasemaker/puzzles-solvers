(() => {
    interface Cell {
        x: number;
        y: number;
    }

    interface StartCell extends Cell {
        id: number;
        value: number;
    }

    type Neighbors = (Cell | null)[];

    type Grid = number[][];

    const gameGrid: Grid = [
        [0, 0, 5, 0, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 0],
        [2, 0, 0, 0, 0, 2, 0, 0, 0],
        [0, 3, 0, 0, 0, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 4, 0, 0],
    ];

// const gameGrid: Grid = [
//     [0,3,0,0,0,0,0,0,0,0,0,1],
//     [0,0,0,0,1,0,0,0,0,0,0,0],
//     [0,0,0,2,0,7,0,0,0,3,0,0],
//     [0,0,0,0,0,0,0,0,1,0,0,0],
//     [3,0,0,0,0,2,0,6,0,0,0,0],
//     [0,0,0,4,0,0,0,0,0,0,0,0],
//     [0,0,0,0,1,0,0,0,0,0,0,0],
//     [0,0,0,2,0,0,1,0,0,0,5,0],
//     [0,0,0,0,0,2,0,1,0,1,0,0],
//     [0,0,5,0,0,0,0,0,0,0,0,0],
//     [0,0,0,4,0,0,0,0,3,0,0,0],
//     [0,2,0,0,0,0,0,0,0,0,0,0],
// ];

// const gameGrid: Grid = [
//     [0,0,0,0,0,4,0,0,0],
//     [0,0,0,0,2,0,0,0,0],
//     [2,0,5,0,0,0,0,0,4],
//     [0,0,0,0,0,0,0,0,0],
//     [0,3,0,0,0,0,0,0,2],
//     [0,0,0,0,0,0,0,0,0],
//     [5,0,0,0,0,0,0,6,0],
//     [0,0,0,0,5,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0],
// ];

// const gameGrid: Grid = [
//     [0,0,0,0,0,0],
//     [0,5,0,0,5,0],
//     [0,0,0,4,0,0],
//     [0,0,0,0,0,0],
//     [0,0,1,0,0,0],
//     [0,0,0,0,0,0],
// ];

// const gameGrid: Grid = [
//     [4,0,4,0,0,0,0],
//     [0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,5],
//     [0,0,0,0,0,4,0],
//     [0,0,0,0,0,0,0],
//     [2,0,3,0,0,0,0],
//     [0,0,0,4,0,0,0],
// ];

// const gameGrid: Grid = [
//     [0,0,0,0,0,3,0,0,0,0],
//     [0,0,0,0,0,0,0,2,0,1],
//     [2,0,0,4,0,0,0,0,0,0],
//     [0,0,0,0,2,0,5,0,0,0],
//     [0,0,1,0,0,0,0,0,0,0],
//     [1,0,0,0,0,0,4,0,0,0],
//     [0,0,0,2,0,3,0,0,0,0],
//     [0,3,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,2,0,0],
//     [1,0,0,0,0,0,3,0,0,0],
// ];

    const [startCells, startGrid] = getStartCells(gameGrid);

    let emptyCellAmount = gameGrid.length * gameGrid[0].length - startCells.reduce((sum, cell) => sum + cell.value, 0);

// [left, right, top, bottom]
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
                    startNumbers.push({x, y, id, value: cell});
                    newGrid[x][y] = id;
                    id++;
                }
            }
        }

        const sorted = startNumbers.sort((a, b) => Math.sign(b.value - a.value));

        console.log(sorted);

        return [sorted, newGrid];
    }

    function clone(grid: Grid): Grid {
        return grid.map(row => [...row]);
    }

    function gridToString(grid: Grid): string {
        let result = '';

        for (let [r, row] of grid.entries()) {
            for (let [c, cell] of row.entries()) {
                if (cell !== 0) {
                    result += `${r}${c}${cell}`;
                }
            }
        }

        return result;
    }

    function checkChainRule(grid: Grid, calcEmpty: boolean = false): boolean {
        let start: Cell = {x: -1, y: -1};
        let testGrid = clone(grid);

        let emptyAmount = emptyCellAmount;

        for (let [x, row] of grid.entries()) {
            if (start.x > 0 && start.y > 0) {
                break;
            }

            for (let [y, cell] of row.entries()) {
                if (cell === 0) {
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
        neighbors = neighbors.filter(i => i && testGrid[i.x][i.y] === 0);

        if (calcEmpty) {
            emptyAmount = grid.reduce((i, row) => {
                return i + row.reduce((j, number) => {
                    return j + (number === 0 ? 1 : 0);
                }, 0);
            }, 0);
        }

        function traverse(neighbors: Neighbors) {
            if (neighbors.length === 0) {
                return;
            }

            for (let n of neighbors) {
                if (n !== null) {
                    testGrid[n.x][n.y] = -1;
                    const newNeighbors = getNeighbors(testGrid, n).filter(i => i && testGrid[i.x][i.y] === 0);

                    traverse(newNeighbors);
                }
            }
        }

        traverse(neighbors);

        let counter = testGrid.reduce((i, row) => {
            return i + row.reduce((j, number) => {
                return j + (number === -1 ? 1 : 0);
            }, 0);
        }, 0);

        return counter === emptyAmount;
    }

    function checkBlockRule(grid: Grid): boolean {
        const gridLen = grid.length;
        const rowLen = grid[0].length;

        for (let x = 0; x < gridLen - 1; x++) {
            for (let y = 0; y < rowLen - 1; y++) {
                const cell1 = grid[x][y];
                const cell2 = grid[x][y + 1];
                const cell3 = grid[x + 1][y];
                const cell4 = grid[x + 1][y + 1];

                if (cell1 === 0 && cell2 === 0 && cell3 === 0 && cell4 === 0) {
                    return false;
                }
            }
        }

        return true;
    }

    function checkPerm(perm: number[], count: number): boolean {
        if (count > 4) {
            return true;
        }

        let counter = 0;
        for (let num of perm) {
            if (num === 1) {
                counter++;
            }
        }

        return counter < count;
    }

    function makeNeighborsPermutations(): number[][] {
        const permutations: number[][] = [];

        function permute(permutation: number[]) {
            if (permutation.length === 4) {
                permutations.push(permutation);
                return;
            }

            for (let val of [0, 1]) {
                permutation.push(val);

                permute([...permutation]);

                permutation.pop();
            }
        }

        permute([]);

        return permutations;
    }

    function makePossibleGrids(startCells: StartCell[], startGrid: Grid): Grid[] {
        const grids: Grid[] = [];
        const permutations = makeNeighborsPermutations();

        function traverse(grid: Grid, gridSet: Set<string>, cellIter: number, valueIter: number) {
            const startNumbers = [];
            const id = startCells[cellIter].id;
            const value = startCells[cellIter].value;

            for (let [x, row] of grid.entries()) {
                for (let [y, cell] of row.entries()) {
                    if (cell === id) {
                        startNumbers.push({x, y});
                    }
                }
            }

            if (grids.length > 0) {
                return;
            }

            for (let start of startNumbers) {

                const neighbors = getNeighbors(grid, start);

                for (let n of neighbors) {
                    if (n && grid[n.x][n.y] !== 0 && grid[n.x][n.y] !== id) {
                        return;
                    }
                }

                if (valueIter >= value - 1) {
                    if (valueIter == value - 1) {
                        const gridString = gridToString(grid);
                        if (startCells[cellIter + 1]) {
                            if (!gridSet.has(gridString)) {
                                if (checkChainRule(grid, true)) {
                                    traverse(grid, new Set(), cellIter + 1, 0);
                                }
                                gridSet.add(gridString);
                            }
                        } else {
                            if (!gridSet.has(gridString)) {
                                if (checkBlockRule(grid) && checkChainRule(grid)) {
                                    grids.push(grid);
                                }
                                gridSet.add(gridString);
                            }
                        }
                    }
                    continue;
                }

                for (let p of permutations) {
                    if (!checkPerm(p, Math.max(0, value - valueIter))) {
                        continue;
                    }

                    const newGrid = clone(grid);
                    let nextCells = 0;

                    for (let [i, n] of neighbors.entries()) {
                        if (n !== null && newGrid[n.x][n.y] === 0) {
                            if (p[i]) {
                                const nextNeighbors = getNeighbors(newGrid, n).filter(n => n);

                                if (nextNeighbors.every((n) => (
                                    (newGrid[n!.x][n!.y] === 0 || newGrid[n!.x][n!.y] === id)
                                ))) {
                                    newGrid[n.x][n.y] = id;
                                    nextCells++;
                                }
                            }
                        }
                    }

                    if (nextCells) {
                        traverse(newGrid, gridSet, cellIter, valueIter + nextCells);
                    }
                }
            }
        }

        traverse(startGrid, new Set(), 0, 0);

        return grids;
    }

    function solve() {
        return makePossibleGrids(startCells, startGrid);
    }

    console.time('solve');

    const solution = solve();

    console.timeEnd('solve');

    for (let [i, s] of solution.entries()) {
        console.log(`##Solution ${i + 1}`);
        console.log(s.map(row => row.map(number => number ? 1 : 0)));
    }
})();