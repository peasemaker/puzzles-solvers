"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const levels_1 = require("./levels");
const helpers_1 = require("../helpers");
var CellType;
(function (CellType) {
    CellType[CellType["Empty"] = 0] = "Empty";
    CellType[CellType["Dot"] = 1] = "Dot";
    CellType[CellType["Unit"] = 2] = "Unit";
    CellType[CellType["Middle"] = 3] = "Middle";
    CellType[CellType["Left"] = 4] = "Left";
    CellType[CellType["Top"] = 5] = "Top";
    CellType[CellType["Right"] = 6] = "Right";
    CellType[CellType["Bottom"] = 7] = "Bottom";
})(CellType || (CellType = {}));
function checkValues(grid, rows, cols) {
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
function solve(level) {
    const { cols, rows, shipsMax, startGrid } = level;
    const gameGrid = startGrid ?
        startGrid.trim().split(/\n/).filter(x => x).map(x => x.trim().split('').map(x => parseInt(x)))
        : new Array(rows.length).fill(0).map(() => new Array(cols.length).fill(CellType.Empty));
    const ships = shipsMax == 4 ? [4, 3, 2, 1] : [4, 3, 2, 1, 1];
    const rowsSum = rows.reduce((sum, r) => sum + r, 0);
    const colsSum = rows.reduce((sum, c) => sum + c, 0);
    if (rowsSum !== colsSum) {
        console.log('Wrong settings');
        return [];
    }
    const grids = [];
    if (startGrid) {
        for (let [y, row] of gameGrid.entries()) {
            for (let [x, _cell] of row.entries()) {
                const neighbors = helpers_1.get8Neighbors(gameGrid, { x, y });
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
    function traverse(grid, ships, rows, cols, shipLength) {
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
        if (ships.every(n => n === 0)) {
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
                            if (shipLength - horizontalCount <= rows[y] && x + shipLength <= rows.length) {
                                const newGrid = helpers_1.clone(grid);
                                const newRows = [...rows];
                                const newCols = [...cols];
                                const newShips = [...ships];
                                let isWrongWay = false;
                                for (let i = 0; i < shipLength; i++) {
                                    const cell = { x: x + i, y };
                                    let cellType = CellType.Middle;
                                    if (shipLength > 1) {
                                        if (i == 0) {
                                            cellType = CellType.Left;
                                        }
                                        else if (i == shipLength - 1) {
                                            cellType = CellType.Right;
                                        }
                                    }
                                    else {
                                        cellType = CellType.Unit;
                                    }
                                    if (newGrid[cell.y][cell.x] !== CellType.Empty && newGrid[cell.y][cell.x] !== cellType) {
                                        isWrongWay = true;
                                        break;
                                    }
                                    if (newGrid[cell.y][cell.x] == CellType.Empty) {
                                        newCols[cell.x]--;
                                    }
                                    else {
                                        startCellCount++;
                                    }
                                    newGrid[cell.y][cell.x] = -1 * cellType;
                                    const neighbors = helpers_1.get8Neighbors(newGrid, cell);
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
                        }
                        else {
                            if (shipLength - verticalCount <= cols[x] && y + shipLength <= cols.length) {
                                const newGrid = helpers_1.clone(grid);
                                const newCols = [...cols];
                                const newRows = [...rows];
                                const newShips = [...ships];
                                let isWrongWay = false;
                                for (let i = 0; i < shipLength; i++) {
                                    const cell = { x, y: y + i };
                                    let cellType = CellType.Middle;
                                    if (shipLength > 1) {
                                        if (i == 0) {
                                            cellType = CellType.Top;
                                        }
                                        else if (i == shipLength - 1) {
                                            cellType = CellType.Bottom;
                                        }
                                    }
                                    else {
                                        cellType = CellType.Unit;
                                    }
                                    if (newGrid[cell.y][cell.x] !== CellType.Empty && newGrid[cell.y][cell.x] !== cellType) {
                                        isWrongWay = true;
                                        break;
                                    }
                                    if (newGrid[cell.y][cell.x] === CellType.Empty) {
                                        newRows[cell.y]--;
                                    }
                                    else {
                                        startCellCount++;
                                    }
                                    newGrid[cell.y][cell.x] = -1 * cellType;
                                    const neighbors = helpers_1.get8Neighbors(newGrid, cell);
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
const solutions = solve(levels_1.default.level128);
console.timeEnd('solve');
for (let [i, s] of solutions.entries()) {
    console.log(`Solutions #${i + 1}`);
    console.log(printSolution(s));
}
function printSolution(grid) {
    return grid.map(row => row.map(cell => cell == CellType.Dot ? '.' : Math.abs(cell).toString()).join('')).join('\n');
}
//# sourceMappingURL=battleShipsSolver.js.map