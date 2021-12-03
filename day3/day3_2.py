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

def o2filter(o2_tmp):
    return "1" if o2_tmp.count("1") >= o2_tmp.count("0") else "0"

def co2filter(co2_tmp):
    return "1" if co2_tmp.count("1") < co2_tmp.count("0") else "0"


def get_rating(someList, ratingFilter):
    binaryLength = len(someList[0])
    outList = someList[:]
    while (len(outList) > 1):
        for i in range(binaryLength):
            if (len(outList) == 1):
                return outList[0]
            tempList = [x[i] for x in outList]
            bit = ratingFilter(tempList)
            # print(f"\n array {i+1}: {len(outList)}"+ array)
            # print(f"bit: {bit}")
            
            outList = list(filter(lambda x: (x[i] == bit), outList))
    return outList[0]

# o2 = get_rating(test_list, o2filter)
# co2 = get_rating(test_list, co2filter)
# print(int(o2, 2), int(co2, 2))

o2 = get_rating(input_list, o2filter)
co2 = get_rating(input_list, co2filter)
print(int(o2, 2) * int(co2, 2))