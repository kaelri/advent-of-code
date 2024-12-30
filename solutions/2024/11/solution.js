const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    transforms = new Map();

    shareCompleted = 0;
    timeElapsed    = 0;

    init() {

        // PART 1

        let stones = this.input.split(/\s+/);
        let total  = 0;

        for (let s = 0; s < stones.length; s++) {
            total += this.blink( stones[s], 25, 100000000 / stones.length );
        }

        console.info(`Part 1: ${total}`, this.getPerformance() ); // 220722

        // PART 2

        // Reset progress.
        total = 0;
        this.shareCompleted = 0;
    
        for (let s = 0; s < stones.length; s++) {
            total += this.blink( stones[s], 75, 100000000 / stones.length );
        }

        console.info(`Part 2: ${total}`, this.getPerformance() ); // 
    
    }

    blink( stone, cycles, share ) {

        let newStones = [];
        let total     = 0;

        // See if we’ve saved the result of this evolution in the transforms map.
        if ( this.transforms.has(stone) ) {

            newStones = this.transforms.get(stone);

        } else {

            // Convert the current stone into the new stone(s) that it produces.
            loopNewStones:
            while ( true ) {

                // Rule 1: if stone value is 0, it becomes 1.
                if ( stone === '0' ) {
                    newStones.push('1');
                    break loopNewStones;
                }

                // Rule 2: if the stone value has an even number of digits, split them in half and make two new stones.
                if ( stone.length % 2 === 0 ) {
                    newStones.push( stone.substr(0, stone.length / 2) );
                    newStones.push( stone.substr(stone.length / 2).replace(/^00+/, '0').replace(/^0([^0])/, '$1') );
                    break loopNewStones;
                }

                // Rule 3 (default): multiply the stone value by 2024.
                newStones.push( String( Number(stone) * 2024 ) );
                break loopNewStones;
                
            }

            this.transforms.set( stone, newStones );

        }

        cycles--;

        if ( cycles === 0 ) {
            total = newStones.length;
            this.shareCompleted += share;
        } else {
            for (let s = 0; s < newStones.length; s++) {
                total += this.blink( newStones[s], cycles, share / newStones.length );
            }
        }

        if ( performance.now() - this.timeElapsed > 5000 ) {
            this.timeElapsed = performance.now();
            console.info(`${Math.floor(this.shareCompleted/1000000)}%`, this.getPerformance() );
        }

        return total;

    }

}

module.exports = Solution;
