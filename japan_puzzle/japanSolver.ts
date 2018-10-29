// JSON generator
// const table = document.querySelector('.nonogram_table');
// const [cols, rows] = table.querySelectorAll('table');
// const colValues = [...cols.rows[0].cells].map((cell, ix) => (
//     [...cols.rows]
//         .map((row) => +row.cells[ix].textContent)
//         .filter(Boolean)
// ));
// const rowValues = [...rows.rows].map((row) => (
//     [...row.cells]
//         .map((cell) => +cell.textContent)
//         .filter(Boolean)
// ));
// console.log(JSON.stringify({ rows: rowValues, cols: colValues }));
// ***************

const easyPuzzle = {"rows":[[12],[24],[18,13],[8,9],[6,7],[5,7],[5,7],[5,7],[5,8],[6,8],[6,8],[6,8],[6,8],[6,8],[6,8],[7,8],[7,9],[6,9],[6,10],[6,10],[6,10],[6,11],[5,11],[5,12],[6,11],[5,12],[6,11],[6,12],[5,12],[6,13],[6,13],[6,13],[7,14],[6,14],[6,16],[6,16],[6,16],[6,16],[6,16],[6,17],[6,17],[6,17],[6,8,8],[6,8,7],[6,5,8,8],[6,8,3,8,7],[7,11,12,8,7],[21,18,8,6],[24,22,8,7],[11,12,25,8,9],[11,11,14,4,8,8],[11,10,12,12,7],[10,8,11,12,6],[9,7,12,12,5],[8,8,17,12,5],[8,15,8,13,18],[6,19,8,16,18],[7,9,8,7,3,6,5,17],[7,10,2,3,7,2,6,7,16],[4,3,7,2,7,2,6,6,17],[5,4,4,3,7,4,20],[8,7,6,4,19],[8,8,6,4,18],[2,4,2,2,6,3,18],[2,4,2,6,2,13,4],[2,4,2,6,13,4],[2,4,2,6,13,2],[3,4,2,6,12,1,2],[9,6,12,2,2],[9,6,12,2,1],[9,6,16,1],[9,1,8,16,1],[9,1,1,9,17,2],[8,1,1,10,18,1],[9,2,2,4,5,18,1],[9,1,1,4,3,19,1],[9,1,2,7,2,20,1],[9,2,3,12,2,20,1],[9,9,10,3,20,2],[10,8,4,6,20,1],[9,4,3,21,1],[9,6,20,2],[10,6,7,20,1],[9,7,10,20,2],[10,10,3,7,20,1],[9,29,20,2],[9,9,5,15,23],[9,10,13,23],[9,9,12,22],[9,24,11,22],[8,27,11,21],[8,41,21],[9,12,18,19],[9,9,15,18],[9,6,7,4,17],[6,4,7,2,16],[5,7,10,15],[6,25,2,15],[6,23,16],[6,21,16],[7,12,17],[7,8,19],[7,6,3,8,19],[8,7,4,10,20],[9,2,3,5,12,21],[9,4,1,2,24,21],[18,2,24,23],[18,1,8,15,25],[17,10,14,26],[15,10,41],[15,5,1,40],[15,4,38],[16,5,37],[16,7,37],[17,1,7,37],[16,1,9,21,15],[10,5,1,8,19,15],[10,5,2,8,1,17,15],[12,4,2,8,2,16,15],[12,3,3,8,2,15,15],[13,7,9,3,13,15],[12,7,25,15],[11,7,23,16],[11,29,16],[11,25,16],[10,20,16],[11,17,16],[10,14,16],[10,10,16],[11,7,16],[11,16],[12,15],[12,15],[13,15],[14,14],[15,14],[16,13],[16,13],[15,12],[40]],"cols":[[5],[19],[21,22],[27,2,18],[33,3,19],[66],[74],[76,1],[15,49,4],[12,12,22,6],[10,10,2,22,9],[8,9,23,12],[8,8,1,24,15],[7,5,2,38],[7,5,3,34],[7,5,4,30],[7,6,3,27],[5,5,4,27],[5,5,4,25],[5,5,5,12,11],[4,5,6,11,8],[4,5,6,4,12,7],[3,5,6,7,13,7],[3,4,6,9,14,7],[3,5,2,9,15,6],[3,5,2,9,16,7],[3,8,9,10,3,7],[3,9,1,5,8,4,1,3,6],[3,9,3,3,2,9,3,9,7],[3,9,3,2,10,2,4,6,6],[2,7,2,2,10,2,6,7],[2,6,2,3,11,3,5,6],[3,6,3,4,3,6,4,3,4,5,7],[3,14,4,3,5,3,4,5,5,6],[2,8,2,2,4,3,4,2,1,5,7],[2,1,2,4,3,4,2,2,6,5,6],[2,2,1,5,3,3,2,5,16,6],[2,1,3,3,3,9,18,5],[3,2,3,3,3,28,5],[3,2,2,2,3,3,27,5],[3,10,3,3,25,5],[3,10,3,3,28,5],[3,4,11,3,4,8,17,4],[3,28,2,3,4,8,10,5],[3,25,3,2,3,4,4,3,8,5],[3,27,5,4,4,3,8,4],[2,24,4,4,3,5,3,11,4],[2,23,5,5,3,12,10,4],[3,16,5,2,5,3,14,7,3],[3,11,4,2,6,3,15,6,3],[2,8,5,2,5,3,15,5,2],[2,7,8,10,17,7,2],[2,7,6,31,7,2],[2,8,3,40,2],[2,12,12,23,1],[3,11,13,21,1],[2,5,4,13,21,1],[2,5,3,11,20,1],[2,4,6,8,19,1],[3,4,6,7,17,1],[3,5,6,7,15,1],[3,5,5,7,12,1],[3,4,5,5,12,1],[4,4,5,2,13,1],[3,4,2,13,1],[4,4,2,14,1],[4,4,1,13,1],[5,5,2,15,1],[5,5,3,3,15,1],[6,5,9,17,1],[6,4,7,17,1],[7,4,6,19,1],[7,4,4,20,1],[9,3,2,31,18],[10,3,2,58],[10,4,60],[11,4,62],[12,7,64],[13,27,65],[48,67],[125],[124],[123],[121],[120],[118],[21,84],[21,1,42,33],[22,2,41,24],[22,5,40],[67],[64],[35,22],[30,14,6],[18,5,15,4],[8,6,13,3],[6,6,3],[9,3],[9,4],[7]]};
const cols = easyPuzzle.cols;
const rows = easyPuzzle.rows;
const colsSize = cols.length;
const rowsSize = rows.length;
const puzzleSum = getPuzzleSum(rows);

