const input = process.argv[2] ?? '';

let yearID;
let dayID;

if ( input.match(/^\d+$/g ) ) {
	yearID = '2024'; // default to most recent year
	dayID  = input.padStart(2, '0');
} else if ( input.match(/^\d+-\d+$/g ) ) {
	let parts = input.split('-');
	yearID = parts[0];
	dayID  = parts[1].padStart(2, '0');
} else {
	console.error('Please provide a day number using the --day flag, e.g. `npm run solve 1`.');
	return;
}

console.info( `${yearID} DAY ${dayID}` );
console.info( `-----------` );

const day = require( process.cwd() + `/solutions/${yearID}/day${dayID}/day${dayID}` );
( new day ).init();
