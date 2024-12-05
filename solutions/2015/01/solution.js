const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    init() {

        // Get the raw input from https://adventofcode.com/2015/day/1
        let input = this.getInput();

        let floor    = 0;
        let basement = null;

        let steps = input.split('').map(c => {
            switch(c) {
                case '(':
                    return 1;
                case ')':
                    return -1;
                default:
                    return 0;
            }
        });

        // Simpler solution for Part 1:
        // let floor = steps.reduce((a, b) => a + b, 0);
    
        for (let s = 0; s < steps.length; s++) {
            const step = steps[s];

            floor += step;

            if ( basement === null && floor < 0 ) {
                basement = s + 1;
            }
            
        }
        
        console.info(`Part 1: ${floor}`); // 280
        console.info(`Part 2: ${basement}`); // 1797
    
    }
    
}

module.exports = Solution;
