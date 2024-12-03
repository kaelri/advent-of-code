const Day = require('../../classes/day');

class Day03 extends Day {

    path = __dirname;

    init() {

        // Get the raw input from https://adventofcode.com/2024/day/3
        let input = this.getInput();
    
        // PART 1
    
        let sum = this.findMultipliers(input);
    
        console.info(`Part 1: ${sum}`); // 155955228
    
        // PART 2
    
        // Add an explicit "do()" statement at the start of the input to make parsing easier.
        input = 'do()' + input;
    
        // Break the input into chunks that start with the "do()" or "don't()" statements, ending before the next instance of same (or the end of the input, `$`).
        let groups = input.match(/((do|don't)\(\).*?)(?=((do|don't)\(\)|$))/gs); // Good gracious.
    
        let inputEnabled = groups.filter( group => group.startsWith('do()') ).join('');
    
        sum = this.findMultipliers(inputEnabled);
    
        console.info(`Part 2: ${sum}`); // 100189366
    
    }
    
    findMultipliers( string ) {
    
        let matches = string.match(/mul\((\d+),(\d+)\)/g);
    
        let sum = matches.reduce( (total, line) => {
    
            let factors = line.match(/(\d+)/g);
    
            let product = factors.reduce( (product, factor) => {
                return product * parseInt(factor);
            }, 1 );
    
            return total + product;
    
        }, 0 );
    
        return sum;
    
    }
    
}

module.exports = Day03;
