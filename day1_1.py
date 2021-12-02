# import csv

# # import csv file and convert to int list
# with open('day1Input.csv', mode='r') as file:
#     csvReader = csv.reader(file)
#     input_list = []
#     for line in csvReader:
#         input_list.append(int(line[0]))

# with .readlines(), no need to call csvReader
with open('day1Input.csv', mode='r') as file:
    input_list = list(map(int, file.readlines()))


# print(input_list[:5])

# for loop
count = 0
for i in range(len(input_list)):
    if input_list[i] > input_list[i-1]:
        count+=1

print(count)