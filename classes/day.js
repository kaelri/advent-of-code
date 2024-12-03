const fs = require('fs');

class Day {

	path = __dirname;

	getInput() {
		return fs.readFileSync( this.path + `/input.txt`, { encoding: 'utf8', flag: 'r' } );
	}

	getLines( string ) {
		return string.split("\n").filter( line => line.length > 0 );
	}

}

module.exports = Day;
