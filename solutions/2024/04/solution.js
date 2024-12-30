import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {
    grid = [];

    directions = {
        'n':  { dy: -1, dx:  0 },
        'ne': { dy: -1, dx:  1 },
        'e':  { dy:  0, dx:  1 },
        'se': { dy:  1, dx:  1 },
        's':  { dy:  1, dx:  0 },
        'sw': { dy:  1, dx: -1 },
        'w':  { dy:  0, dx: -1 },
        'nw': { dy: -1, dx: -1 },
    };

    init() {

        let lines = this.getLines( this.input );
        
         // Further split each row into an array of individual characters.
        this.grid = lines.map(row => row.split(''));

        let total = 0;

        // PART 1

        loopRows:
        for (let y = 0; y < this.grid.length; y++) {
            const row = this.grid[y];

            loopCols:
            for (let x = 0; x < row.length; x++) {
                const letter = row[x];

                if ( letter !== 'X' ) continue;

                loopDirections:
                for (let d = 0; d < Object.keys(this.directions).length; d++) {
                    const direction = this.directions[ Object.keys(this.directions)[d] ];

                    let isXMAS = this.findWord( x, y, direction, 'MAS'.split('') );

                    if ( isXMAS ) total++;
                    
                }
                
            }
            
        }
    
        console.info(`Part 1: ${total}`); // 2493
    
        // PART 2

        total = 0; // reset

        loopRows:
        for (let y = 0; y < this.grid.length; y++) {
            const row = this.grid[y];

            loopCols:
            for (let x = 0; x < row.length; x++) {
                const letter = row[x];

                if ( letter !== 'A' ) continue;

                let corners = {
                    'nw': this.getNextLetter( x, y, this.directions['nw'] ),
                    'ne': this.getNextLetter( x, y, this.directions['ne'] ),
                    'se': this.getNextLetter( x, y, this.directions['se'] ),
                    'sw': this.getNextLetter( x, y, this.directions['sw'] ),
                }

                let match = Boolean(
                    (
                        corners['nw'] === 'M' && corners['se'] === 'S'
                        ||
                        corners['nw'] === 'S' && corners['se'] === 'M'
                    ) && (
                        corners['ne'] === 'M' && corners['sw'] === 'S'
                        ||
                        corners['ne'] === 'S' && corners['sw'] === 'M'
                    )
                );

                if ( match ) total++;

            }
            
        }
    
        console.info(`Part 2: ${total}`); // 1890
    
    }

    findWord( x, y, direction, target ) {

        let letter = this.getNextLetter( x, y, direction );

        // If the next letter is not what we’re looking for (either a different letter or off the edge of the grid), there can’t be a match.
        if ( letter !== target[0] ) return false;

        // If this is the last letter in the target word, we have a match.
        if ( target.length === 1 ) return true;

        // Otherwise, keep looking for the next letter in the same direction.
        y += direction.dy;
        x += direction.dx;
        target = target.slice(1);

        return this.findWord( x, y, direction, target );

    }

    getNextLetter( x, y, direction ) {

        y += direction.dy;
        x += direction.dx;

        if ( !this.grid[y] || !this.grid[y][x] ) return false;

        let letter = this.grid[y][x];

        return letter;
        
    }
    
}
