import levels, { Level } from './levels';

enum CellType {
    Empty = 0,
    Dot = 1,
    Unit = 2,
    Middle = 3,
    Left = 4,
    Top = 5,
    Right = 6,
    Bottom = 7
}

interface Cell {
    x: number;
    y: number;
}

type Neighbors = (Cell | null)[];

type Grid = number[][];

function clone(arr: any[]): any[] {
    return arr.map(row => [...row]);
}

// [left, top-left, top, top-right, right, bottom-right, bottom, bottom-left]
function getNeighbors(grid: Grid, cell: Cell): Neighbors {
    let neighbors: Neighbors = new Array(8).fill(null);
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;

    if (cell.x > 0) {
        neighbors[0] = {x: cell.x - 1, y: cell.y};
    }

    if (cell.y > 0 && cell.x > 0) {
        neighbors[1] = {x: cell.x - 1, y: cell.y - 1};
    }

    if (cell.y > 0) {
        neighbors[2] = {x: cell.x, y: cell.y - 1};
    }

    if (cell.y > 0 && cell.x < gridHeight - 1) {
        neighbors[3] = {x: cell.x + 1, y: cell.y - 1};
    }

    if (cell.x < gridHeight - 1) {
        neighbors[4] = {x: cell.x + 1, y: cell.y};
    }

    if (cell.y < gridWidth - 1 && cell.x < gridHeight - 1) {
        neighbors[5] = {x: cell.x + 1, y: cell.y + 1};
    }

    if (cell.y < gridWidth - 1) {
        neighbors[6] = {x: cell.x, y: cell.y + 1};
    }

    if (cell.y < gridWidth - 1 && cell.x > 0) {
        neighbors[7] = {x: cell.x - 1, y: cell.y + 1};
    }

    return neighbors;
}

function checkValues(grid: Grid, rows: number[], cols: number[]): boolean {
    if (rows.some(r => r < 0) || cols.some(c => c < 0)) {
        return false;
    }

    for (let [y, row] of grid.entries()) {
        const dotCount = row.reduce((sum, cell) => sum + (cell == CellType.Dot ? 1 : 0), 0);
        if (row.length - dotCount < rows[y]) {
            return false;
        }
    }

    for (let x = 0; x < cols.length; x++) {
        let dotCount = 0;
        for (let y = 0; y < rows.length; y++) {
            dotCount += grid[y][x] == CellType.Dot ? 1 : 0;
        }
        if (cols.length - dotCount < cols[x]) {
            return false;
        }
    }

    return true;
}

