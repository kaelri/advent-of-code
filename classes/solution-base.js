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

	getGrid( string, valueFilter ) {

		let grid = new Map();

		let lines = this.getLines( string );

		let rows = lines.map(row => row.split(''));

        for (let y = 0; y < rows.length; y++) {
            const row = rows[y];

            for (let x = 0; x < row.length; x++) {
                let value = row[x];
                let id = this.getGridID(x,y);

				if ( valueFilter ) value = valueFilter( value );

                grid.set( id, value );

            }

        }

		return grid;

	}

    getGridID( x, y ) {
        return `${x},${y}`;
    }

    getGridCoords( id ) {
        return id.split(',').map(Number);
    }

}

module.exports = SolutionBase;
