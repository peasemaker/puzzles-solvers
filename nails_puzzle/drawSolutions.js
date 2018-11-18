"use strict";
const solutions = require('./solutions.json');
var CellTypes;
(function (CellTypes) {
    CellTypes["Empty"] = "0";
    CellTypes["Nail"] = "X";
    CellTypes["Wood"] = "1";
})(CellTypes || (CellTypes = {}));
function drawSolution(solution, title) {
    const levelTitle = document.createElement('h1');
    levelTitle.innerText = title;
    document.body.appendChild(levelTitle);
    const canvas = document.createElement('canvas');
    const size = 35;
    const width = size * solution[0].length;
    const height = size * solution.length;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    for (let [y, row] of solution.entries()) {
        for (let [x, cell] of row.entries()) {
            switch (cell) {
                case CellTypes.Empty: {
                    const image = new Image(size, size);
                    image.src = require('./sprites/empty.png');
                    ctx.drawImage(image, x * size, y * size, size, size);
                    break;
                }
                case CellTypes.Wood: {
                    const image = new Image(size, size);
                    image.src = require('./sprites/wood.png');
                    ctx.drawImage(image, x * size, y * size, size, size);
                    break;
                }
                case CellTypes.Nail: {
                    const image = new Image(size, size);
                    image.src = require('./sprites/nail.png');
                    ctx.drawImage(image, x * size, y * size, size, size);
                    break;
                }
            }
        }
    }
}
window.onload = function () {
    for (let levelKey of Object.keys(solutions)) {
        const levelNumber = parseInt(levelKey.match(/\d+/)[0]);
        if (levelNumber > 144 && levelNumber < 180) {
            drawSolution(solutions[levelKey], levelKey);
        }
    }
};
//# sourceMappingURL=drawSolutions.js.map