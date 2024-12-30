const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    transforms = new Map();

    init() {

        // PART 1

        let stones = new Map();

        let values = this.input.split(/\s+/);
        
        for (let v = 0; v < values.length; v++) {
            this.incrementMap( stones, values[v] );
        }
        
        for (let i = 0; i < 25; i++) {
            stones = this.blink( stones );
            console.info(`Blink ${i+1} — ${this.getMapTotal(stones)} stones `, this.getPerformance() );
        }

        console.info(`Part 1: ${this.getMapTotal(stones)}`, this.getPerformance() ); // 220722

        // PART 2
    
        // Do it 50 more times (for a total of 75).
        for (let i = 25; i < 75; i++) {
            stones = this.blink( stones );
            console.info(`Blink ${i+1} --> ${this.getMapTotal(stones)} stones `, this.getPerformance() );
        }

        console.info(`Part 2: ${this.getMapTotal(stones)}`, this.getPerformance() ); // 
    
    }

    blink( stones ) {

        let newStones = new Map();

        stones.forEach( (count, value) => {

            let newValue1 = null;
            let newValue2 = null;

            // See if we’ve saved the result of this evolution in the transforms map.
            if ( this.transforms.has(value) ) {

                let transform = this.transforms.get(value);
                newValue1 = transform[0];
                newValue2 = transform[1];

            } else {

                loopNewValue:
                while ( true ) {
    
                    // Rule 1: if stone value is 0, it becomes 1.
                    if ( value === '0' ) {
                        newValue1 = '1';
                    }
        
                    // Rule 2: if the stone value has an even number of digits, split them in half and make two new stones.
                    if ( value.length % 2 === 0 ) {
                        newValue1 = value.substr(0, value.length / 2);
                        newValue2 = value.substr(value.length / 2).replace(/^00+/, '0').replace(/^0([^0])/, '$1');
                        break loopNewValue;
                    }
        
                    // Rule 3 (default): multiply the stone value by 2024.
                    newValue1 = String( Number(value) * 2024 );
                    break loopNewValue;
                    
                }

                this.transforms.set( value, [newValue1, newValue2] );
    
            }

            loopCount:
            for (let i = 0; i < count; i++) {
                this.incrementMap( newStones, newValue1 );
                if ( newValue2 !== null ) {
                    this.incrementMap( newStones, newValue2 );
                }
            }
    
        });

        return newStones;

    }

    incrementMap( map, key ) {
        if ( !map.has(key) ) {
            map.set( key, 1 );
        } else {
            map.set( key, map.get(key) + 1 );
        }
    }

    getMapTotal( map ) {

        let total = 0;

        map.forEach( (count, value) => {
            total += count;
        });

        return total;

    }
    
}

module.exports = Solution;
