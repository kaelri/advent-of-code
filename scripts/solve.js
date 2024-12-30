(async function() {

	let args        = process.argv.splice(2);
	let argSolution = args[0] ?? null;
	let argInput    = args[1] ?? null;
	
	let yearID;
	let dayID;
	
	if ( typeof argSolution === 'string' && argSolution.match(/^\d+$/g ) ) {
		yearID = '2024'; // default to most recent year
		dayID  = argSolution.padStart(2, '0');
	} else if ( typeof argSolution === 'string' && argSolution.match(/^\d+-\d+$/g ) ) {
		let parts = argSolution.split('-');
		yearID = parts[0];
		dayID  = parts[1].padStart(2, '0');
	} else {
		console.error('Please provide a day number using the --day flag, e.g. `npm run solve 1` or `npm run solve 2022-1`.');
		return;
	}
	
	const path    = process.cwd() + `/solutions/${yearID}/${dayID}`;
	const inputID = argInput ?? 'input';
	
	const { Solution } = await import(`${path}/solution.js`);
	const instance = new Solution( path, inputID );
	
	console.info( `${yearID} DAY ${dayID}` );
	console.info( `-----------` );
	
	instance.init();
	
})();