enum CellType {
    filled = 1,
    closed = 0,
    empty = -100
}

function getPuzzleSum(rows: number[][]): number {
    let sum = 0;
    for (let row of rows) {
        sum += row.reduce((a, b) => {
            a = a === -1 ? 0 : a;
            b = b === -1 ? 0 : b;

            return a + b;
        }, 0);
    }

    return sum;
}

function createCanvas(rows: number[][], cols: number[][], picture: number[][]) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const maxRow = getLonger(rows);
    const maxCol = getLonger(cols);
    const cellSize = 20;

    canvas.width = (maxRow + colsSize) * cellSize + 5;
    canvas.height = (maxCol + rowsSize) * cellSize + 5;

    const ctx = canvas.getContext('2d')!;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, maxRow * cellSize, maxCol * cellSize);

    for (let i = 0; i < colsSize; i++) {
        ctx.strokeRect(maxRow * cellSize + i * cellSize, 0, cellSize, maxCol * cellSize);
        for (let j = cols[i].length - 1; j >=0; j--) {
            ctx.fillText(cols[i][j].toString(), cellSize * (maxRow + i) + 5, cellSize * (maxCol + j - cols[i].length + 1) - 5);
        }
    }

    for (let i = 0; i < rowsSize; i++) {
        ctx.strokeRect(0, maxCol * cellSize + i * cellSize, maxRow * cellSize, cellSize);
        for (let j = rows[i].length - 1; j >= 0; j--) {
            ctx.fillText(rows[i][j].toString(), cellSize * (maxRow + j - rows[i].length) + 5, cellSize * (maxCol + i) + 15);
        }
    }

    for (let x = 0; x < picture.length; x++) {
        for (let y = 0; y < picture[x].length; y++) {
            if (picture[x][y] == CellType.filled) {
                ctx.fillStyle = 'black';
                ctx.fillRect((maxRow + y) * cellSize, (maxCol + x) * cellSize, cellSize, cellSize);
            } else if (picture[x][y] == CellType.closed) {
                ctx.strokeRect((maxRow + y) * cellSize, (maxCol + x) * cellSize, cellSize, cellSize);
                ctx.beginPath();
                ctx.arc((maxRow + y) * cellSize + cellSize / 2, (maxCol + x) * cellSize + cellSize/ 2, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            } else {
                ctx.strokeRect((maxRow + y) * cellSize, (maxCol + x) * cellSize, cellSize, cellSize);
            }
        }
    }
}

