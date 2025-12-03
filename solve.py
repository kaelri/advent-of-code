import os
import sys

def init():

	if len(sys.argv) >= 3:
		yearID = sys.argv[1]
		dayID  = sys.argv[2]
	elif len (sys.argv) >= 2:
		yearID = '2025'
		dayID  = sys.argv[1]
	else:
		sys.stderr.write('Please provide a solution number, e.g. `python -m solve 5` or `python -m solve 2024 3`.\n')
		sys.exit()

	if (len(dayID) == 1):
		dayID = dayID.zfill(2)

	from importlib.machinery import SourceFileLoader
	module_path = os.path.join('solutions', f'y{yearID}', f'd{dayID}')
	module_file = os.path.join('solutions', f'y{yearID}', f'd{dayID}', 'solution.py')
	solution = SourceFileLoader('solution', module_file ).load_module()

	sys.stdout.write( f'{yearID} DAY {dayID}\n' );
	sys.stdout.write( '-----------\n' );

	solution.init( module_path )

	return

init()