function solve(level: Level): Grid[] {
    const {
        cols,
        rows,
        shipsMax,
        startGrid
    } = level;

    const gameGrid: Grid = startGrid ?
        startGrid.trim().split(/\n/).filter(x => x).map(x => x.trim().split('').map(x => parseInt(x)))
        : new Array(rows.length).fill(0).map(() => new Array(cols.length).fill(CellType.Empty));

    const ships = shipsMax == 4 ? [4, 3, 2, 1] : [4, 3, 2, 1, 1];

    const rowsSum = rows.reduce((sum, r) => sum + r, 0);
    const colsSum = rows.reduce((sum, c) => sum + c, 0);

    if (rowsSum !== colsSum) {
        console.log('Wrong settings');
        return [];
    }

    const grids: Grid[] = [];

    if (startGrid) {
        for (let [y, row] of gameGrid.entries()) {
            for (let [x, _cell] of row.entries()) {
                const neighbors = getNeighbors(gameGrid, {x, y});
                if (gameGrid[y][x] > CellType.Dot) {
                    cols[x]--;
                    rows[y]--;
                }

                switch (gameGrid[y][x]) {
                    case CellType.Unit: {
                        ships[0]--;
                        gameGrid[y][x] *= -1;
                        for (let n of neighbors) {
                            if (n !== null) {
                                gameGrid[n.y][n.x] = CellType.Dot;
                            }
                        }
                        break;
                    }
                    case CellType.Left: {
                        for (let [ix, n] of neighbors.entries()) {
                            if (n !== null && ix !== 4) {
                                gameGrid[n.y][n.x] = CellType.Dot;
                            }
                        }

                        break;
                    }
                    case CellType.Top: {
                        for (let [ix, n] of neighbors.entries()) {
                            if (n !== null && ix !== 6) {
                                gameGrid[n.y][n.x] = CellType.Dot;
                            }
                        }

                        break;
                    }
                    case CellType.Right: {
                        for (let [ix, n] of neighbors.entries()) {
                            if (n !== null && ix !== 0) {
                                gameGrid[n.y][n.x] = CellType.Dot;
                            }
                        }

                        break;
                    }
                    case CellType.Bottom: {
                        for (let [ix, n] of neighbors.entries()) {
                            if (n !== null && ix !== 2) {
                                gameGrid[n.y][n.x] = CellType.Dot;
                            }
                        }

                        break;
                    }
                }
            }
        }
    }

    function traverse(grid: Grid, ships: number[], rows: number[], cols: number[], shipLength: number) {
        for (let [y, row] of grid.entries()) {
            for (let [x, _cell] of row.entries()) {
                if ((cols[x] == 0 || rows[y] == 0) && grid[y][x] == CellType.Empty) {
                    grid[y][x] = CellType.Dot;
                }
            }
        }

        if (grids.length > 0 || !checkValues(grid, rows, cols)) {
            return;
        }

        if (ships.every( n => n === 0)) {
            grids.push(grid);
            return;
        }

        for (let [y, row] of grid.entries()) {
            for (let [x, _cell] of row.entries()) {
                if (grid[y][x] !== CellType.Dot && grid[y][x] >= 0) {
                    for (let direction of ['vertical', 'horizontal']) {
                        let horizontalCount = 0;
                        let verticalCount = 0;
                        let startCellCount = 0;

                        for (let i = 0; i < shipLength; i++) {
                            if (x + shipLength <= rows.length) {
                                if (grid[y][x + i] !== CellType.Dot && grid[y][x + i] > 0) {
                                    horizontalCount++;
                                }
                            }

                            if (y + shipLength <= cols.length) {
                                if (grid[y + i][x] !== CellType.Dot && grid[y + i][x] > 0) {
                                    verticalCount++;
                                }
                            }
                        }

                        if (direction == 'horizontal') {
                            // if (x == 8 && y == 5 && shipLength == 2) {
                            //     console.log(printSolution(grid));
                            //     console.log(horizontalCount);
                            //     console.log(rows[y]);
                            //     console.log('########');
                            // }
                            if (shipLength - horizontalCount <= rows[y] && x + shipLength <= rows.length) {
                                const newGrid = clone(grid);
                                const newRows = [...rows];
                                const newCols = [...cols];
                                const newShips = [...ships];
                                let isWrongWay = false;

                                for (let i = 0; i < shipLength; i++) {
                                    const cell = {x: x + i, y};

                                    let cellType = CellType.Middle;

                                    if (shipLength > 1) {
                                        if (i == 0) {
                                            cellType = CellType.Left;
                                        } else if (i == shipLength - 1) {
                                            cellType = CellType.Right
                                        }
                                    } else {
                                        cellType = CellType.Unit
                                    }

                                    if (newGrid[cell.y][cell.x] !== CellType.Empty && newGrid[cell.y][cell.x] !== cellType) {
                                        isWrongWay = true;
                                        break;
                                    }

                                    if (newGrid[cell.y][cell.x] == CellType.Empty) {
                                        newCols[cell.x]--;
                                    } else {
                                        startCellCount++;
                                    }

                                    newGrid[cell.y][cell.x] = -1 * cellType;

                                    const neighbors = getNeighbors(newGrid, cell);

                                    for (let [ix, n] of neighbors.entries()) {
                                        if (shipLength > 1) {
                                            if ((i == 0 && ix == 4) || (i == shipLength - 1 && ix == 0)) {
                                                continue;
                                            }

                                            if ((ix == 0 || ix == 4) && (i !== 0 && i !== shipLength - 1)) {
                                                continue;
                                            }
                                        }

                                        if (n !== null) {
                                            newGrid[n.y][n.x] = CellType.Dot;
                                        }
                                    }
                                }

                                if (isWrongWay) {
                                    continue;
                                }

                                newRows[y] -= shipLength - startCellCount;
                                newShips[shipLength - 1]--;

                                const newShipLength = newShips[shipLength - 1] ? shipLength : shipLength - 1;

                                traverse(newGrid, newShips, newRows, newCols, newShipLength);
                            }
                        } else {
                            if (shipLength - verticalCount <= cols[x] && y + shipLength <= cols.length) {
                                const newGrid = clone(grid);
                                const newCols = [...cols];
                                const newRows = [...rows];
                                const newShips = [...ships];
                                let isWrongWay = false;

                                for (let i = 0; i < shipLength; i++) {
                                    const cell = {x, y: y + i};
                                    let cellType = CellType.Middle;

                                    if (shipLength > 1) {
                                        if (i == 0) {
                                            cellType = CellType.Top;
                                        } else if (i == shipLength - 1) {
                                            cellType = CellType.Bottom
                                        }
                                    } else {
                                        cellType = CellType.Unit
                                    }

                                    if (newGrid[cell.y][cell.x] !== CellType.Empty && newGrid[cell.y][cell.x] !== cellType) {
                                        isWrongWay = true;
                                        break;
                                    }

                                    if (newGrid[cell.y][cell.x] === CellType.Empty) {
                                        newRows[cell.y]--;
                                    } else {
                                        startCellCount++;
                                    }

                                    newGrid[cell.y][cell.x] = -1 * cellType;

                                    const neighbors = getNeighbors(newGrid, cell);

                                    for (let [ix, n] of neighbors.entries()) {
                                        if (shipLength > 1) {
                                            if ((i == 0 && ix == 6) || (i == shipLength - 1 && ix == 2)) {
                                                continue;
                                            }

                                            if ((ix == 2 || ix == 6) && (i !== 0 && i !== shipLength - 1)) {
                                                continue;
                                            }
                                        }

                                        if (n !== null) {
                                            newGrid[n.y][n.x] = CellType.Dot;
                                        }
                                    }
                                }

                                if (isWrongWay) {
                                    continue;
                                }

                                newCols[x] -= shipLength - startCellCount;
                                newShips[shipLength - 1]--;

                                const newShipLength = newShips[shipLength - 1] ? shipLength : shipLength - 1;

                                traverse(newGrid, newShips, newRows, newCols, newShipLength);
                            }
                        }
                    }
                }
            }
        }

    }

    traverse(gameGrid, ships, rows, cols, shipsMax);

    return grids;
}

console.time('solve');

const solutions = solve(levels.level4);
console.timeEnd('solve');

for (let [i, s] of solutions.entries()) {
    console.log(`Solutions #${i + 1}`);
    console.log(printSolution(s));
}

function printSolution(grid: Grid): string {
    return grid.map( row => row.map(cell => cell == CellType.Dot ? '.' : Math.abs(cell).toString()).join('')).join('\n');
}

