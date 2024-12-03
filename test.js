const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

if ( argv.day && typeof argv.day === 'string' && argv.day.length === 2 ) {
	const solution = require( process.cwd() + `/day${argv.day}/solution` );
	solution.init();
}
