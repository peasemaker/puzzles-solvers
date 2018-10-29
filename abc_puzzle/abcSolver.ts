(() => {
    interface Puzzle {
        top: string[];
        bottom: string[];
        left: string[];
        right: string[];
        startGrid?: string[][];
        letters: string;
    }

    const level = 57;
    const emptyCell = 'x';
    const {
        top,
        bottom,
        left,
        right,
        startGrid,
        letters
    }: Puzzle = require(`./levels/${level}`);

    const size = top.length;
    const cols: string[][] = [];
    const rows: string[][] = [];
    const lettersAmount = letters.length;
    const emptyAmount = size - lettersAmount;
    const values = letters.padEnd(size, emptyCell).split('');

    for (let i = 0; i < size; i++) {
        cols.push([top[i], bottom[i]]);
        rows.push([left[i], right[i]]);
    }

    const grid = startGrid || times(size, () => (
        new Array(size).fill('0')
    ));

    const permutations = makePermutations(values);

    function solve() {
        const rowCombinations = rows.map((rowRules, y) => getCombinations(permutations, rowRules, grid[y]));
        const colCombinations = cols.map((colRules, x) => getCombinations(permutations, colRules, grid.map(row => row[x])));

        const calculatePossibleValues = (
            y: number,
            x: number,
            rowCombinations: Set<string[]>,
            colCombinations: Set<string[]>
        ): Set<string> => {
            const possibleValuesInRow = new Set([...rowCombinations].map((values) => values[x]));
            const possibleValuesInCol = new Set([...colCombinations].map((values) => values[y]));
            let possibleValues = intersection(possibleValuesInRow, possibleValuesInCol);

            for (let values of rowCombinations) {
                if (!possibleValues.has(values[x])) {
                    rowCombinations.delete(values);
                }
            }

            for (let values of colCombinations) {
                if (!possibleValues.has(values[y])) {
                    colCombinations.delete(values);
                }
            }

            return possibleValues;
        };

        let changed = false;
        let changedCount = 0;

        do {
            changed = false;

            for (let [y, row] of grid.entries()) {
                for (let [x, char] of row.entries()) {
                    if (char === '0') {
                        const prevRowCombLength = rowCombinations[y].size;
                        const prevColCombLength = colCombinations[x].size;
                        const possibleValues = calculatePossibleValues(y, x, rowCombinations[y], colCombinations[x]);
                        const rowCombLength = rowCombinations[y].size;
                        const colCombLength = colCombinations[x].size;

                        if (possibleValues.size === 1) {
                            grid[y][x] = [...possibleValues][0];
                            changed = true;
                            
                            changedCount++;
                        }

                        if (rowCombLength !== prevRowCombLength || colCombLength !== prevColCombLength) {
                            changed = true;
                        }
                    }
                }
            }
        } while(changed);

        let iterations = 0;

        const emptyCells = grid.reduce((cells, row, y) => (
            row.reduce((cells, value, x) => [
                ...cells,
                ...(value !== '0' ? [] : [{ x, y }])
            ], cells)
        ), [] as { x: number, y: number }[]);

        const emptyLen = emptyCells.length;

        const traverse = (ix: number, rowsComb: Set<string[]>[], colsComb: Set<string[]>[]) => {
            if (ix === emptyLen) {
                return true;
            }

            const { x, y } = emptyCells[ix];

            const rowCombinations = filterCombinations(rowsComb[y], grid[y]);
            const colCombinations = filterCombinations(colsComb[x], grid.map((row) => row[x]));

            const possibleValues = calculatePossibleValues(y, x, rowCombinations, colCombinations);

            if (!possibleValues.size) {
                return false;
            }

            const result = [...possibleValues].some((value) => {
                grid[y][x] = value;

                iterations++;

                return traverse(ix + 1, [...rowsComb], [...colsComb]);
            });

            if (!result) {
                grid[y][x] = '0';
            }

            return result;
        };

        traverse(0, rowCombinations, colCombinations);

        return { iterations, changedCount };
    }

    function makePermutations(values: string[]): string[][] {
        const permutations: string[][] = [];
        const size = values.length;

        function permute(perm: string = '') {
            if (perm.length === size) {
                permutations.push(perm.split(''));
                perm = '';
            } else {
                for (let i = 0; i < size; i++) {
                    const empties =  perm.match(new RegExp(`${emptyCell}`, 'g'));
                    const emptyLen = empties ? empties.length : 0;
                    if (perm.indexOf(values[i]) === -1 || (values[i] === emptyCell && emptyLen < emptyAmount)) {
                        perm += values[i];

                        permute(perm);

                        perm = perm.slice(0, -1);
                    }
                }
            }
        }

        permute();

        return permutations;
    }

    function checkPerm(perm: string[], rules: string[], truePerm: string[]): boolean {
        for (let i = 0; i < truePerm.length; i++) {
            if (perm[i] !== truePerm[i] && truePerm[i] !== '0') {
                return false;
            }
        }

        const leftRule = rules[0];
        const rightRule = rules[1];
        let left = '';
        let right = '';

        if (leftRule !== emptyCell) {
            for (let i = 0; i < perm.length; i++) {
                if (perm[i] !== emptyCell) {
                    left = perm[i];
                    break;
                }
            }
        }

        if (rightRule !== emptyCell) {
            for (let i = perm.length - 1; i >= 0; i--) {
                if (perm[i] !== emptyCell) {
                    right = perm[i];
                    break;
                }
            }
        }

        const isLeftTrue = leftRule !== emptyCell ? left === leftRule : true;
        const isRightTrue = rightRule !== emptyCell ? right === rightRule : true;

        return isLeftTrue && isRightTrue;
    }

    function getCombinations(permutations: string[][], rules: string[], truePerm: string[]): Set<string[]> {
        return new Set(permutations.filter(perm => checkPerm(perm, rules, truePerm)));
    }

    function filterCombinations(combinations: Set<string[]>, truePerm: string[]): Set<string[]> {
        const filteredCombinations = new Set(combinations);

        for (let comb of filteredCombinations) {
            for (let i = 0; i < truePerm.length; i++) {
                if (comb[i] !== truePerm[i] && truePerm[i] !== '0') {
                    filteredCombinations.delete(comb);
                }
            }
        }

        return filteredCombinations;
    }

    function intersection(set1: Set<string>, set2: Set<string>): Set<string> {
        const intersections = new Set<string>();

        for (let n of set1) {
            if (set2.has(n) && n !== '0') {
                intersections.add(n)
            }
        }

        return intersections;
    }

    function times<T>(number: number, cb: (i: number) => T) {
        const array: T[] = [];

        for (let i = 0; i < number; i++) {
            array.push(cb(i));
        }

        return array;
    }

    console.time('solve');

    const { iterations, changedCount } = solve();

    console.timeEnd('solve');

    console.log(level, iterations, changedCount);
    console.log(grid);
})();