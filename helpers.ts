export interface Cell {
    x: number;
    y: number;
}

export type Neighbors = (Cell | null)[];

export function clone<T>(arr: T[][]): T[][] {
    return arr.map(row => [...row]);
}

// [left, right, top, bottom]
export function get4Neighbors(grid: any[][], cell: Cell): Neighbors {
    let neighbors: Neighbors = [null, null, null, null];
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;

    if (cell.x > 0) {
        neighbors[0] = {x: cell.x - 1, y: cell.y};
    }

    if (cell.y > 0) {
        neighbors[1] = {x: cell.x, y: cell.y - 1};
    }

    if (cell.x < gridHeight - 1) {
        neighbors[2] = {x: cell.x + 1, y: cell.y};
    }

    if (cell.y < gridWidth - 1) {
        neighbors[3] = {x: cell.x, y: cell.y + 1};
    }

    return neighbors;
}

// [left, top-left, top, top-right, right, bottom-right, bottom, bottom-left]
export function get8Neighbors(grid: any[][], cell: Cell): Neighbors {
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