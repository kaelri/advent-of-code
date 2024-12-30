import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    init() {

        let lines = this.getLines(this.input);

        let solution1 = lines
        .map( line => {
            line = line.replaceAll( /[^\d]/g, '' );
            let firstDigit = line.charAt(0);
            let lastDigit  = line.charAt( line.length - 1 );
            return Number( firstDigit + lastDigit );
        })
        .reduce( ( total, line ) => total + line, 0 );

        console.info( 'Part 1: ' + solution1 ); // 54159

        const digitMap = new Map([
            [ '1',     '1' ],
            [ '2',     '2' ],
            [ '3',     '3' ],
            [ '4',     '4' ],
            [ '5',     '5' ],
            [ '6',     '6' ],
            [ '7',     '7' ],
            [ '8',     '8' ],
            [ '9',     '9' ],
            [ 'one',   '1' ],
            [ 'two',   '2' ],
            [ 'three', '3' ],
            [ 'four',  '4' ],
            [ 'five',  '5' ],
            [ 'six',   '6' ],
            [ 'seven', '7' ],
            [ 'eight', '8' ],
            [ 'nine',  '9' ]
        ]);

        let solution2 = lines
        .map( line => {

            let firstDigit, lastDigit;
            
            for (let i = 0; i < line.length; i++) {

                if ( !firstDigit ) {

                    let lineFromStart = line.substring(0, i + 1);
                    
                    for (const [ string, digit ] of digitMap) {
                        if ( lineFromStart.match(string) ) {
                            firstDigit = digit;
                            break;
                        }
                    }

                }

                if ( !lastDigit ) {

                    let lineFromEnd = line.substring( line.length - 1 - i );
                
                    for (const [ string, digit ] of digitMap) {
                        if ( lineFromEnd.match(string) ) {
                            lastDigit = digit;
                            break;
                        }
                    }

                }

                if ( firstDigit && lastDigit ) break;

            }

            line = Number( firstDigit + lastDigit );

            return line;

        })
        .reduce( ( total, line ) => total + line, 0 );

        console.info( 'Part 2: ' + solution2 ); // 53866

    }

}
