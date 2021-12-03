with open('day3Input.txt', mode='r') as file:
    input_list = map(str.strip, list(file.readlines()))
    
test_list = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010"]

def get_rates(some_list):
    gamma = ""
    epsilon = ""
    for i in range(len(some_list[0])):
        temp_list = [x[i] for x in some_list]
        if (temp_list.count("1") >= temp_list.count("0")):
            gamma += "1"    
            epsilon += "0"
        else: 
            gamma += "0"
            epsilon += "1"
    return [int(gamma, 2), int(epsilon, 2)]

# print(get_rates(test_list))
print(get_rates(input_list)[0] * get_rates(input_list)[1])