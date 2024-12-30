import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    init() {

        const elves = this.input
            .split("\n\n") // Treat two line breaks as a separator between each "elf."
            .map( elf => { // Translate each elf’s entry from raw text to an object with actual numbers.
                return elf
                    .split("\n") // Treat one line break as a separator between each food item.
                    .reduce( ( total, item ) => total + Number(item), 0 ) // Convert the separated strings to numbers and add ’em up.
            })
            .sort( (a,b) => b - a ) // Sort the results from highest to lowest.

        console.info( 'Part 1: ' + elves[0] ) // 70698

        const topThree = elves
            .slice(0,3) // Take the top three elves.
            .reduce( ( total, elf ) => total + elf, 0 ) // Add ’em up just like the food items.

        console.info( 'Part 2: ' + topThree ) // 206643

    }

}
