"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const levels_1 = require("./levels");
var SignType;
(function (SignType) {
    SignType["Empty"] = ".";
    SignType["More"] = ">";
    SignType["Less"] = "<";
})(SignType || (SignType = {}));
function convertCell(cell) {
    return `${cell.x}-${cell.y}`;
}
function convertToCell(code) {
    return {
        x: +code.split('-')[0],
        y: +code.split('-')[1]
    };
}
function getCellSets(signSets) {
    let cellSets = [];
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let [y, row] of signSets.entries()) {
        for (let [x, signSet] of row.entries()) {
            const moreCount = signSet.more.size;
            const lessCount = signSet.less.size;
            const availableDigits = digits.slice(moreCount, digits.length - lessCount);
            cellSets.push({
                x,
                y,
                values: new Set(availableDigits)
            });
        }
    }
    return cellSets.sort((a, b) => a.values.size - b.values.size);
}
function getSignSets(signs) {
    const height = signs.length;
    const width = signs[0].length;
    let signSets = new Array(height).fill(0)
        .map(() => new Array(width).fill(0).map(() => ({ more: new Set(), less: new Set() })));
    for (let [y, row] of signs.entries()) {
        for (let [x, signsForCell] of row.entries()) {
            const cell = { x, y };
            const neighbors = helpers_1.get4Neighbors(signs, cell);
            for (let i = 0; i < signsForCell.length; i++) {
                const sign = signsForCell[i];
                const n = neighbors[i];
                if (sign === SignType.More) {
                    const cellCode = convertCell(cell);
                    const nCode = convertCell(n);
                    signSets[y][x].more.add(nCode);
                    signSets[n.y][n.x].less.add(cellCode);
                }
                else if (sign === SignType.Less) {
                    const cellCode = convertCell(cell);
                    const nCode = convertCell(n);
                    signSets[y][x].less.add(nCode);
                    signSets[n.y][n.x].more.add(cellCode);
                }
            }
        }
    }
    for (let [y, row] of signs.entries()) {
        for (let [x, _signsForCell] of row.entries()) {
            function traverse(cellsCodes, type) {
                const originSet = signSets[y][x][type];
                for (let cellCode of cellsCodes) {
                    const cell = convertToCell(cellCode);
                    const setB = signSets[cell.y][cell.x][type];
                    if (setB.size == 0) {
                        continue;
                    }
                    for (let elemB of setB) {
                        originSet.add(elemB);
                    }
                    traverse(setB, type);
                }
            }
            traverse(signSets[y][x].more, 'more');
            traverse(signSets[y][x].less, 'less');
        }
    }
    return signSets;
}
function solve(level) {
    const grids = [];
    const { signs, fields } = level;
    const gridFields = fields.trim().split('\n').map(row => row.trim().split('').map(x => +x));
    const cellsSigns = signs.trim().split('\n').map(row => row.trim().split(' '));
    const signSets = getSignSets(cellsSigns);
    const cellSets = getCellSets(signSets);
    const height = cellsSigns.length;
    const width = cellsSigns[0].length;
    const startGrid = new Array(height).fill(0).map(() => new Array(width).fill(0));
    console.log(cellSets);
    console.log(gridFields);
    function traverse(grid, sets) {
        if (sets.length === 0) {
            grids.push(grid);
            return;
        }
        if (grids.length > 0 || sets.some(set => set.values.size === 0)) {
            return;
        }
        const currentSet = sets[0];
        const values = currentSet.values;
        const currentX = currentSet.x;
        const currentY = currentSet.y;
        if (values.size === 0) {
            return;
        }
        sets = sets.slice(1);
        for (let value of values) {
            const newGrid = helpers_1.clone(grid);
            newGrid[currentY][currentX] = value;
            let newSets = [];
            for (let set of sets) {
                let newValues = new Set(set.values);
                const setX = set.x;
                const setY = set.y;
                const signSet = signSets[setY][setX];
                const moreSet = signSet.more;
                const lessSet = signSet.less;
                const cellCode = convertCell({ x: currentX, y: currentY });
                if (moreSet.has(cellCode)) {
                    newValues = new Set([...newValues].filter((x) => x > value));
                }
                if (lessSet.has(cellCode)) {
                    newValues = new Set([...newValues].filter((x) => x < value));
                }
                if (setX === currentX || setY === currentY || gridFields[setY][setX] === gridFields[currentY][currentX]) {
                    if (newValues.has(value)) {
                        newValues.delete(value);
                    }
                }
                newSets.push({
                    x: setX,
                    y: setY,
                    values: newValues
                });
            }
            newSets = newSets.sort((a, b) => a.values.size - b.values.size);
            traverse(newGrid, newSets);
        }
    }
    traverse(startGrid, cellSets);
    return grids;
}
console.time('solve');
const solutions = solve(levels_1.default.level15);
console.timeEnd('solve');
for (let [i, s] of solutions.entries()) {
    console.log(`Solutions #${i + 1} of level 15`);
    console.log(s);
}
//# sourceMappingURL=moreOrLessSolver.js.map