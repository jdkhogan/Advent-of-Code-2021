/** 
 * Considering every single measurement isn't as useful as you expected: there's just too much noise in the data.

Instead, consider sums of a three-measurement sliding window. Again considering the above example:

199  A      
200  A B    
208  A B C  
210    B C D
200  E   C D
207  E F   D
240  E F G  
269    F G H
260      G H
263        H

Start by comparing the first and second three-measurement windows. The measurements in the first window are marked A (199, 200, 208); their sum is 199 + 200 + 208 = 607. The second window is marked B (200, 208, 210); its sum is 618. The sum of measurements in the second window is larger than the sum of the first, so this first comparison increased.

Your goal now is to count the number of times the sum of measurements in this sliding window increases from the previous sum. So, compare A with B, then compare B with C, then C with D, and so on. Stop when there aren't enough measurements left to create a new three-measurement sum.

In the above example, the sum of each three-measurement window is as follows:

A: 607 (N/A - no previous sum)
B: 618 (increased)
C: 618 (no change)
D: 617 (decreased)
E: 647 (increased)
F: 716 (increased)
G: 769 (increased)
H: 792 (increased)

In this example, there are 5 sums that are larger than the previous sum.

Consider sums of a three-measurement sliding window. How many sums are larger than the previous sum?
*/

// read in input data as CSV, convert to array
var fs = require('fs');
const internal = require('stream');

const data = fs.readFileSync('./day1Input.csv', 'utf8');
const inputArr = Array.from(data.split('\n'), x => Number(x));

// TODO: for loop that starts at index 3, sums current measurements [1,3], sums previous measurements [0,2] 
// TODO: compares and adds to count if current > prev
// TODO: stops at index -1
let count = 0;
for (let i = 4; i < inputArr.length + 1; i++) {
    currentSum = inputArr.slice(i-3,i).reduce( (a,b) => a+b);
    previousSum = inputArr.slice(i-4,i-1).reduce( (a,b) => a+b);
    if (currentSum > previousSum) {
        count++;
    }
}

console.log(count);


// test data
// Realized that my initial error was in how I was slicing the array. My initial slice of (i-2,i) was actually only returning the two values at index i-2 and i-1!
// testArr = [
//     199,
//     200,
//     208,
//     210,
//     200,
//     207,
//     240,
//     269,
//     260,
//     263];

// count = 0;

// for (let i = 4; i < testArr.length + 1; i++) {
//     currentSum = testArr.slice(i-3,i).reduce( (a,b) => a+b);
//     previousSum = testArr.slice(i-4,i-1).reduce( (a,b) => a+b);
//     console.log(currentSum, previousSum);
//     if (currentSum > previousSum) {
//         count++;
//     }
// }
// console.log(count);