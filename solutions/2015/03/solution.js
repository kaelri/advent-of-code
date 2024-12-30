import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    directions = {
        '^': { dy:  1, dx:  0 },
        'v': { dy: -1, dx:  0 },
        '>': { dy:  0, dx:  1 },
        '<': { dy:  0, dx: -1 },
    };

    init() {

        // PART 1
        let steps = this.input.split('');
    
        let numHouses = this.countHouses( steps, 1 );
        console.info(`Part 1: ${numHouses}`); // 2592
    
        // PART 2
    
        numHouses = this.countHouses( steps, 2 );
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
