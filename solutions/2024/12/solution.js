import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    grid    = null;
    regions = [];

    init() {

        // PART 1

        this.grid = this.getGrid( this.input, (value, id, x, y) => {
            return {
                x:          x,
                y:          y,
                species:    value,
                regionID:   null,
                perimeters: []
            }
        });

        this.grid.forEach( ( node, nodeID ) => {

            if ( node.regionID !== null ) return;

            let regionID = this.addRegion( node.species );

            this.populateRegion( regionID, node );
            
        });

        let price = this.getPrice();
    
        console.info(`Part 1: ${price}`); // 1465968
    
        // PART 2

        price = this.getPrice( 'sides' );
    
        console.info(`Part 2: ${price}`); // 897702
    
    }

    addRegion( species ) {

        this.regions.push({
            species: species,
            nodes:   []
        });

        return this.regions.length - 1;

    }

    populateRegion( regionID, node ) {

        node.regionID = regionID;
        this.regions[regionID].nodes.push( this.getGridID(node.x, node.y) );

        let neighbors = {
            n: [ node.x, node.y - 1 ],
            s: [ node.x, node.y + 1 ],
            w: [ node.x - 1, node.y ],
            e: [ node.x + 1, node.y ],
        }

        for (let n = 0; n < Object.keys(neighbors).length; n++) {
            const neighborDir    = Object.keys(neighbors)[n];
            const neighborCoords = neighbors[neighborDir];
            const neighbor       = this.grid.get( this.getGridID( neighborCoords[0], neighborCoords[1] ) )

            if ( neighbor === undefined || neighbor.species !== node.species ) {
                node.perimeters.push( neighborDir );
                continue;
            }

            if ( neighbor.regionID === null ) {
                this.populateRegion( regionID, neighbor );
            }
            
        }

    }

    getRegionPerimeters( region ) {

        return region.nodes.reduce( ( perimeters, nodeID ) => {

            let node = this.grid.get(nodeID);

            for (let p = 0; p < node.perimeters.length; p++) {
                const dir = node.perimeters[p];
                perimeters.push({ x: node.x, y: node.y, dir: dir });
            }

            return perimeters;
            
        }, []);

    }

    getRegionSides( regionPerimeters ) {

        let history  = [];
        let numSides = 0;

        for (let p = 0; p < regionPerimeters.length; p++) {
            const perimeter = regionPerimeters[p];

            if ( history.includes(p) ) continue;

            history.push(p);

            numSides++;

            let searches = [];

            switch ( perimeter.dir ) {
                case 'n':
                case 's':
                    searches.push({ dx: -1, dy: 0 });
                    searches.push({ dx:  1, dy: 0 });
                    break;
                case 'w':
                case 'e':
                    searches.push({ dx: 0, dy: -1 });
                    searches.push({ dx: 0, dy:  1 });
                    break;
                default: break;
            }

            for (let s = 0; s < searches.length; s++) {
                const search = searches[s];

                let dir = perimeter.dir;
                let x   = perimeter.x;
                let y   = perimeter.y;

                loopSearch:
                while ( true )  {

                    x += search.dx;
                    y += search.dy;

                    let nextP = regionPerimeters.findIndex( nextPerimeter => nextPerimeter.x === x && nextPerimeter.y === y && nextPerimeter.dir === dir );

                    if ( nextP === -1 ) break loopSearch;

                    history.push( nextP );

                }

            }

        }

        return numSides;
        
    }

    getPrice( method ) {

        return this.regions.reduce( ( totalPrice, region ) => {

            let regionArea       = region.nodes.length;
            let regionPerimeters = this.getRegionPerimeters( region );
            let regionSides      = this.getRegionSides( regionPerimeters );

            switch ( method ) {
                case 'sides':
                    return totalPrice + ( regionArea * regionSides );
                default:
                    return totalPrice + ( regionArea * regionPerimeters.length );
            }

        }, 0);

    }
    
}
