const fs = require('fs')

// Get the raw input from https://adventofcode.com/2022/day/3
const input = fs.readFileSync('./day03/input.txt', { encoding: 'utf8', flag: 'r' } )

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const rucksacks = input
.split("\n")

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

console.log( 'Part 1: ' + totalPriorities )

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

console.log( 'Part 2: ' + badgePriorities )