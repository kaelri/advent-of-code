import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    games = [];

    init() {

        this.games = [ ...this.input.matchAll(/Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g) ]
        .map( match => {
            return {
                aX:     parseInt(match[1]),
                aY:     parseInt(match[2]),
                bX:     parseInt(match[3]),
                bY:     parseInt(match[4]),
                prizeX: parseInt(match[5]),
                prizeY: parseInt(match[6])
            }
        });

        for (let g = 0; g < this.games.length; g++) {
            this.solveGame( g );
        }

        // PART 1
    
        console.info(`Part 1: ${this.getTotalCost()}`); // 28059

        // PART 2
    
        for (let g = 0; g < this.games.length; g++) {
            this.solveGame( g, 10000000000000 );
        }

        console.info(`Part 2: ${this.getTotalCost()}`); // 
    
    }

    solveGame( g, prizeModifier = 0 ) {

        const game = this.games[g];
        let aX     = game.aX;
        let aY     = game.aY;
        let bX     = game.bX;
        let bY     = game.bY;
        let prizeX = game.prizeX + prizeModifier;
        let prizeY = game.prizeY + prizeModifier;

        // ( a * aX ) + ( b * bX ) = prizeX
        // ( a * aY ) + ( b * bY ) = prizeY
        // 3a + b = cost

        let solution = {
            a: 0,
            b: 0,
        }

        // b = 
        // b = ( prizeY - ( a * aY ) ) / bY
        // ( prizeX - ( a * aX ) ) / bX = ( prizeY - ( a * aY ) ) / bY
        // bY * ( prizeX - ( a * aX ) ) = bX * ( prizeY - ( a * aY ) )



        /*
        let aMax = Math.min( Math.floor(prizeX / aX), Math.floor(prizeY / aY) );
        let bMax = Math.min( Math.floor(prizeX / bX), Math.floor(prizeY / bY) );

        loopB:
        for (let b = bMax; b >= 0 ; b--) {
            
            let a1 = ( prizeX - ( b * bX ) ) / aX;
            let a2 = ( prizeY - ( b * bY ) ) / aY;

            if ( Number.isInteger(a1) && a1 === a2 ) {
                solution.a = a1;
                solution.b = b;
                break loopB;
            }
            
        }
        */

        game.solution = solution;
        console.log( g, solution );

    }

    getTotalCost() {
        return this.games.reduce( (cost, game) => cost + 3 * game.solution.a + game.solution.b, 0 );
    }
    
}
