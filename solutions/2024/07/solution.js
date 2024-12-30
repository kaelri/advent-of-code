import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    operators = [ '+', '*' ];

    init() {

        let equations = this.getLines(this.input).map(line => {
            let [ result, factors ] = line.split(':').map(part => part.trim());
            result = parseInt(result);
            factors = factors.split(' ').map(factor => parseInt(factor));
            return { result, factors };
        });

        // PART 1

        let equationsSolvable = this.findSolvableEquations( equations );
    
        console.info(`Part 1: ${equationsSolvable}`); // 267566105056
    
        // PART 2

        this.operators.push('||');

        equationsSolvable = this.findSolvableEquations( equations );
    
        console.info(`Part 2: ${equationsSolvable}`); // 116094961956019
    
    }

    findSolvableEquations( equations ) {
        return equations.filter(equation => this.findSolution( null, null, equation.factors, equation.result )).reduce((total, equation) => total + equation.result, 0);
    }

    findSolution( total, operator, factors, target ) {

        switch ( operator ) {
            case '+':
                total += factors[0];
                break;
            case '*':
                total *= factors[0];
                break;
            case '||':
                total = parseInt(`${total}${factors[0]}`);
                break;
            default:
                // At the beginning, start with the first factor as the total.
                total = factors[0];
                break;
        }
        
        // If we’ve reached the end of the factors, it’s time to check the total.
        if ( factors.length === 1 ) {
            return Boolean( total === target );
        }

        // If the total is greater than the target, it’s not possible to continue and find a working combination, since + and * will only keep increasing the total.
        if ( total > target ) return false;

        // Otherwise, keep going.
        for (let o = 0; o < this.operators.length; o++) {
            const operator = this.operators[o];

            if ( this.findSolution( total, operator, factors.slice(1), target ) ) {
                return true;
            }
            
        }

        return false; // no combination found

    }

}
