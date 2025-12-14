import os
from functools import reduce

def init( module_path, inputID ):

	input          = get_input( module_path, inputID )
	grid           = get_grid( input, None )
	num_forkable   = 0
	num_iterations = 0

	while True:

		forkable_items = get_forkable_items( grid )

		if len(forkable_items) == 0:
			print( f'Part 2: {num_forkable}' ) # 10132
			break

		num_forkable   += len(forkable_items)
		num_iterations += 1
		
		if num_iterations == 1:
			print( f'Part 1: {len(forkable_items)}' ) # 1578

		grid = remove_items( grid, forkable_items )

def get_input( module_path, inputID ):

	with open( os.path.join(module_path, f'{inputID}.txt'), 'r') as f:
		input = f.read().strip()

	return input

def get_lines( string ):

	lines = string.split('\n')
	lines = list(filter( lambda line: len(line) > 0, lines ))

	return lines

def get_grid( string, value_filter ):

	grid = {}

	lines = get_lines( string )

	rows = list(map(list, lines ))

	for y, row in enumerate(rows):
		for x, value in enumerate(row):

			id = get_grid_id(x, y)

			if value_filter:
				value = value_filter( value, id, x, y )

			grid[ id ] = value
	
	return grid

def get_grid_id( x, y ):
	return f'{x},{y}'

def get_grid_coords( id ):
	return map( int, id.split(',') )

def get_grid_neighbors( grid, id ):

	x, y = get_grid_coords( id )

	neighbors = []

	candidates = [
		[ x-1, y-1 ],
		[ x,   y-1 ],
		[ x+1, y-1 ],
		[ x-1, y   ],
		[ x+1, y   ],
		[ x-1, y+1 ],
		[ x,   y+1 ],
		[ x+1, y+1 ],
	]

	for candidate in candidates:

		neighbor_id = get_grid_id( candidate[0], candidate[1] )

		if neighbor_id in grid:
			neighbors.append( neighbor_id )

	return neighbors

def get_forkable_items( grid ):

	forkable = []

	for id, value in grid.items():

		if ( value != '@' ): continue

		neighbors = get_grid_neighbors( grid, id )
		neighbor_rolls = []

		for neighbor_id in neighbors:

			if grid[ neighbor_id ] == '@':
				neighbor_rolls.append( neighbor_id )

		if len( neighbor_rolls ) < 4:
			forkable.append( id )

	return forkable

def remove_items( grid, forkable ):

	for id in forkable:
		grid[ id ] = '.'

	return grid