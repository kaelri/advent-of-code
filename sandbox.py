id = "56"
max_pattern_length = int( len(id) // 2 )
pattern_length = 1
repetitions_needed = len(id) / pattern_length
pattern = id[0:pattern_length]

print(id, max_pattern_length, pattern, int(repetitions_needed), pattern * int(repetitions_needed) )