/**
 * --- Day 5: Hydrothermal Venture ---

You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.

They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2

Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:

    An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
    An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.

For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

So, the horizontal and vertical lines from the above list would produce the following diagram:

.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....

In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.

To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.

Consider only horizontal and vertical lines. At how many points do at least two lines overlap?

 */

// var fs = require('fs');

// const data = fs.readFileSync('./day5Input.txt', 'utf8');
// const lines = Array.from(data.split('\n'), x => x.match(/(\d+)/g));


// find dimensions of array (where X coords are evens, Ys are odd
// function findDimensions(lines) {
//     let maxH = 0;
//     let maxV = 0;
//     for (line of lines) {
//         for (let i = 0; i < line.length; i++){
//             num = Number(line[i]);
//             if (i%2 === 0 && num > maxH) {
//                 maxH = num;
//             } 
//             if (i%2 === 1 && num > maxV) {
//                 maxV = num;
//             } 
//         }
//     }
//     return [maxH, maxV];
// }

// grid is from 0 to max inclusive
// function createGrid(maxH, maxV) {
//     let grid = [];
//     let row = Array(maxH + 1).fill(0);
//     for (c = 0; c <= maxV; c++) {
//         grid.push(row);
//     }
//     return grid
// }

// let dims = findDimensions(lines);
// let grid = createGrid(dims[0],dims[1]);

// let dims = findDimensions(testArr);
// let grid = createGrid(dims[0],dims[1]);

// for (const line of testArr) {
//     let x1,y1,x2,y2;
//     [x1,y1,x2,y2] = line;

//     if (x1 === x2) {
//         for (let y = Math.min(y1,y2); y <= Math.min(y1,y2); y++) {
//             grid[y][x1]++;
//         } 
//     } else if (y1 === y2) {
//         for (let x = Math.min(x1,x2); x < Math.min(x1,x2); x++) {
//             grid[y1][x]++;
//         }
//     }
// }

var fs = require('fs');

const data = fs.readFileSync('./day5Input.txt', 'utf8');
const lines = Array.from(data.split('\n'), x => x.match(/(\d+)/g));

const coordinates = {};

function part1(coordinates, lines) {
    lines.forEach(([x1, y1, x2, y2]) => {
        if (x1 === x2) {
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);

            for (let y = minY; y < maxY + 1; y++) {
                const value = coordinates[`${x1},${y}`] || 0;
                coordinates[`${x1},${y}`] = value + 1;
            }
        } else if (y1 === y2) {
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);

            for (let x = minX; x < maxX + 1; x++) {
                const value = coordinates[`${x},${y1}`] || 0;
                coordinates[`${x},${y1}`] = value + 1;
            }
        }
    });
    return coordinates;
}


function part2(coordinates, lines) {
    lines.forEach(([x1, y1, x2, y2]) => {
        if (x1 === x2) {
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);

            for (let y = minY; y < maxY + 1; y++) {
                const value = coordinates[`${x1},${y}`] || 0;
                coordinates[`${x1},${y}`] = value + 1;
            }
        } else if (y1 === y2) {
            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);

            for (let x = minX; x < maxX + 1; x++) {
                const value = coordinates[`${x},${y1}`] || 0;
                coordinates[`${x},${y1}`] = value + 1;
            }
        }
    });
    return coordinates;
}

let result = part1(coordinates, lines);

console.log(Object.values(result).reduce((count, value) => {
    return count + (value > 1 ? 1 : 0);
}, 0));