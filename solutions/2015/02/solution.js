import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    init() {

        let presents = this.getLines(this.input).map( line => {

            let dimensions = line.split('x').map( x => parseInt(x) );
            let [ l, w, h ] = dimensions;
            
            dimensions.sort( (a, b) => a - b );
            let short1 = dimensions[0];
            let short2 = dimensions[1];

            let wrapping = (2*l*w) + (2*w*h) + (2*h*l) + ( short1 * short2 );
            let ribbon   = ( 2 * ( short1 + short2 ) ) + ( l * w * h );

            return { l, w, h, wrapping, ribbon }

        });

        let wrappingTotal = presents.reduce( (total, present) => {
            return total + present.wrapping;
        }, 0 );
        
        let ribbonTotal = presents.reduce( (total, present) => {
            return total + present.ribbon;
        }, 0 );
        
        // PART 1
        console.info(`Part 1: ${wrappingTotal}`); // 1606483
    
        // PART 2
        console.info(`Part 2: ${ribbonTotal}`); // 3842356
    
    }
    
}
