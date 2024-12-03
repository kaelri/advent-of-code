const fs = require('fs');

function init() {

    // Get the raw input from https://adventofcode.com/2024/day/3
    const input = fs.readFileSync('./day03/input.txt', { encoding: 'utf8', flag: 'r' } );

    // PART 1

    let sum = findMultipliers(input);

    console.log(`Part 1: ${sum}`); // 155955228

    // PART 2

    // Add an explicit "do()" statement at the start of the input to make parsing easier.
    let inputExplicit = 'do()' + input;

    // Break the input into chunks that start with the "do()" or "don't()" statements, ending before the next instance of same (or the end of the input, `$`).
    let groups = inputExplicit.match(/((do|don't)\(\).*?)(?=((do|don't)\(\)|$))/gs); // Good gracious.

    let enabled = groups.filter( group => group.startsWith('do(') ).join('');

    sum = findMultipliers(enabled);

    console.log(`Part 2: ${sum}`); // 100189366

}

function findMultipliers( string ) {

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

module.exports = {
	init: init
}
