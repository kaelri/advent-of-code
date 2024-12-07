const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    badStrings = [ 'ab', 'cd', 'pq', 'xy' ];

    init() {

        let strings = this.getLines( this.input );

        // PART 1

        let niceStrings = strings.filter( string => this.isNice( string ) );
    
        console.info(`Part 1: ${niceStrings.length}`); // 236
    
        // PART 2
    
        console.info(`Part 2: ${null}`); // 
    
    }

    isNice( string ) {

        let numVowels = [ ...string.matchAll( /[aeiou]/g ) ].length;
        if ( numVowels < 3 ) return false;

        let hasBadStrings = this.badStrings.some( bs => string.includes( bs ) )
        if ( hasBadStrings ) return false;

        let doubles = string.split('').filter( ( c, i ) => c === string[ i - 1 ] ).length;
        if ( doubles < 1 ) return false;

        return true;

    }
    
}

module.exports = Solution;
