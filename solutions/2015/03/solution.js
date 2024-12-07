const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    directions = {
        '^': { dy:  1, dx:  0 },
        'v': { dy: -1, dx:  0 },
        '>': { dy:  0, dx:  1 },
        '<': { dy:  0, dx: -1 },
    };

    init() {

        // Get the raw input from https://adventofcode.com/2015/day/3
        let input = this.getInput().split('');

        // PART 1
    
        let numHouses = this.countHouses( input, 1 );
        console.info(`Part 1: ${numHouses}`); // 2592
    
        // PART 2
    
        numHouses = this.countHouses( input, 2 );
        console.info(`Part 2: ${numHouses}`); // 2360
    
    }

    countHouses( steps, numSantas ) {

        const houses = {
            '0,0': 0
        };

        const santas = [];

        for (let s = 0; s < numSantas; s++) {
            santas.push({ x: 0, y: 0 });
            houses['0,0']++;
        }

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];

            let santa = santas[ i % santas.length ];

            let direction = this.directions[step];
            santa.x += direction.dx;
            santa.y += direction.dy;

            let id = String(`${santa.x},${santa.y}`);
            houses[id] = houses[id] ?? 0;
            houses[id]++;
            
        }

        return Object.keys(houses).length;
        
    }
    
}

module.exports = Solution;
