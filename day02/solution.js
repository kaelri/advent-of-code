const fs = require('fs');

function init() {

    // Get the raw input from https://adventofcode.com/2024/day/2
    const input = fs.readFileSync('./day02/input.txt', { encoding: 'utf8', flag: 'r' } )
    .split("\n")
    .filter( line => line.length > 0 );

    // PART 1

    // Convert lines into reports. Parse the string into numbers and check whether the report is safe.
    let reports = input.map( ( line, l ) => {

        let report = {
            values: [],
            safe:   null,
        }

        report.values = line.split(/\s+/).map( value => parseInt(value) );
        report.safe = isSafe(report);

        return report;

    });

    // Count up the number of safe reports.
    let numSafe = reports.filter( report => report.safe ).length;
    console.info( 'Part 1: ' + numSafe ); // 598

    // PART 2

    for (let r = 0; r < reports.length; r++) {
        const report = reports[r];

        // If the report is unsafe, try removing each value in turn and see if the removal of that value renders the report safe. This is a brute-force solution and I am ashamed.
        if ( !report.safe ) {

            for (let v = 0; v < report.values.length; v++) {

                let newReport = structuredClone(report);
    
                newReport.values.splice(v, 1);
                newReport.safe = isSafe(newReport);
    
                if ( newReport.safe ) {
                    reports[r] = newReport;
                    break;
                }
                
            }

        }
        
    }

    numSafe = reports.filter( report => report.safe ).length;
    console.info( 'Part 2: ' + numSafe ); // 634

}

function getDirection(number) {
    if ( number > 0 ) return 1;
    if ( number < 0 ) return -1;
    return 0;
}

function isSafe(report) {

    // Get the difference between each value and the next.
    let diffs = [];
    for (let v = 1; v < report.values.length; v++) {
        diffs.push( report.values[v] - report.values[v - 1] );
    }

    // Check whether the prevailing direction of change is positive or negative. We don’t care about the magnitude of change, just how often it moves in one direction or the other. To do this, we use `getDirection` to collapse each difference down to 1, 0 or -1. Then we just add them up. If the sum is positive, that means most of the values are increasing, and likewise for a negative sum.
    let expectedDirection = getDirection( diffs.map( diff => getDirection(diff) ).reduce( (total, direction) => total + direction, 0 ) );

    for (let d = 0; d < diffs.length; d++) {
        const diff = diffs[d];

        // If any single difference is less than 1 or greater than 3, this report automatically fails the safety requirements.
        let magnitude = Math.abs( diff );
        if ( magnitude < 1 || magnitude > 3 ) {
            return false
        }

        // If any single difference is moving against the prevailing direction (e.g. increasing when all others are decreasing), then this also fails.
        let direction = getDirection(diff);
        if ( direction !== expectedDirection ) {
            return false
        }

    }

    return true;

}

module.exports = {
	init: init
}
