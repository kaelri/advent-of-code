import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    criteria = {
        children:    3,
        cats:        7,
        samoyeds:    2,
        pomeranians: 3,
        akitas:      0,
        vizslas:     0,
        goldfish:    5,
        trees:       3,
        cars:        2,
        perfumes:    1
    }

    init() {

        // PART 1

        let aunts = this.getLines(this.input).map(line => {

            let aunt = {};

            let query = [ ...line.matchAll(/^Sue (\d+): (.*)/g) ];

            aunt.id = parseInt(query[0][1]);

            for (let p = 0; p < Object.keys(this.criteria).length; p++) {
                const prop = Object.keys(this.criteria)[p];
                aunt[prop] = null;
            }

            let auntProps = query[0][2].split(',');
            for (let p = 0; p < auntProps.length; p++) {
                const prop = auntProps[p];
                let [key, value] = prop.replace(/\s+/, '').split(':');
                aunt[key] = parseInt(value);
            }

            return aunt;

        });

        let auntMatch = aunts.find(aunt => {

            let isMatch = true;

            for (let p = 0; p < Object.keys(this.criteria).length; p++) {
                const key = Object.keys(this.criteria)[p];

                if ( aunt[key] === null ) continue;

                if ( aunt[key] !== this.criteria[key] ) {
                    isMatch = false;
                    break;
                }
                
            }

            return isMatch;

        });

        console.info(`Part 1: ${auntMatch.id}`); // 40
    
        // PART 2
        auntMatch = aunts.find(aunt => {

            let isMatch = true;

            loopProps:
            for (let p = 0; p < Object.keys(this.criteria).length; p++) {
                const key = Object.keys(this.criteria)[p];

                if ( aunt[key] === null ) continue;

                switch (key) {
                    // “the cats and trees readings indicates that there are greater than that many”
                    case 'cats':
                    case 'trees':
                        if ( aunt[key] <= this.criteria[key] ) {
                            isMatch = false;
                            break loopProps;
                        }
                        break;
                    // “the pomeranians and goldfish readings indicate that there are fewer than that many”
                    case 'pomeranians':
                    case 'goldfish':
                        if ( aunt[key] >= this.criteria[key] ) {
                            isMatch = false;
                            break loopProps;
                        }
                        break;
                    default:
                        if ( aunt[key] !== this.criteria[key] ) {
                            isMatch = false;
                            break loopProps;
                        }
                        break;
                }
                
            }

            return isMatch;

        });

        console.info(`Part 2: ${auntMatch.id}`); // 241
    
    }
    
}
