with open('day2Input.txt', mode='r') as file:
    input_list = [map(str.strip, x.split(' ')) for x in list(file.readlines())]
    
def find_position2(some_list):
    horiz = 0
    depth = 0
    aim = 0
    for command in some_list:
        direction = command[0]
        x = int(command[1])
        if direction == "forward":
                horiz += x
                depth += aim * x
        if direction == "up":
                aim -= x
        if direction == "down":
                aim += x
    return [horiz,depth]

# test case: should yield 15, 60, 900 
# test_list = [x.split(' ') for x in [
#     "forward 5",
#     "down 5",
#     "forward 8",
#     "up 3",
#     "down 8",
#     "forward 2"]]

# h, d = find_position2(test_list)
# print(h,d,h*d)

h, d = find_position2(input_list)
print(h,d,h*d)
