# import file and convert to int list
# with .readlines(), no need to call csvReader
with open('day1Input.csv', mode='r') as file:
    input_list = list(map(int, file.readlines()))



# for loop
count = 0
for i in range(len(input_list)-3):
    curr = sum(input_list[i+1:i+4])
    prev = sum(input_list[i:i+3])
    if curr > prev:
        count+=1

print(count)