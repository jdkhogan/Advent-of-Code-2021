/** 
 * --- Day 6: Lanternfish ---

The sea floor is getting steeper. Maybe the sleigh keys got carried this way?

A massive school of glowing lanternfish swims past. They must spawn quickly to reach such large numbers - maybe exponentially quickly? You should model their growth rate to be sure.

Although you know nothing about this specific species of lanternfish, you make some guesses about their attributes. Surely, each lanternfish creates a new lanternfish once every 7 days.

However, this process isn't necessarily synchronized between every lanternfish - one lanternfish might have 2 days left until it creates another lanternfish, while another might have 4. So, you can model each fish as a single number that represents the number of days until it creates a new lanternfish.

Furthermore, you reason, a new lanternfish would surely need slightly longer before it's capable of producing more lanternfish: two more days for its first cycle.

So, suppose you have a lanternfish with an internal timer value of 3:

After one day, its internal timer would become 2.
After another day, its internal timer would become 1.
After another day, its internal timer would become 0.
After another day, its internal timer would reset to 6, and it would create a new lanternfish with an internal timer of 8.
After another day, the first lanternfish would have an internal timer of 5, and the second lanternfish would have an internal timer of 7.

A lanternfish that creates a new fish resets its timer to 6, not 7 (because 0 is included as a valid timer value). The new lanternfish starts with an internal timer of 8 and does not start counting down until the next day.

Realizing what you're trying to do, the submarine automatically produces a list of the ages of several hundred nearby lanternfish (your puzzle input). For example, suppose you were given the following list:

3,4,3,1,2

This list means that the first fish has an internal timer of 3, the second fish has an internal timer of 4, and so on until the fifth fish, which has an internal timer of 2. Simulating these fish over several days would proceed as follows:

Initial state: 3,4,3,1,2
After  1 day:  2,3,2,0,1
After  2 days: 1,2,1,6,0,8
After  3 days: 0,1,0,5,6,7,8
After  4 days: 6,0,6,4,5,6,7,8,8
After  5 days: 5,6,5,3,4,5,6,7,7,8
After  6 days: 4,5,4,2,3,4,5,6,6,7
After  7 days: 3,4,3,1,2,3,4,5,5,6
After  8 days: 2,3,2,0,1,2,3,4,4,5
After  9 days: 1,2,1,6,0,1,2,3,3,4,8
After 10 days: 0,1,0,5,6,0,1,2,2,3,7,8
After 11 days: 6,0,6,4,5,6,0,1,1,2,6,7,8,8,8
After 12 days: 5,6,5,3,4,5,6,0,0,1,5,6,7,7,7,8,8
After 13 days: 4,5,4,2,3,4,5,6,6,0,4,5,6,6,6,7,7,8,8
After 14 days: 3,4,3,1,2,3,4,5,5,6,3,4,5,5,5,6,6,7,7,8
After 15 days: 2,3,2,0,1,2,3,4,4,5,2,3,4,4,4,5,5,6,6,7
After 16 days: 1,2,1,6,0,1,2,3,3,4,1,2,3,3,3,4,4,5,5,6,8
After 17 days: 0,1,0,5,6,0,1,2,2,3,0,1,2,2,2,3,3,4,4,5,7,8
After 18 days: 6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8

Each day, a 0 becomes a 6 and adds a new 8 to the end of the list, while each other number decreases by 1 if it was present at the start of the day.

In this example, after 18 days, there are a total of 26 fish. After 80 days, there would be a total of 5934.

Find a way to simulate lanternfish. How many lanternfish would there be after 80 days?
*/

var fs = require('fs');

class Fish {
    constructor(timer) {
        this.timer = Number(timer);
    }
}

function sumFish(fishArr, days) {
    let outStr = "";
    for (day = 0; day <= days; day++) {
        
        // initialize print string based on the day
        outStr = `After ${day} day`;
        outStr += (day === 1 ? ": " : "s: ");

        tempArr = [...fishArr];
        for (f = 0; f < tempArr.length; f++) {
            fish = tempArr[f];
            outStr += `${fish.timer}, `;
            
            if (day !== days) {    
                if (fish.timer === 0) {
                    fishArr.push(new Fish(8));
                    fish.timer = 6;
                } else {
                    fish.timer--;
                }
            }
        }
        // print to console for debugging
        console.log(outStr.slice(0,-2));
    }
    let totalFish = fishArr.length;

    // console.log(`After ${days} days, total of ${totalFish} fish.`);
}

// test cases
/** 
 * let testArr = [];
for (num of [3,4,3,1,2]) {
    testArr.push(new Fish(num));
}

should result in 26
sumFish(testArr, 18);

should result in 5934
sumFish(testArr, 80);
*/

const data = fs.readFileSync('./day6Input', 'utf8');
const fishNums = Array.from(data.split(','), x => x.match(/(\d+)/g));

//part 1
// let fArr = [];
// for (num of fishNums) {
//     fArr.push(new Fish(num));
// }

// sumFish(fArr, 80);



/** --------------------------------------------------------- 
 * The original approach starts to drag after about 80 days. 
I don't actually need to create individual Fish objects, I just need to track the number of items at each day.
Time to start fresh
------------------------------------------------------------- */

//part 2
class FishTracker {
    // builds an object of timer: numFish pairs
    constructor(intialList) {
        // initialize fish list with value 0 for all timer numbers
        this.fishList = {};
        for (let i = 0; i <= 8; i++) {
            this.fishList[i] = 0;
        }
        // add number of fish to each timer
        for (let fish of intialList) {
            this.fishList[fish]++;
        }
    }

    listFish() {
        return this.fishList;
    }

    sumFish() {
        let sum = 0;
        for (let item in this.fishList) {
            sum += this.fishList[item];
        }
        return sum;    
    }

    iterateFish() {
        let tempList = {};
        for (let i = 0; i <= 8; i++) {
            tempList[i] = 0;
        }
        tempList['6'] = this.fishList['0'];
        tempList['8'] = this.fishList['0'];
        for (let i = 1; i <= 8; i++) {
            tempList[i-1] += this.fishList[i];
        }
        this.fishList = tempList;
    }

    printFishOnDay(day) {
        for (let d = 0; d < day; d++) {
            this.iterateFish();
        }
        console.log(`After ${day} days, total of ${this.sumFish()} fish.`);
    }
}

// test case
let pond = new FishTracker([3,4,3,1,2]);
/**console.log(pond.listFish());
console.log(pond.sumFish());

pond.iterateFish();
console.log(pond.listFish());
console.log(pond.sumFish());

pond.iterateFish();
console.log(pond.listFish());
console.log(pond.sumFish());

// should print 26
pond.printFishOnDay(18);

// should print 5934
pond.printFishOnDay(80);
*/

let ocean = new FishTracker(fishNums);

// ocean.printFishOnDay(80);
ocean.printFishOnDay(256);