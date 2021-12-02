with open('day2Input.txt', mode='r') as file:
    input_list = [map(str.strip, x.split(' ')) for x in list(file.readlines())]
    
    # in reverse order - read in the file as a list of lines (in string format)
    # split each string into a list using ' ' as a delimiter
    # strip whitespace on each string in the nested lists
              
def find_position(some_list):
    horiz = 0
    depth = 0
    for command in some_list:
        direction = command[0]
        motion = int(command[1])
        if direction == "forward":
                horiz += motion
        if direction == "up":
                depth -= motion
        if direction == "down":
                depth += motion
    return [horiz,depth]

# test case should yield 15, 10, 150
# test_list = [x.split(' ') for x in [
#     "forward 5",
#     "down 5",
#     "forward 8",
#     "up 3",
#     "down 8",
#     "forward 2"]]

# h, d = find_position(test_list)
# print(h,d,h*d)

h, d = find_position(input_list)
print(h,d,h*d)
