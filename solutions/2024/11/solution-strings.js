import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    init() {

        // PART 1

        // let stones = this.input.split(/\s+/).map(Number);
        let stones = this.input;
        let count  = 0;
        
        for (let i = 0; i < 25; i++) {
            [ stones, count ] = this.blink( stones, count );
            console.info(`Blink ${i+1} --> ${count} stones `);
        }
    
        console.info(`Part 1: ${stones.length}`); // 220722
    
        // PART 2
    
        // Do it 50 more times (for a total of 75).
        /*for (let i = 25; i < 75; i++) {
            [ stones, count ] = this.blink( stones, count );
            console.info(`Blink ${i+1} --> ${count} stones `);
        }*/
    
        console.info(`Part 2: ${stones.length}`); // 
    
    }

    blink( stones, count ) {

        let newStones    = '';
        let currentStone = '';

        for (let i = 0; i < stones.length; i++) {
            let char = stones[i];

            if ( char === ' ' || i === stones.length - 1 ) {

                let stoneValue = Number( currentStone );
            
                // Rule 1: if stone value is 0, it becomes 1.
                if ( stoneValue === 0 ) {

                    stoneValue = 1;
                    newStones += ' ' + String(stoneValue);
                    count += 1;
                    continue;

                }

                // Rule 2: if the stone value has an even number of digits, split them in half and make two new stones.
                let digits = currentStone.split('');
                
                if ( digits.length % 2 === 0 ) {
                    
                    let leftStone = Number( digits.slice(0, digits.length / 2).join('') );
                    let rightStone = Number( digits.slice(digits.length / 2).join('') );
                    newStones += ' ' + String(leftStone) + ' ' + String(rightStone);
                    count += 2;
                    continue;

                }

                // Rule 3 (default): multiply the stone value by 2024.
                stoneValue *= 2024;
                newStones += ' ' + String(stoneValue);
                count += 1;

            } else {

                currentStone += char;

            }
            
        }

        return [ newStones.trim(), count ];

    }
    
}
