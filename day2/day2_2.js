/** 
 * Based on your calculations, the planned course doesn't seem to make any sense. You find the submarine manual and discover that the process is actually slightly more complicated.

In addition to horizontal position and depth, you'll also need to track a third value, aim, which also starts at 0. The commands also mean something entirely different than you first thought:

    down X increases your aim by X units.
    up X decreases your aim by X units.
    forward X does two things:
        It increases your horizontal position by X units.
        It increases your depth by your aim multiplied by X.

Again note that since you're on a submarine, down and up do the opposite of what you might expect: "down" means aiming in the positive direction.

Now, the above example does something different:

    forward 5 adds 5 to your horizontal position, a total of 5. Because your aim is 0, your depth does not change.
    down 5 adds 5 to your aim, resulting in a value of 5.
    forward 8 adds 8 to your horizontal position, a total of 13. Because your aim is 5, your depth increases by 8*5=40.
    up 3 decreases your aim by 3, resulting in a value of 2.
    down 8 adds 8 to your aim, resulting in a value of 10.
    forward 2 adds 2 to your horizontal position, a total of 15. Because your aim is 10, your depth increases by 2*10=20 to a total of 60.

After following these new instructions, you would have a horizontal position of 15 and a depth of 60. (Multiplying these produces 900.)

Using this new interpretation of the commands, calculate the horizontal position and depth you would have after following the planned course. What do you get if you multiply your final horizontal position by your final depth?
 */

var fs = require('fs');

const data = fs.readFileSync('./day2Input.txt', 'utf8');
const inputArr = Array.from(data.split('\n'), x => x.split(" "));

// testArr should result in final position of 15, 60
// const testArr = Array.from([
//     "forward 5",
//     "down 5",
//     "forward 8",
//     "up 3",
//     "down 8",
//     "forward 2"], 
//     x => x.split(" "));

function findPosition2(someArr) {
    let horiz = 0;
    let depth = 0;
    let aim = 0;
    for (command of someArr) {
        x = Number(command[1]);
        switch(command[0]) {
            case "forward":
                horiz += x;
                depth += aim * x;
                break;
            case "up":
                aim -= x;
                break;
            case "down":
                aim += x;
                break;
        }
    }
    return [horiz, depth];
}

// testPosition = findPosition2(testArr);
// console.log('horiz: ', testPosition[0]);
// console.log('depth: ', testPosition[1]);

inputPosition = findPosition2(inputArr);
console.log('horiz: ', inputPosition[0]);
console.log('depth: ', inputPosition[1]);
console.log(inputPosition[0] * inputPosition[1])