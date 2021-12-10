/**
You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your submarine.

Maybe it wants to play bingo?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)

The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7

After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

Finally, 24 is drawn:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

At this point, the third board wins because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: 14 21 17 24 4).

The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.

To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?
*/

var fs = require('fs');

// working off a posted solution
class GameCard {
    // constructor takes an array and stores by number value, with a row-col reference and a boolean to denote whether the number has been called.
    constructor(cardData) {
        this.size = cardData.length;
        this.card = {};
        this.rows = Array(this.size).fill(0);
        this.cols = Array(this.size).fill(0);

        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                const value = cardData[r][c];
                this.card[value] = {
                    row: r,
                    col: c,
                    marked: false
                };
            }
        }
    }

    // function to check each number to see if it's on a given card, and mark it if so.
    markNum(value) {
        if (value in this.card) {
            this.card[value].marked = true;
            this.rows[this.card[value].row]++;
            this.cols[this.card[value].col]++;
        }
    }

    // checks if any row or any col has won. each matching number is incremented in the row / col matrix and when a sum = 5, we have a winner!
    isWinner() {
        return this.rows.some(row => row === this.size) || this.cols.some(col => col === this.size);
    }

    // return the sum of all squares on a given card that are Not marked
    sumOfUnplayedValues() {
        let sum = 0;
        for (let square in this.card) {
            if (!this.card[square].marked) {
                sum += parseInt(square);
            }
        }
        return sum;
    }
}

const BOARD_SIZE = 5;
const data = fs.readFileSync('./day4Input.txt', 'utf8');
const inputArr = Array.from(data.split('\n'));

// extract first line as our random order generator
const numsToDraw = inputArr.shift().split(",");
// console.log(randomOrder);

// extract each card into a an array of arrays
// for each group of 6 lines, take the first 5 lines, pull out only the numbers, and push those as an array.
let inputCards = [];
for (let i = 1; i < inputArr.length; i += 6) {
    inputCards.push(Array.from(inputArr.slice(i, i + 5), x => x.match(/(\d+)/g)));
}

// builds our card data
const createCards = (cardsIn) => {
    const cards = [];
    for (let card = 0; card < cardsIn.length; card++){
        cards.push(new GameCard(cardsIn[card]));
    }
    return cards;
}

const part1 = (numsToDraw, inputCards, size) => {
    const cards = createCards(inputCards);
    
    // draw a number
    for (let num of numsToDraw) {

        // go through all our cards, marking numbers
        for (let card = 0; card < cards.length; card++) {
            cards[card].markNum(num);
    
            // if we hit a winner, return the winning score
            if (cards[card].isWinner()) {
                return ["card " + card, cards[card].sumOfUnplayedValues() * parseInt(num)];
            }
        }
    }
};

console.log('Part 1: ', part1(numsToDraw, inputCards, BOARD_SIZE));

const part2 = (numsToDraw, inputCards, size) => {
    const cards = createCards(inputCards);
    let lastWinner = null;
    let lastNum = -1;

    // draw a number
    for (let num of numsToDraw) {

        // we'll mark numbers, but go in reverse. 
        // this allows us to handle the winner cards - we will remove them until we are left with an empty GameCard[] and a lastWinner GameCard.
        for (let card = cards.length - 1; card >= 0; card--) {
            cards[card].markNum(num);
    
            // if we hit a winner, return the winning score
            if (cards[card].isWinner()) {
                lastWinner = cards.splice(card, 1)[0]
                lastNum = num;
            }
        }
        if (!cards.length) {
            break;
        }
    }
    return lastWinner.sumOfUnplayedValues() * parseInt(lastNum);
};

console.log('Part 2: ', part2(numsToDraw, inputCards, BOARD_SIZE));

// // while loop returns false if conditions A and B are not met for the newest number called
// let drawnNumbers = [];
// let game = {
//     "win": false,
//     "winner": {
//         "number": -1,
//         "card": []
//         }
// }
// function buildWinner(cardsArr, cardInt) {
//     game.win = true;
//     game.winner.number = cardInt;
//     game.winner.card = cardsArr[cardInt];
// }


// while (game.win === false) {
//     // TODO: pull number from front of random numbers list, move into the drawn numbers list
//     drawnNumbers.push(randomOrder.shift());
    
//     // if we haven't drawn 5 numbers, we can't have a winner.
//     if (drawnNumbers.length < 5) {
//         continue;
//     }
    
//     // TODO: loop through groups of five numbers vs. drawn numbers
//     let intersection = [];
//     let count = 0;
//     for (let card = 0; card < cards.length; card++) {
//         // TODO: Condition A: check horizontally [i][1,2,3,4,5]
//             for (let row = 0; row < 5; row++) {
//                 for (let col = 0; col < 5; col++ ) {
//                     if (drawnNumbers.includes(cards[card][row][col])) {
//                         console.log(cards[card][row][col]);
//                         count++;
//                     } else {
//                         count = 0;
//                         break;
//                     }
//                 }
//                 if (count === 5 ) {
//                     buildWinner(cards, card);
//                     break;
//                 }
//             }

//         // TODO: Condition B: check vertically [1,2,3,4,5][i]
//         break;
//     }
// }

// console.log(game.winner.card);

// // TODO: find sum of unmarked numbers 
//     // once we have a winner, sum up total card, then delete any marked numbers
// // TODO: report score by multiplying card value x last number called.
 