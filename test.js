let dayNumber = process.argv.find( arg => arg.match(/^--day=\d+$/g ) );

if ( !dayNumber ) {
	console.error('Please provide a day number using the --day flag, e.g. `npm run test -- --day=1`.');
	return;
}

const id  = 'day' + dayNumber.replace('--day=', '').trim().padStart(2, '0');
const day = require( process.cwd() + `/days/${id}/${id}` );
( new day ).init();
