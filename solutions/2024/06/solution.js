const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    grid  = new Map();
    start = { x: 0, y: 0, d: 0 };

    directions = [
        { id: 'n', dy: -1, dx:  0 },
        { id: 'e', dy:  0, dx:  1 },
        { id: 's', dy:  1, dx:  0 },
        { id: 'w', dy:  0, dx: -1 },
    ];

    init() {

        // Get the raw input from https://adventofcode.com/2024/day/6
        let input = this.getInput();
        input = this.getLines(input);
        
        // PART 1
    
        // Further split each row into an array of individual characters.
        let rows = input.map(row => row.split(''));

        for (let y = 0; y < rows.length; y++) {
            const row = rows[y];

            for (let x = 0; x < row.length; x++) {
                const value = row[x];

                let position = {
                    x:       x,
                    y:       y,
                    value:   value,
                    initial: value,
                }

                this.grid.set( `${x},${y}`, position );

                if ( value === '^' ) this.start = { x: x, y: y, d: 0 };

            }

        }

        let result = this.moveGuard();

        console.info(`Part 1: ${result.positions.length}`); // 5177
    
        // PART 2
        let numNewObstacles = 0;

        let emptyPositions = result.positions.map( positionID => this.grid.get(positionID) ).filter( position => position.value === '.' );

        for (let i = 0; i < emptyPositions.length; i++) {
            const emptyPosition = emptyPositions[i];

            if ( (i+1) % 100 === 0 ) console.info(`    ${i+1} / ${emptyPositions.length}…`);

            emptyPosition.value = '#';

            let result = this.moveGuard();

            if ( result.isLoop ) {
                numNewObstacles++;
            }

            emptyPosition.value = emptyPosition.initial;
            
        }
    
        console.info(`Part 2: ${numNewObstacles}`); // 1686
    
    }

    moveGuard() {

        let result = {
            history:   [],
            positions: [],
            isLoop:    false,
        };

        let guard = {
            x: this.start.x,
            y: this.start.y,
            d: this.start.d,
        }

        loopGuardMovement:
        while ( true ) {

            // If the guard has been in the same position and direction before, we’re in a loop.
            let historyID = `${guard.x},${guard.y},${guard.d}`;

            if ( result.history.includes(historyID) ) {
                result.isLoop = true;
                return result;
            }

            result.history.push( historyID );

            // Mark the current position as visited.
            let positionID = `${guard.x},${guard.y}`;
            if ( !result.positions.includes(positionID) ) {
                result.positions.push(positionID);
            }

            // Check the next position in the guard’s current direction.
            loopGuardDirections:
            while ( true ) {

                let direction = this.directions[ guard.d ];

                let nextX = guard.x + direction.dx;
                let nextY = guard.y + direction.dy;
    
                let nextPosition = this.grid.get(`${nextX},${nextY}`);

                // If the next position would move the guard off the grid, then this was the last position to check, and the path is complete.
                if ( !nextPosition ) {
                    break loopGuardMovement;
                }
    
                // If the next position is an obstacle, rotate to the next direction and try again. (This could hypothetically create an infinite loop if the guard is boxed in.)
                if ( nextPosition.value === '#' ) {
                    guard.d = ( guard.d + 1 ) % this.directions.length;
                    continue loopGuardDirections;
                }
                
                // If the next position is both on the grid and not obstructed, advance the guard to the new position and restart the movement loop.
                guard.x = nextX;
                guard.y = nextY;

                continue loopGuardMovement;
    
            }

        }

        return result;

    }

}

module.exports = Solution;
