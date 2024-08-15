const fs = require('fs');

const input = fs.readFileSync('./day02/input.txt', { encoding: 'utf8', flag: 'r' } )
.split("\n")
.filter( line => line.length > 0 );

let solution1 = input.map( game => {
	let gameParts    = game.match( /Game (\d+): (.*)/ );
	let gameID       = Number( gameParts[1] );
	let gameMaximums = gameParts[2].split(';').map( draw => {
		let drawColors = draw.split(',').map( color => {
			let colorParts  = color.match( /(\d+) (green|red|blue)/ );
			let colorAmount = Number( colorParts[1] );
			let colorID     = colorParts[2];
			return {
				id:     colorID,
				amount: colorAmount
			};
		});
		return {
			red:   drawColors.find( color => color.id === 'red'   )?.amount ?? 0,
			blue:  drawColors.find( color => color.id === 'blue'  )?.amount ?? 0,
			green: drawColors.find( color => color.id === 'green' )?.amount ?? 0,
		};
	}).reduce( ( maximums, draw ) => {
		maximums.red   = Math.max( maximums.red,   draw.red   );
		maximums.blue  = Math.max( maximums.blue,  draw.blue  );
		maximums.green = Math.max( maximums.green, draw.green );
		return maximums;
	}, {
		red:   0,
		blue:  0,
		green: 0
	});

	return {
		id:       gameID,
		maxRed:   gameMaximums.red,
		maxGreen: gameMaximums.green,
		maxBlue:  gameMaximums.blue,
	};

})
.filter( game => game.maxRed <= 12 && game.maxGreen <= 13 && game.maxBlue <= 14 )
.reduce( ( total, game ) => total + game.id, 0);

console.info( 'Part 1: ' + solution1 ); // 2600
