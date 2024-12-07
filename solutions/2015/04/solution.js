const SolutionBase = require('../../../classes/solution-base');
const crypto       = require('crypto');

class Solution extends SolutionBase {

    init() {

        // PART 1
        let value = this.findHash('00000');

        console.info(`Part 1: ${value}`); // 346386
    
        // PART 2

        value = this.findHash('000000');
    
        console.info(`Part 2: ${value}`); // 9958218
    
    }

    findHash( search ) {

        let value  = 0;
        let hash   = '';

        while ( hash.substring( 0, search.length ) !== search ) {
            value++;
            hash = crypto.createHash('md5').update(`${this.input}${value}`).digest('hex')
        }

        return value;

    }
    
}

module.exports = Solution;