function getLonger(collection: number[][]): number {
    return Math.max(...collection.map(arr => arr.length));
}

function firstIteration(rows: number[][], cols: number[][]): number[][][] {
    const rowValues: number[][] = [];
    const colValues: number[][] = [];

    for (let row of rows) {
        const left = leftType(row, colsSize);
        const right = rightType(row, colsSize);
        const newRow = compare(left, right);

        rowValues.push(newRow);
    }

    for (let col of cols) {
        const left = leftType(col, rowsSize);
        const right = rightType(col, rowsSize);
        const newCol = compare(left, right);

        colValues.push(newCol);
    }

    return combineResults(rowValues, colValues);
}

function combineResults(rows: number[][], cols: number[][]): number[][][] {
    const picture = makePicture(rows, cols);
    const newRowValues: number[][] = [];
    const newColValues: number[][] = [];

    for (let row of picture) {
        newRowValues.push(row);
    }

    for (let c = 0; c < cols.length; c++) {
        const newCol = [];
        for (let i = 0; i < picture.length; i++) {
            newCol.push(picture[i][c]);
        }
        newColValues.push(newCol);
    }

    console.log('picture', picture);

    return [newRowValues, newColValues];
}

function makePicture(rows: number[][], cols: number[][]): number[][] {
    const newPicture = [];

    for (let row of rows) {
        newPicture.push(row);
    }

    for (let c = 0; c < cols.length; c++) {
        const col = cols[c];

        for (let i = 0; i < newPicture.length; i++) {
            if (newPicture[i][c] !== CellType.filled && newPicture[i][c] !== CellType.closed) {
                newPicture[i][c] = col[i];
            }
        }
    }

    return newPicture;
}

function leftType(arr: number[], size: number): string[] {
    let bStr = '';
    for (let i = 0; i < arr.length; i++) {
        bStr += `${arr[i]}-${i}*`.repeat(arr[i]);
        bStr += CellType.empty + '*';
        if (i == arr.length - 1) {
            bStr = bStr.slice(0, -1);
        }
    }

    let newArr = bStr.split('*');
    let fillArr = new Array(size - newArr.length).fill(CellType.empty.toString());

    return newArr.concat(fillArr);
}

function rightType(arr: number[], size: number): string[] {
    let bStr = '';
    for (let i = 0; i < arr.length; i++) {
        bStr += CellType.empty + '*';
        bStr += `${arr[i]}-${i}*`.repeat(arr[i]);
        if (i == arr.length - 1) {
            bStr = bStr.slice(0, -1);
        }
    }

    let newArr = bStr.split('*');
    let fillArr = new Array(size - newArr.length).fill(CellType.empty.toString());

    return fillArr.concat(newArr);
}

function compare(a: string[], b: string[]): number[] {
    let newArr = [];
    for (let i = 0; i < a.length; i++) {
        if (a[i] == b[i] && a[i] !== CellType.empty.toString()) {
            newArr.push(CellType.filled);
        } else {
            newArr.push(CellType.empty);
        }
    }

    return newArr;
}

