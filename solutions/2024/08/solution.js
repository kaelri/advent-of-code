const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    grid = null;

    init() {

        this.grid = this.getGrid( this.input );

        // Identify unique frequencies & their antenna positions.
        let frequencies = {};

        this.grid.forEach((value, id) => {
            if ( value === '.' ) return;
            frequencies[value] = frequencies[value] || [];
            frequencies[value].push( id );
        });
    
        // Find antinodes.
        let firstAntinodes = [];
        let allAntinodes   = [];

        for (let f = 0; f < Object.keys(frequencies).length; f++) {
            const frequencyID    = Object.keys(frequencies)[f];
            const frequencyNodes = frequencies[frequencyID];

            let pairs = this.getUniquePairs(frequencyNodes);

            for (let p = 0; p < pairs.length; p++) {
                const pair = pairs[p];

                let [ xA, yA ] = this.getGridCoords(pair[0]);
                let [ xB, yB ] = this.getGridCoords(pair[1]);

                let dX = xB - xA;
                let dY = yB - yA;

                let pairAntinodesDesc   = this.findAntinodes( xA, yA, -dX, -dY );
                let pairAntinodesAsc    = this.findAntinodes( xB, yB,  dX,  dY );

                // The first antinodes found in each direction are the ones that meet the conditions for Part 1.
                if ( pairAntinodesAsc.length  ) firstAntinodes.push( pairAntinodesAsc[0]  );
                if ( pairAntinodesDesc.length ) firstAntinodes.push( pairAntinodesDesc[0] );

                allAntinodes = allAntinodes.concat( pair, pairAntinodesAsc, pairAntinodesDesc );

            }
            
        }

        // Filter antinode lists for unique values.
        firstAntinodes = firstAntinodes.filter((v, i, a) => a.indexOf(v) === i);
        allAntinodes   = allAntinodes.filter((v, i, a) => a.indexOf(v) === i);

        // PART 1

        console.info(`Part 1: ${firstAntinodes.length}`); // 409
    
        // PART 2
    
        console.info(`Part 2: ${allAntinodes.length}`); // 1308
    
    }

    findAntinodes( x, y, dX, dY ) {

        let antinodes = [];

        while ( true ) {

            x += dX;
            y += dY;

            let antinodeID = this.getGridID(x, y);
            let antinode   = this.grid.get( antinodeID );

            if ( !antinode ) break; // If the grid doesn’t include this coordinate, we’ve gone off-grid.
            
            antinodes.push( antinodeID );

        }

        return antinodes;

    }

    getUniquePairs( nodes ) {
        
        let pairs = [];

        for (let i = 0; i < nodes.length; i++) {
            const nodeA = nodes[i];
            for (let j = i+1; j < nodes.length; j++) {
                const nodeB = nodes[j];
                pairs.push([nodeA, nodeB]);
            }
        }

        return pairs;

    }
    
}

module.exports = Solution;
