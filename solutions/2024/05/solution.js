const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    init() {

        // Get the raw input from https://adventofcode.com/2024/day/5
        let input = this.getInput();
        input = this.getLines(input);

        let rules = input.filter(line => line.match(/\d+\|\d+/) ).map(line => line.split('|'));
        let books = input.filter(line => line.includes(',') ).map(line => line.split(','));

        let totalCorrect   = 0;
        let totalIncorrect = 0;

        for (let b = 0; b < books.length; b++) {
            const book = books[b];

            let bookCorrect = true; // default

            loopRules:
            for (let r = 0; r < rules.length; r++) {
                const rule = rules[r];

                if (
                    book.includes(rule[0])
                    &&
                    book.includes(rule[1])
                    &&
                    book.indexOf(rule[0]) > book.indexOf(rule[1])
                ) {
                    bookCorrect = false;
                    break loopRules;
                }
                
            }

            if ( bookCorrect ) {

                totalCorrect += parseInt( book[ Math.floor(book.length / 2) ] );
    
            } else {

                book.sort((a, b) => {

                    for (let r = 0; r < rules.length; r++) {
                        const rule = rules[r];

                        if ( rule[0] === a && rule[1] === b ) return -1;
                        if ( rule[0] === b && rule[1] === a ) return  1;
                        
                    }

                    return 0; // default

                });

                totalIncorrect += parseInt( book[ Math.floor(book.length / 2) ] );

            }

        }
        
        console.info(`Part 1: ${totalCorrect}`);   // 5248
        console.info(`Part 2: ${totalIncorrect}`); // 4507
    
    }
    
}

module.exports = Solution;
