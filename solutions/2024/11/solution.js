const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    solutions  = new Map();
    evolutions = new Map();

    init() {

        let stones = this.input.split(/\s+/).map(Number);

        // PART 1
        let total  = 0;

        for (let s = 0; s < stones.length; s++) {
            total += this.blink( stones[s], 25, 100 / stones.length );
        }

        console.info(`Part 1: ${total}`, this.getPerformance() ); // 220722

        // PART 2

        total = 0;
    
        for (let s = 0; s < stones.length; s++) {
            total += this.blink( stones[s], 75, 100 / stones.length );
        }

        console.info(`Part 2: ${total}`, this.getPerformance() ); // 
    
    }

    blink( stone, cycles, progress ) {

        let total = 0;

        let mapID = `${stone}-${cycles}`;

        if ( this.solutions.has(mapID) ) {

            total = this.solutions.get(mapID);
            this.progress += progress;

        } else {

            let newStones = this.evolveStone(stone);
    
            cycles--;
    
            if ( cycles === 0 ) {
                total = newStones.length;
                this.progress += progress;
            } else {
                for (let s = 0; s < newStones.length; s++) {
                    total += this.blink( newStones[s], cycles, progress / newStones.length );
                }
            }
    
            this.solutions.set( mapID, total );
    
        }

        return total;

    }

    evolveStone(stone) {

        let newStones;
        
        // See if we’ve saved the result of this evolution in the evolutions map.
        if ( this.evolutions.has(stone) ) {

            newStones = this.evolutions.get(stone);

        } else {

            newStones = [];

            // Convert the current stone into the new stone(s) that it produces.
            loopNewStones:
            while ( true ) {

                // Rule 1: if stone value is 0, it becomes 1.
                if ( stone === 0 ) {
                    newStones.push(1);
                    break loopNewStones;
                }

                // Rule 2: if the stone value has an even number of digits, split them in half and make two new stones.
                let digits     = String(stone);
                let halfDigits = digits.length / 2;
                if ( digits.length % 2 === 0 ) {
                    newStones.push( Number( digits.substring( 0, halfDigits ) ) );
                    newStones.push( Number( digits.substring( halfDigits    ) ) );
                    break loopNewStones;
                }

                // Rule 3 (default): multiply the stone value by 2024.
                newStones.push( stone * 2024 );
                break loopNewStones;
                
            }

            this.evolutions.set( stone, newStones );

        }

        return newStones;

    }

}

module.exports = Solution;
