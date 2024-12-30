const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    init() {

        // PART 1

        let stones = new Map();

        let values = this.input.split(/\s+/).map(Number);
        
        for (let v = 0; v < values.length; v++) {
            this.incrementMap( stones, values[v] );
        }
        
        for (let i = 0; i < 25; i++) {
            stones = this.blink( stones );
            console.info(`Blink ${i+1} --> ${this.getMapTotal(stones)} stones `, Math.floor(performance.now()) + ' ms', Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 ) + ' MB' );
        }

        let total = this.getMapTotal( stones );
    
        console.info(`Part 1: ${total}`, Math.floor(performance.now()) + ' ms', Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 ) + ' MB' ); // 220722

        // PART 2
    
        // Do it 50 more times (for a total of 75).
        for (let i = 25; i < 75; i++) {
            stones = this.blink( stones );
            console.info(`Blink ${i+1} --> ${this.getMapTotal(stones)} stones `, Math.floor(performance.now()) + ' ms', Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 ) + ' MB' );
        }
    
        console.info(`Part 2: ${stones.length}`, Math.floor(performance.now()) + ' ms', Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 ) + ' MB' ); // 
    
    }

    blink( stones ) {

        let newStones = new Map();

        stones.forEach( (count, value) => {

            countLoop:
            for (let i = 0; i < count; i++) {
                
                // Rule 1: if stone value is 0, it becomes 1.
                if ( value === 0 ) {
                    this.incrementMap( newStones, 1 );
                    continue countLoop;
                }
    
                // Rule 2: if the stone value has an even number of digits, split them in half and make two new stones.
                let digits = String(value).split('');
                
                if ( digits.length % 2 === 0 ) {
                    let leftStone = Number( digits.slice(0, digits.length / 2).join('') );
                    let rightStone = Number( digits.slice(digits.length / 2).join('') );
                    this.incrementMap( newStones, leftStone );
                    this.incrementMap( newStones, rightStone );
                    continue countLoop;
                }
    
                // Rule 3 (default): multiply the stone value by 2024.
                this.incrementMap( newStones, value * 2024 );
                continue countLoop;
                
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
