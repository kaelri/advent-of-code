const fs = require('fs');

class SolutionBase {

	path    = '';
	inputID = '';
	input   = null;

    progress         = 0;
    progressInterval = null;

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

				if ( valueFilter ) value = valueFilter( value, id, x, y );

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

	getPerformance() {
		return String( '• ' + Math.floor(performance.now() / 1000) + 's • ' + Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 ) + ' MB' );
	}

    progressStart() {

        this.progress = 0;

        this.progressInterval = setInterval(() => {
            console.info(`${( Math.round(this.progress * 100 ) / 100 )}%`, this.getPerformance() );
        }, 5000);

    }

    progressStop() {

        clearInterval(this.progressInterval);
        
    }

}

module.exports = SolutionBase;
