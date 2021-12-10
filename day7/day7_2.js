/**
--- Day 7: The Treachery of Whales ---
--- Part Two ---

The crabs don't seem interested in your proposed solution. Perhaps you misunderstand crab engineering?

As it turns out, crab submarine engines don't burn fuel at a constant rate. Instead, each change of 1 step in horizontal position costs 1 more unit of fuel than the last: the first step costs 1, the second step costs 2, the third step costs 3, and so on.

As each crab moves, moving further becomes more expensive. This changes the best horizontal position to align them all on; in the example above, this becomes 5:

    Move from 16 to 5: 66 fuel
    Move from 1 to 5: 10 fuel
    Move from 2 to 5: 6 fuel
    Move from 0 to 5: 15 fuel
    Move from 4 to 5: 1 fuel
    Move from 2 to 5: 6 fuel
    Move from 7 to 5: 3 fuel
    Move from 1 to 5: 10 fuel
    Move from 2 to 5: 6 fuel
    Move from 14 to 5: 45 fuel

This costs a total of 168 fuel. This is the new cheapest possible outcome; the old alignment position (2) now costs 206 fuel instead.

Determine the horizontal position that the crabs can align to using the least fuel possible so they can make you an escape route! How much fuel must they spend to align to that position?
 */


const fs = require('fs');

// x TODO find min and max of crab's positions
function getMinMax(inputArr) {
    minPos = Math.min(...inputArr);
    maxPos = Math.max(...inputArr);
    return [minPos, maxPos];
}
// console.log(getMinMax(testArr));


// x TODO loop through and find sum of moves needed to reach each position
// x TODO return minimum
function getMinFuelAndPosition(inputArr, minMax){
    let [minPos, maxPos] = minMax;
    let fuelUsed = [];
    let distance = 0;
    
    // there is a simple math formula to find the sum of a range of numbers: 
    // sum(1 to x) = x * (x + 1) / 2
    function getFuelFromDistance(distance) {
        return distance * (distance + 1) / 2;
    }

    // apply formula to the distance generated in our original code - all else functions similarly
    for (let i = minPos; i <= maxPos; i++) {
        fuelBurn = inputArr.reduce((total, current) => 
            total + getFuelFromDistance(Math.abs(current - i)), 0)
        fuelUsed.push(fuelBurn);
    }
    
    let minFuelIndex = 0;
    let minFuel = fuelUsed[0];
    for (let i = 1; i < fuelUsed.length; i++) {
        if (fuelUsed[i] < minFuel) {
            minFuelIndex = i;
            minFuel = fuelUsed[minFuelIndex];
        }
    }
    return [minFuelIndex, minFuel];
}

// test case should return 168 fuel at position 5
// let testArr = [16,1,2,0,4,2,7,1,2,14];
// let [index, minFuel] = getMinFuelAndPosition(testArr, getMinMax(testArr));
// console.log(`Minimum fuel used: ${minFuel}, by moving to position ${index}`);


const data = fs.readFileSync('./day7Input', 'utf8');
const crabPositions = data.split(',');

let [index, minFuel] = getMinFuelAndPosition(crabPositions, getMinMax(crabPositions));
console.log(`Minimum fuel used: ${minFuel}, by moving to position ${index}`);