import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    init() {

        this.grid = this.getGrid( this.input, (value) => {
            return {
                elevation: value === '.' ? -1 : parseInt(value),
            }
        });

        let trailheads = Array.from( this.grid.keys() )
        .filter( id => this.grid.get(id).elevation === 0 )
        .map( id => {
            return {
                id:     id,
                score:  0,
                rating: 0,
            }
        });

        for (let t = 0; t < trailheads.length; t++) {
            const trailhead = trailheads[t];

            let result = this.findPaths( trailhead.id, 0, [] );
            trailhead.score  = result.score;
            trailhead.rating = result.rating;

        }

        let totals = trailheads.reduce( (total, trailhead) => {
            total.score += trailhead.score;
            total.rating += trailhead.rating;
            return total;
        }, {
            score: 0,
            rating: 0,
        });

        // PART 1

        console.info(`Part 1: ${totals.score}`); // 607
    
        // PART 2
    
        console.info(`Part 2: ${totals.rating}`); // 1384
    
    }

    findPaths( nodeID, elevation, summits ) {

        let result = {
            score: 0,
            rating: 0,
        };

        let [x,y] = this.getGridCoords( nodeID );

        let candidates = [
            [ x+1, y   ],
            [ x-1, y   ],
            [ x,   y+1 ],
            [ x,   y-1 ]
        ];

        for (let c = 0; c < candidates.length; c++) {
            const candidateCoords = candidates[c];

            let candidateID = this.getGridID( candidateCoords[0], candidateCoords[1] );

            let candidate = this.grid.get( candidateID );

            if ( !candidate || candidate.elevation !== elevation + 1 ) continue;

            if ( candidate.elevation === 9 ) {

                result.rating++;

                if ( !summits.includes(candidateID) ) {
                    result.score++;
                    summits.push( candidateID );
                }

            } else {

                let candidateResult = this.findPaths( candidateID, elevation + 1, summits );
                result.score  += candidateResult.score;
                result.rating += candidateResult.rating;

            }

            
        }

        return result;

    }
    
}
