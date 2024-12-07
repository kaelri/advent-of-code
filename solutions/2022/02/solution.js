const SolutionBase = require('../../../classes/solution-base');

class Solution extends SolutionBase {

    // Define vocabulary terms as arbitrary constants. Basically just makes the code more readable.
    rock     = 'rock';
    paper    = 'paper';
    scissors = 'scissors';
    draw     = 'draw';
    win      = 'win';
    lose     = 'lose';

    // Use an ordered array to figure out which play beats which based on the array index.
    playOrder = [ this.rock, this.paper, this.scissors ]

    scores = new Map([
        [ this.rock,     1 ],
        [ this.paper,    2 ],
        [ this.scissors, 3 ],
        [ this.win,      6 ],
        [ this.draw,     3 ],
        [ this.lose,     0 ],
    ])
    
    playCode = new Map([
        [ 'A', this.rock     ],
        [ 'B', this.paper    ],
        [ 'C', this.scissors ],
        [ 'X', this.rock     ],
        [ 'Y', this.paper    ],
        [ 'Z', this.scissors ],
    ])
    
    resultCode = new Map([
        [ 'X', this.lose ],
        [ 'Y', this.draw ],
        [ 'Z', this.win  ],
    ])
    
    init() {

        const forwardScore = this.input
            .split("\n").map( line => {
        
                if ( !line.length ) return 0
        
                const plays       = line.split(" "),
                      theirPlay   = this.playCode.get( plays[0] ),
                      myPlay      = this.playCode.get( plays[1] )
        
                const matchResult = this.getMatchResult( myPlay, theirPlay )
                const roundScore  = this.scores.get( myPlay ) + this.scores.get( matchResult )
        
                return roundScore
        
            })
            .reduce( ( total, roundScore ) => total + roundScore )
        
        console.info( 'Part 1: ' + forwardScore ) // 13005
        
        const backwardScore = this.input
            .split("\n").map( line => {
        
                if ( !line.length ) return 0
        
                const plays       = line.split(" "),
                      theirPlay   = this.playCode.get( plays[0] ),
                      matchResult = this.resultCode.get( plays[1] )
        
                const myPlay      = this.getMyPlayFromMatchResult( matchResult, theirPlay )
                const roundScore  = this.scores.get( myPlay ) + this.scores.get( matchResult )
        
                return roundScore
        
            })
            .reduce( ( total, roundScore ) => total + roundScore )
        
        console.info( 'Part 2: ' + backwardScore ) // 11373
    }

    getMatchResult( myPlay, theirPlay ) {

        let matchResult,
            theirPlayOrder,
            myPlayOrder

        if ( myPlay === theirPlay ) {

            matchResult = this.draw

        } else {

            theirPlayOrder = this.playOrder.indexOf( theirPlay ),
            myPlayOrder    = this.playOrder.indexOf( myPlay )

            matchResult = ( ( theirPlayOrder + 1 ) % 3 === myPlayOrder ) ? this.win : this.lose

        }

        return matchResult

    }

    getMyPlayFromMatchResult( matchResult, theirPlay ) {

        let myPlay,
            theirPlayOrder,
            myPlayOrder

        switch ( matchResult ) {
            case 'draw':
                myPlay = theirPlay
                break;
            case 'win':
                theirPlayOrder = this.playOrder.indexOf( theirPlay )
                myPlayOrder    = ( theirPlayOrder + 1 ) % 3
                myPlay         = this.playOrder[ myPlayOrder ]
                break;
            case 'lose':
                theirPlayOrder = this.playOrder.indexOf( theirPlay )
                myPlayOrder    = ( theirPlayOrder + 2 ) % 3
                myPlay         = this.playOrder[ myPlayOrder ]
                break;
        }

        return myPlay

    }

}

module.exports = Solution;
