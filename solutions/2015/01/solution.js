import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    init() {

        let floor    = 0;
        let basement = null;

        let steps = this.input.split('').map(c => {
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
