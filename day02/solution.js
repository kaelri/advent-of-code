const fs = require('fs')

// Get the raw input from https://adventofcode.com/2022/day/2
const input = fs.readFileSync('./day02/input.txt', { encoding: 'utf8', flag: 'r' } )

// Define vocabulary terms as arbitrary constants. Basically just makes the code more readable.
const rock     = 'rock',
      paper    = 'paper',
      scissors = 'scissors',
	  draw     = 'draw',
	  win      = 'win',
	  lose     = 'lose'

// Use an ordered array to figure out which play beats which based on the array index.
const playOrder = [ rock, paper, scissors ]

function getMatchResult( myPlay, theirPlay ) {

	let matchResult,
		theirPlayOrder,
		myPlayOrder

	if ( myPlay === theirPlay ) {

		matchResult = draw

	} else {

		theirPlayOrder = playOrder.indexOf( theirPlay ),
		myPlayOrder    = playOrder.indexOf( myPlay )

		matchResult = ( ( theirPlayOrder + 1 ) % 3 === myPlayOrder ) ? win : lose

	}

	return matchResult

}

function getMyPlayFromMatchResult( matchResult, theirPlay ) {

	let myPlay,
	    theirPlayOrder,
	    myPlayOrder

	switch ( matchResult ) {
		case 'draw':
			myPlay = theirPlay
			break;
		case 'win':
			theirPlayOrder = playOrder.indexOf( theirPlay )
			myPlayOrder    = ( theirPlayOrder + 1 ) % 3
			myPlay         = playOrder[ myPlayOrder ]
			break;
		case 'lose':
			theirPlayOrder = playOrder.indexOf( theirPlay )
			myPlayOrder    = ( theirPlayOrder + 2 ) % 3
			myPlay         = playOrder[ myPlayOrder ]
			break;
	}

	return myPlay

}

const scores = new Map([
	[ rock,     1 ],
	[ paper,    2 ],
	[ scissors, 3 ],
	[ win,      6 ],
	[ draw,     3 ],
	[ lose,     0 ],
])

const playCode = new Map([
	[ 'A', rock     ],
	[ 'B', paper    ],
	[ 'C', scissors ],
	[ 'X', rock     ],
	[ 'Y', paper    ],
	[ 'Z', scissors ],
])

const resultCode = new Map([
	[ 'X', lose ],
	[ 'Y', draw ],
	[ 'Z', win  ],
])

const forwardScore = input
	.split("\n").map( line => {

		if ( !line.length ) return 0

		const plays       = line.split(" "),
		      theirPlay   = playCode.get( plays[0] ),
		      myPlay      = playCode.get( plays[1] )

		const matchResult = getMatchResult( myPlay, theirPlay )
		const roundScore  = scores.get( myPlay ) + scores.get( matchResult )

		return roundScore

	})
	.reduce( ( total, roundScore ) => total + roundScore )

console.info( 'Part 1: ' + forwardScore ) // 13005

const backwardScore = input
	.split("\n").map( line => {

		if ( !line.length ) return 0

		const plays       = line.split(" "),
		      theirPlay   = playCode.get( plays[0] ),
		      matchResult = resultCode.get( plays[1] )

		const myPlay      = getMyPlayFromMatchResult( matchResult, theirPlay )
		const roundScore  = scores.get( myPlay ) + scores.get( matchResult )

		return roundScore

	})
	.reduce( ( total, roundScore ) => total + roundScore )

console.info( 'Part 2: ' + backwardScore ) // 11373