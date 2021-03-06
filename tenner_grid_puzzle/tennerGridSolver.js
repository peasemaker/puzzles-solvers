"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const gridString = `
    ......0915
    .8...5..7.
    .5.2...1..
    .....6.957
    8.0.9.5...
    73.......1
`;
const size = 6;
const values = [33, 22, 13, 34, 26, 41, 22, 29, 32, 18];
const gameGrid = gridString.trim().split(/\n/).filter(x => x).map(x => x.trim().split('').map(x => x == '.' ? -1 : parseInt(x)));
function getPossibleValues(grid) {
    const rowsSets = new Array(size).fill(null).map(() => new Set());
    const cellSets = [];
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
                    const neighbors = helpers_1.get8Neighbors(grid, { x, y }).filter(k => k !== null && grid[k.x][k.y] !== -1);
                    if (!rowsSets[x].has(i) && neighbors.every(k => grid[k.x][k.y] !== i)) {
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
        let perms = [];
        function traverse(perm, rowValue) {
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
            }
            else {
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
function checkValues(grid) {
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
function solve(grid) {
    const grids = [];
    function traverse(grid) {
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
            const newGrid = helpers_1.clone(grid);
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
//# sourceMappingURL=tennerGridSolver.js.map