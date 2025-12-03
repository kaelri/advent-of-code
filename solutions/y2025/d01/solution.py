import os
import re

def init( module_path ):

	dialPosition     = 50
	totalZeroesEnd   = 0
	totalZeroesClick = 0

	with open( os.path.join(module_path, 'input.txt'), 'r') as f:
		input = f.read().strip().split('\n')

	for line in input:

		match = re.match( r'(R|L)(\d+)', line )
		if not match: continue

		direction = match.group(1)
		steps     = int( match.group(2) )

		rotations    = steps // 100
		steps        = steps % 100
		stepsMinimum = 100 - ( dialPosition if direction == 'R' else ( 100 - dialPosition ) % 100 )
		stepsAtZero  = rotations + ( 1 if steps >= stepsMinimum else 0 )

		dialPosition = ( dialPosition + ( steps if direction == 'R' else steps * -1 ) ) % 100

		if dialPosition == 0:
			totalZeroesEnd += 1
		totalZeroesClick += stepsAtZero
	
	print( f'Part 1: {totalZeroesEnd}' ) # 1040
	print( f'Part 2: {totalZeroesClick}' ) # 6027

	return
