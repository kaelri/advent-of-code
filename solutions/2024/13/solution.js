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

        // ( a * aX ) + ( b * bX ) = prizeX
        // ( a * aY ) + ( b * bY ) = prizeY
        // 3a + b = cost

        const game = this.games[g];

        let solution = {
            a: 0,
            b: 0,
        }

        let prizeX = game.prizeX + prizeModifier;
        let prizeY = game.prizeY + prizeModifier;

        let aMax = Math.min( Math.floor(prizeX / game.aX), Math.floor(prizeY / game.aY) );
        let bMax = Math.min( Math.floor(prizeX / game.bX), Math.floor(prizeY / game.bY) );

        loopA:
        for (let a = 0; a <= aMax; a++) {

            let remainderX = prizeX - a * game.aX;
            let remainderY = prizeY - a * game.aY;

            loopB:
            for (let b = 0; b <= bMax; b++) {

                let resultX = a * game.aX + b * game.bX;
                let resultY = a * game.aY + b * game.bY;

                if ( resultX === prizeX && resultY === prizeY ) {
                    solution.a = a;
                    solution.b = b;
                    break loopA;
                }

                // If we go past the prize, break this loop; it will just keep increasing.
                if ( resultX > prizeX || resultY > prizeY ) break loopB;

            }

        }

        game.solution = solution;

    }

    getTotalCost() {
        return this.games.reduce( (cost, game) => cost + 3 * game.solution.a + game.solution.b, 0 );
    }
    
}
