const fs = require('fs')

const input = fs.readFileSync('./day1/input.txt', { encoding: 'utf8', flag: 'r' } )

const elves = input.split("\n\n").map( elf => {

	const items    = elf.split("\n").map( item => Number(item) ),
	      calories = items.reduce( ( total, item ) => total + item, 0 )

	return calories

})

elves.sort( (a,b) => b - a )

console.info( 'Part 1: ' + elves[0] )

const topThree = elves.slice(0,3).reduce( ( total, elf ) => total + elf, 0 )

console.info( 'Part 2: ' + topThree )
