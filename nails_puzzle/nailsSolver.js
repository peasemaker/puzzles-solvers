"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const levels_1 = require("./levels");
const helpers_1 = require("../helpers");
const fs = require('fs');
const solutions = require('./solutions.json');
for (let levelKey of Object.keys(levels_1.default)) {
    const level = levels_1.default[levelKey];
    if (solutions[levelKey]) {
        continue;
    }
    console.log(levelKey);
    ((gameString) => {
        const gameGrid = gameString.trim().split(/\n/).filter(x => x).map(x => x.trim().split('').map(x => parseInt(x)));
        if (gameGrid.length !== 10 || gameGrid.some(row => row.length !== 10)) {
            console.log('wrong grid');
            return;
        }
        const nailsCoords = [];
        for (let [x, row] of gameGrid.entries()) {
            for (let [y, cell] of row.entries()) {
                if (cell == 1) {
                    nailsCoords.push({ x, y });
                }
            }
        }
        const nailCount = gameGrid.reduce((i, row) => {
            return i + row.reduce((j, cell) => {
                return j + (cell !== 0 ? 1 : 0);
            }, 0);
        }, 0);
        function getStartCells(grid) {
            const startNumbers = [];
            let id = 1;
            const newGrid = helpers_1.clone(grid);
            for (let [x, row] of grid.entries()) {
                for (let [y, cell] of row.entries()) {
                    if (cell !== 0) {
                        startNumbers.push({ x, y, id });
                        newGrid[x][y] = id;
                        id++;
                    }
                }
            }
            return [startNumbers, newGrid];
        }
        function getPlanksForNail(grid, nail) {
            const planks = [];
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
            if (x - 1 >= 0 && x + 1 < grid[0].length) {
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
            if (x + 2 < grid[0].length) {
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
            if (y - 1 >= 0 && y + 1 < grid.length) {
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
            if (y + 2 < grid.length) {
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
        function checkChainRule(grid) {
            let start = { x: -1, y: -1 };
            let testGrid = helpers_1.clone(grid);
            for (let [x, row] of grid.entries()) {
                if (start.x > 0 && start.y > 0) {
                    break;
                }
                for (let [y, cell] of row.entries()) {
                    if (cell !== 0) {
                        start = { x, y };
                        break;
                    }
                }
            }
            if (start.x < 0 && start.y < 0) {
                return false;
            }
            testGrid[start.x][start.y] = -1;
            let neighbors = helpers_1.get4Neighbors(testGrid, start);
            neighbors = neighbors.filter(i => i && testGrid[i.x][i.y] !== -1 && testGrid[i.x][i.y] !== 0);
            const fillAmount = grid.reduce((i, row) => {
                return i + row.reduce((j, cell) => {
                    return j + (cell !== 0 ? 1 : 0);
                }, 0);
            }, 0);
            function traverse(neighbors) {
                if (neighbors.length === 0) {
                    return;
                }
                for (let n of neighbors) {
                    if (n !== null) {
                        testGrid[n.x][n.y] = -1;
                        const newNeighbors = helpers_1.get4Neighbors(testGrid, n).filter(i => i && testGrid[i.x][i.y] !== -1 && testGrid[i.x][i.y] !== 0);
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
        function checkConnectionRule(grid, isNotFinished) {
            const checked = new Array(nailCount).fill(0).map(() => ({ connections: 0, ids: new Set() }));
            for (let [x, row] of grid.entries()) {
                for (let [y, cell] of row.entries()) {
                    if (cell !== 0) {
                        const neighbors = helpers_1.get4Neighbors(grid, { x, y });
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
        function solve(grid) {
            const [startCells, startGrid] = getStartCells(grid);
            const grids = [];
            const connections = findConnections(grid);
            function traverse(grid, usedIds) {
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
                    const newGrid = helpers_1.clone(grid);
                    const newSet = new Set(usedIds);
                    let flag = false;
                    for (let c of plank) {
                        newGrid[c.x][c.y] = c.id;
                        let neighbors = helpers_1.get4Neighbors(grid, c).filter(n => n);
                        if (neighbors.some(n => connections[c.id - 1].never.has(grid[n.x][n.y]))) {
                            flag = true;
                            continue;
                        }
                        if (neighbors.every(n => usedIds.has(grid[n.x][n.y]) && connections[c.id - 1].always.size !== 0 && !connections[c.id - 1].always.has(grid[n.x][n.y]))) {
                            flag = true;
                            continue;
                        }
                        newSet.add(c.id);
                    }
                    if (!flag) {
                        traverse(newGrid, newSet);
                    }
                }
            }
            traverse(startGrid, new Set());
            return grids;
        }
        function findConnections(grid) {
            const [startCells, startGrid] = getStartCells(grid);
            const possiblePlanks = startCells
                .map(cell => getPlanksForNail(startGrid, cell));
            const connections = new Array(startCells.length).fill(0).map(() => ({
                always: new Set(),
                probably: new Set(),
                never: new Set()
            }));
            for (let i = 0; i < possiblePlanks.length; i++) {
                let id1 = i + 1;
                for (let j = 0; j < possiblePlanks.length; j++) {
                    if (i == j) {
                        continue;
                    }
                    let id2 = j + 1;
                    let countConnections = 0;
                    possiblePlanks[i].forEach((planks1) => {
                        const testGrid = helpers_1.clone(startGrid);
                        for (let p1 of planks1) {
                            testGrid[p1.x][p1.y] = id1;
                        }
                        possiblePlanks[j].forEach((planks2) => {
                            let isConnected = false;
                            if (planks2.some((p2) => testGrid[p2.x][p2.y] == id1)) {
                                return;
                            }
                            for (let p2 of planks2) {
                                let neighbors = helpers_1.get4Neighbors(testGrid, p2).filter(n => n);
                                if (neighbors.some(n => testGrid[n.x][n.y] == id1)) {
                                    isConnected = true;
                                }
                            }
                            if (isConnected && checkConnectionRule(testGrid, true)) {
                                countConnections++;
                            }
                        });
                    });
                    if (countConnections == possiblePlanks[i].length * possiblePlanks[j].length) {
                        connections[id1 - 1].always.add(id2);
                    }
                    else if (countConnections == 0) {
                        connections[id1 - 1].never.add(id2);
                    }
                    else {
                        connections[id1 - 1].probably.add(id2);
                    }
                }
                if (connections[id1 - 1].always.size + connections[id1 - 1].probably.size == 2) {
                    connections[id1 - 1].always = new Set([...connections[id1 - 1].always, ...connections[id1 - 1].probably]);
                    connections[id1 - 1].probably = new Set();
                }
            }
            return connections;
        }
        console.time('solve');
        const solution = solve(gameGrid);
        console.timeEnd('solve');
        for (let s of solution) {
            let printedSolution = s.map((row => row.map(number => number ? '1' : '0')));
            for (let nailCoord of nailsCoords) {
                printedSolution[nailCoord.x][nailCoord.y] = 'X';
            }
            solutions[levelKey] = printedSolution;
        }
    })(level);
    fs.writeFileSync('solutions.json', JSON.stringify(solutions), 'utf8');
}
//# sourceMappingURL=nailsSolver.js.map