function makePermutations(values: number[], size: number): number[][] {
    const permutations: number[][] = [];
    const firstMinIndex = 0;
    const firstMaxIndex = size  - values.reduce((a, b) => a + b, 0) - values.length + 1;
    const group: number[] = [];
    const groupIndexes: number[][] = values.map(() => []);

    values.forEach((_value, index) => {
        if (index === 0) {
            groupIndexes[index] = [firstMinIndex, firstMaxIndex];
        } else {
            groupIndexes[index] = [groupIndexes[index - 1][0] + values[index - 1] + 1, groupIndexes[index - 1][1] + values[index - 1] + 1];
        }
    });

    const permute = (groupIndex: number) => {
        if (group.length == values.length) {
            permutations.push(convertToArray(values,[...group], size));
        } else {
            const prevValue = values[groupIndex - 1] || 0;
            const indexes = groupIndexes[groupIndex];
            const prevGroupIndex = group[groupIndex - 1] || 0;

            for (let i = 0; i <= indexes[1] - indexes[0]; i++) {
                const newIndex = indexes[0] + i;
                if (groupIndex === 0 || (newIndex > prevGroupIndex + prevValue)) {
                    group.push(newIndex);

                    permute(groupIndex + 1);

                    group.pop();
                }
            }
        }
    };

    permute(0);

    return permutations;
}

function convertToArray(values: number[], perm: number[], size: number): number[] {
    let binaryStr = CellType.closed.toString().repeat(size);

    for (let i = 0; i < values.length; i++) {
        const leftPart = binaryStr.slice(0, perm[i]);
        const rightPart = binaryStr.slice(perm[i] + values[i]);

        binaryStr = leftPart + CellType.filled.toString().repeat(values[i]) + rightPart;
    }

    return binaryStr.split('').map(x => +x);
}

function combinePerms(perms: number[][], size: number): number[] {
    if (perms.length === 0) {
        return new Array(size).fill(CellType.empty);
    }

    return perms.reduce((a, b) => sumArray(a, b, size));
}

function filterPerms(truePerm: number[], perms: number[][]): number[][] {
    return perms.filter((perm) => checkPerm(truePerm, perm));
}

function sumArray(arr1: number[], arr2: number[], size: number): number[] {
    const newArray = new Array(size).fill(0);

    for (let i = 0; i < size; i++) {
        newArray[i] = arr1[i] == arr2[i] ? arr1[i] : CellType.empty;
    }

    return newArray;
}

function checkPerm(truePerm: number[], perm: number[]): boolean {
    for (let i = 0; i < truePerm.length; i++) {
        if ((truePerm[i] == CellType.closed && perm[i] == CellType.filled) || (truePerm[i] == CellType.filled && perm[i] == CellType.closed)) {
            return false;
        }
    }

    return true;
}

console.time('solve');

function solve(rows: number[][], cols: number[][]): number[][] {
    let [rowValues, colValues] = firstIteration(rows, cols);
    // const rowSize = rows.length;
    // const colSize = cols.length;
    // let rowNewValues = [];
    // let colNewValues = [];
    // // const rowPerms = rows.map(row => (
    //     makePermutations(row, rowSize)
    // ));
    // const colPerms = cols.map(col => (
    //     makePermutations(col, colSize)
    // ));
    //
    // let counter = 1;
    // let newPuzzleSum = 0;
    //
    // while(counter < 100) {
    //     for (let r = 0; r < rows.length; r++) {
    //         let filterRowPerms =  filterPerms(rowValues[r], rowPerms[r]);
    //         rowNewValues.push(combinePerms(filterRowPerms, rowSize));
    //
    //         if (r == 10) {
    //             console.log('filterRowPerms', filterRowPerms);
    //             console.log('comb', combinePerms(filterRowPerms, rowSize));
    //         }
    //     }
    //
    //     for (let c = 0; c < cols.length; c++) {
    //         let filterColPerms = filterPerms(colValues[c], colPerms[c]);
    //         colNewValues.push(combinePerms(filterColPerms, colSize));
    //     }
    //
    //     [rowValues, colValues] = combineResults(rowNewValues, colNewValues);
    //
    //     rowNewValues = [];
    //     colNewValues = [];
    //
    //     newPuzzleSum = getPuzzleSum(rowValues);
    //
    //     if (newPuzzleSum == puzzleSum) {
    //         console.log('Iteration: ', counter);
    //         break;
    //     }
    //
    //     counter += 1;
    // }

    return makePicture(rowValues, colValues);
}

const picture = solve(rows, cols);

console.timeEnd('solve');

createCanvas(rows, cols, picture);

