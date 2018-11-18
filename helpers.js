"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clone(arr) {
    return arr.map(row => [...row]);
}
exports.clone = clone;
// [left, right, top, bottom]
function get4Neighbors(grid, cell) {
    let neighbors = [null, null, null, null];
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;
    if (cell.x > 0) {
        neighbors[0] = { x: cell.x - 1, y: cell.y };
    }
    if (cell.y > 0) {
        neighbors[1] = { x: cell.x, y: cell.y - 1 };
    }
    if (cell.x < gridHeight - 1) {
        neighbors[2] = { x: cell.x + 1, y: cell.y };
    }
    if (cell.y < gridWidth - 1) {
        neighbors[3] = { x: cell.x, y: cell.y + 1 };
    }
    return neighbors;
}
exports.get4Neighbors = get4Neighbors;
// [left, top-left, top, top-right, right, bottom-right, bottom, bottom-left]
function get8Neighbors(grid, cell) {
    let neighbors = new Array(8).fill(null);
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;
    if (cell.x > 0) {
        neighbors[0] = { x: cell.x - 1, y: cell.y };
    }
    if (cell.y > 0 && cell.x > 0) {
        neighbors[1] = { x: cell.x - 1, y: cell.y - 1 };
    }
    if (cell.y > 0) {
        neighbors[2] = { x: cell.x, y: cell.y - 1 };
    }
    if (cell.y > 0 && cell.x < gridHeight - 1) {
        neighbors[3] = { x: cell.x + 1, y: cell.y - 1 };
    }
    if (cell.x < gridHeight - 1) {
        neighbors[4] = { x: cell.x + 1, y: cell.y };
    }
    if (cell.y < gridWidth - 1 && cell.x < gridHeight - 1) {
        neighbors[5] = { x: cell.x + 1, y: cell.y + 1 };
    }
    if (cell.y < gridWidth - 1) {
        neighbors[6] = { x: cell.x, y: cell.y + 1 };
    }
    if (cell.y < gridWidth - 1 && cell.x > 0) {
        neighbors[7] = { x: cell.x - 1, y: cell.y + 1 };
    }
    return neighbors;
}
exports.get8Neighbors = get8Neighbors;
//# sourceMappingURL=helpers.js.map