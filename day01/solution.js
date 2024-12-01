const fs = require('fs');

// Get the raw input from https://adventofcode.com/2024/day/1
const input = fs.readFileSync('./day01/input.txt', { encoding: 'utf8', flag: 'r' } )
.split("\n")
.filter( line => line.length > 0 );

// PART 1

// Create column containers to store the two lists.
let columns = [ [], [] ];

// Parse each line into two numbers and add them to their respective lists.
for (let i = 0; i < input.length; i++) {
    const line = input[i];

    let values = line.split(/\s+/);
    for (let v = 0; v < values.length; v++) {
        columns[v].push( parseInt(values[v]) );
    }

}

// Sort each list.
for (let c = 0; c < columns.length; c++) {
    columns[c].sort((a, b) => a - b);
}

// Calculate the difference between each row and add them all up.
let diffs = input.map( ( line, l ) => {
    return Math.abs( columns[0][l] - columns[1][l] );
}).reduce( (total, value) => total + value, 0);

console.info( 'Part 1: ' + diffs ); // 1666427

// PART 2

// Get the frequency of each number in the second column.
let frequencies = columns[1].reduce( (freqs, value) => {

    let id = String(value);

    freqs[id] = freqs[id] ?? 0;
    freqs[id]++;

    return freqs;

}, {});

let similarityScore = columns[0].map( value => {
    let id = String(value);
    let frequency = frequencies[id] ?? 0;
    return ( value * frequency );
}).reduce( (total, value) => total + value, 0);

console.info( 'Part 2: ' + similarityScore ); // 24316233
