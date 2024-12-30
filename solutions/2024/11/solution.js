const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    init() {

        // PART 1

        let stones = this.input.split(/\s+/).map(Number);
        
        for (let i = 0; i < 25; i++) {
            stones = this.blink( stones );
            console.info(`Blink ${i+1} --> ${stones.length} stones `, Math.floor(performance.now()) + ' ms', Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 ) + ' MB' );
        }
    
        console.info(`Part 1: ${stones.length}`, Math.floor(performance.now()) + ' ms', Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 ) + ' MB' ); // 220722
    
        // PART 2
    
        // Do it 50 more times (for a total of 75).
        for (let i = 25; i < 75; i++) {
            stones = this.blink( stones );
            console.info(`Blink ${i+1} --> ${stones.length} stones `, Math.floor(performance.now()) + ' ms', Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 ) + ' MB' );
        }
    
        console.info(`Part 2: ${stones.length}`, Math.floor(performance.now()) + ' ms', Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 ) + ' MB' ); // 
    
    }

    blink( stones ) {

        let newStones = [];

        for (let i = 0; i < stones.length; i++) {
            let stone = stones[i];
            
            // Rule 1: if stone value is 0, it becomes 1.
            if ( stone === 0 ) {

                stone = 1;
                newStones.push( stone );
                continue;

            }

            // Rule 2: if the stone value has an even number of digits, split them in half and make two new stones.
            let digits = String(stone).split('');
            
            if ( digits.length % 2 === 0 ) {
                
                let leftStone = Number( digits.slice(0, digits.length / 2).join('') );
                let rightStone = Number( digits.slice(digits.length / 2).join('') );
                newStones.push( leftStone, rightStone );
                continue;

            }

            // Rule 3 (default): multiply the stone value by 2024.
            stone *= 2024;
            newStones.push( stone );
            
        }

        return newStones;

    }
    
}

module.exports = Solution;
