import SolutionBase from '../../../classes/solution-base.js';

export class Solution extends SolutionBase {

    init() {

        const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

        const rucksacks = this.input.split("\n")

        const totalPriorities = rucksacks.map( rucksack => {

            if ( !rucksack.length ) return 0

            const compartmentSize = rucksack.length / 2,
                compartment1    = rucksack.slice( 0, compartmentSize ).split(''),
                compartment2    = rucksack.slice( compartmentSize ).split(''),
                overlap         = compartment1.filter( item => compartment2.indexOf(item) !== -1 )[0],
                priority        = alphabet.indexOf(overlap) + 1

            return priority

        })
        .reduce ( ( total, priority ) => total + priority, 0 )

        console.info( 'Part 1: ' + totalPriorities ) // 7824

        const elfGroups = []

        while ( rucksacks.length ) {
            elfGroups.push( rucksacks.splice(0,3) )
        }

        const badgePriorities = elfGroups.map( elfGroup => {

            if ( !elfGroup.length ) return 0

            const rucksacks = elfGroup.map( elf => elf.split('') )
            
            let overlap   = structuredClone( alphabet )

            rucksacks.forEach( rucksack => {
                overlap = overlap.filter( item => rucksack.indexOf(item) !== -1 )
            })

            const priority = alphabet.indexOf(overlap[0]) + 1

            return priority

        })
        .reduce ( ( total, priority ) => total + priority, 0 )

        console.info( 'Part 2: ' + badgePriorities ) // 2798

    }

}
