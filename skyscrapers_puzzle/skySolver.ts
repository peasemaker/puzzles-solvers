(() => {
    interface Puzzle {
        top: number[];
        bottom: number[];
        left: number[];
        right: number[];
        startGrid?: number[][];
    }

    const level = 30;
    const {
        top,
        bottom,
        left,
        right,
        startGrid
    }: Puzzle = require(`./levels/${level}`);

    const size = top.length;
    const cols: number[][] = [];
    const rows: number[][] = [];

    for (let i = 0; i < size; i++) {
        cols.push([top[i], bottom[i]]);
        rows.push([left[i], right[i]]);
    }

    const grid = startGrid || times(size, () => (
        new Array(size).fill(0)
    ));

    const permutations = makePermutations(size);

    function solve() {
        const rowCombinations = rows.map((rowRules, y) => getCombinations(permutations, rowRules, grid[y]));
        const colCombinations = cols.map((colRules, x) => getCombinations(permutations, colRules, grid.map(row => row[x])));

        const calculatePossibleValues = (
            y: number,
            x: number,
            rowCombinations: Set<number[]>,
            colCombinations: Set<number[]>
        ): Set<number> => {
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
                for (let [x, digit] of row.entries()) {
                    if (!digit) {
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
                ...(value ? [] : [{ x, y }])
            ], cells)
        ), [] as { x: number, y: number }[]);

        const emptyLen = emptyCells.length;

        const traverse = (ix: number, rowsComb: Set<number[]>[], colsComb: Set<number[]>[]) => {
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
                grid[y][x] = 0;
            }

            return result;
        };

        // traverse(0, rowCombinations, colCombinations);

        return { iterations, changedCount };
    }

    function makePermutations(size: number): number[][] {
        const numbers: number[] = [];
        const permutations: number[][] = [];

        for (let i = 1; i <= size; i++) {
            numbers.push(i);
        }

        function permute(perm: Set<number>) {
            if (perm.size === size) {
                permutations.push([...perm]);
                perm = new Set<number>();
            } else {
                for (let i = 0; i < size; i++) {
                    if (!perm.has(numbers[i])) {
                        perm.add(numbers[i]);

                        permute(new Set(perm));

                        perm.delete(numbers[i]);
                    }
                }
            }
        }

        permute(new Set<number>());

        return permutations;
    }

    function checkPerm(perm: number[], rules: number[], truePerm: number[]): boolean {
        for (let i = 0; i < truePerm.length; i++) {
            if (perm[i] !== truePerm[i] && truePerm[i] !== 0) {
                return false;
            }
        }


        const leftRule = rules[0];
        const rightRule = rules[1];
        let leftMax = perm[0];
        let rightMax = perm[perm.length - 1];
        let left = 1;
        let right = 1;

        if (leftRule !== 0) {
            for (let i = 1; i < perm.length; i++) {
                if (perm[i] > leftMax) {
                    left++;
                    leftMax = perm[i];
                }
            }
        }

        if (rightRule !== 0) {
            for (let i = perm.length - 2; i >= 0; i--) {
                if (perm[i] > rightMax) {
                    right++;
                    rightMax = perm[i];
                }
            }
        }

        const isLeftTrue = leftRule ? left === leftRule : true;
        const isRightTrue = rightRule ? right === rightRule : true;

        return isLeftTrue && isRightTrue;
    }

    function getCombinations(permutations: number[][], rules: number[], truePerm: number[]): Set<number[]> {
        return new Set(permutations.filter(perm => checkPerm(perm, rules, truePerm)));
    }

    function filterCombinations(combinations: Set<number[]>, truePerm: number[]): Set<number[]> {
        const filteredCombinations = new Set(combinations);

        for (let comb of filteredCombinations) {
            for (let i = 0; i < truePerm.length; i++) {
                if (comb[i] !== truePerm[i] && truePerm[i] !== 0) {
                    filteredCombinations.delete(comb);
                }
            }
        }

        return filteredCombinations;
    }

    function intersection(set1: Set<number>, set2: Set<number>): Set<number> {
        const intersections = new Set<number>();

        for (let n of set1) {
            if (set2.has(n)) {
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