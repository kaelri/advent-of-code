const fs = require('fs');

class SolutionBase {

	path    = '';
	inputID = '';

	constructor( path, inputID ) {
		this.path    = path;
		this.inputID = inputID;
	}

	getInput() {
		return fs.readFileSync( this.path + `/${this.inputID}.txt`, { encoding: 'utf8', flag: 'r' } );
	}

	getLines( string ) {
		return string.split("\n").filter( line => line.length > 0 );
	}

}

module.exports = SolutionBase;
