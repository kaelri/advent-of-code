import os
from functools import reduce

def init( module_path, inputID ):

	invalid_ranges_part_1 = []
	invalid_ranges_part_2 = []

	with open( os.path.join(module_path, f'{inputID}.txt'), 'r') as f:
		input = f.read().strip().split(',')

	for id_range in input:
		
		range_parts = id_range.split('-')
		range_start = int( range_parts[0] )
		range_end   = int( range_parts[1] )

		for id in range( range_start, range_end + 1 ):
			
			id = str(id)

			max_pattern_length = int( len(id) // 2 )

			for pattern_length in range( max_pattern_length, 0, -1 ):

				repetitions = len(id) / pattern_length
				if ( repetitions % 1 != 0 ): continue

				pattern = id[:pattern_length]

				if ( id == pattern * int(repetitions) ):

					if ( repetitions == 2 ):
						invalid_ranges_part_1.append( int(id) )

					invalid_ranges_part_2.append( int(id) )

					break

	invalid_sum_part_1 = reduce( lambda a, b: a + b, invalid_ranges_part_1, 0 )

	print( f'Part 1: {invalid_sum_part_1}' ) # 41294979841

	invalid_sum_part_2 = reduce( lambda a, b: a + b, invalid_ranges_part_2, 0 )

	print( f'Part 2: {invalid_sum_part_2}' ) # 66500947346

	return
