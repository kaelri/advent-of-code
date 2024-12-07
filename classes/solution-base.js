const fs = require('fs');

class SolutionBase {

	path    = '';
	inputID = '';
	input   = null;

	constructor( path, inputID ) {
		this.path    = path;
		this.inputID = inputID;
		this.input   = this.getInput();
	}

	getInput() {
		// Kind of want to replace this with an async fetch request straight from AoC, but #lazy.
		return fs.readFileSync( this.path + `/${this.inputID}.txt`, { encoding: 'utf8', flag: 'r' } );
	}

	getLines( string ) {
		return string.split("\n").filter( line => line.length > 0 );
	}

}

module.exports = SolutionBase;
