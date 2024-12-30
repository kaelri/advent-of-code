import SolutionBase from '../../../classes/solution-base.js';
const fs = require('fs');

export class Solution extends SolutionBase {

    init() {

        // PART 1
    
        let chars = this.input.split('');

        // Get data from characters.
        let data = chars.map( ( char, c ) => {

            let empty = Boolean( c % 2 !== 0 );
            let id = empty ? null : Math.floor( c / 2 );

            return {
                id:     id,
                empty:  empty,
                length: Number( char ),
                moved:  false,
            }

        });

        let blocks = this.dataToBlocks(data);

        // Defrag by individual block.
        for (let b = 0; b < blocks.length; b++) {
            const block = blocks[b];

            if ( block !== '.' ) continue;

            let lastNonEmptyBlockID = blocks.findLastIndex( block => block !== '.' );

            if ( lastNonEmptyBlockID <= b ) break; // This means all blocks here and afterward are empty, and we’ve finished the sort.

            // Swap the values.
            blocks[b] = blocks[lastNonEmptyBlockID];
            blocks[lastNonEmptyBlockID] = '.';
            
        }

        let checksum = this.getChecksum( blocks );

        console.info(`Part 1: ${checksum}`); // 6262891638328
    
        // PART 2

        // Defrag by file.
        for (let d = data.length - 1; d >= 0; d--) {
            const entry = data[d];

            // Skip entries that are empty or have already been moved.
            if ( entry.empty || entry.moved ) continue;

            let newD = data.findIndex( potentialSpace => potentialSpace.empty && potentialSpace.length >= entry.length );
            if ( newD === -1 || newD >= d ) continue;

            // Remove the file from its original location, replacing it with an empty space of the same length.
            data[d] = {
                id:     null,
                empty:  true,
                length: entry.length
            }

            // Insert the file back into the array at the new location, before the empty space.
            data.splice( newD, 0, entry );
            d++; // Adjust the current position in the loop to account for the newly inserted entry.

            // Mark the file as moved so we don’t touch it again.
            entry.moved = true;
            
            // Shorten the empty space by the length of the file inserted before it. (Ok if it’s zero.)
            data[newD + 1].length -= entry.length;

        }

        blocks   = this.dataToBlocks(data);
        checksum = this.getChecksum( blocks );
    
        console.info(`Part 2: ${checksum}`); // 6287317016845
    
    }

    dataToBlocks(data) {

        let blocks = [];

        for (let d = 0; d < data.length; d++) {
            const entry = data[d];

            for (let i = 0; i < entry.length; i++) {
                blocks.push( entry.empty ? '.' : entry.id );
            }

        }

        return blocks;

    }

    getChecksum( blocks ) {
        return blocks.reduce( (total, block, b) => {
            if ( block === '.' ) return total;
            return total + ( block * b );
        });
    }
    
}
