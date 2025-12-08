import os
from functools import reduce

def init( module_path, inputID ):

	with open( os.path.join(module_path, f'{inputID}.txt'), 'r') as f:
		batteries = f.read().strip().split('\n')

	print( f'Part 1: {get_total_joltage(batteries, 2)}' ) # 17166
	print( f'Part 2: {get_total_joltage(batteries, 12)}' ) # 169077317650774

def get_total_joltage( batteries, num_digits ):

	total_joltage = 0

	for battery in batteries:
		total_joltage += get_battery_joltage( battery, num_digits )

	return total_joltage

def get_battery_joltage( battery, num_digits ):

	digits = []

	for n in range( 1, num_digits + 1, 1 ):

		for i in range(9,0,-1):

			digit_index = battery[ :( len(battery) - (num_digits - n) ) ].find( str(i) )
			if digit_index != -1:
				digits.append( battery[ digit_index ] )
				battery = battery[ digit_index + 1: ]
				break

	battery_joltage = int( reduce( lambda a, b: a + b, digits, '' ) )

	return battery_joltage
