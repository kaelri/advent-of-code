import os
import sys
from importlib.machinery import SourceFileLoader

def init():

	yearID  = sys.argv[1]          if len(sys.argv) >= 2 else '2025'
	dayID   = sys.argv[2].zfill(2) if len(sys.argv) >= 3 else '01'
	inputID = sys.argv[3]          if len(sys.argv) >= 4 else 'input'

	module_path = os.path.join( 'solutions', f'y{yearID}', f'd{dayID}' )
	module_file = os.path.join( module_path, 'solution.py' )
	solution = SourceFileLoader('solution', module_file ).load_module()

	title = f'{yearID} » DAY {dayID} » {inputID}'
	sys.stdout.write( title + '\n' + ( '-' * len(title) ) + '\n' );

	solution.init( module_path, inputID )

init()