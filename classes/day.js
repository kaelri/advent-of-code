const fs = require('fs');

class Day {

	path = __dirname;

	getInput() {
		return fs.readFileSync( this.path + `/input.txt`, { encoding: 'utf8', flag: 'r' } );
	}

}

module.exports = Day;
