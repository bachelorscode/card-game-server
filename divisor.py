def divisor(n):
    divisors = []
    for num in range(1, n):
        if(n % num == 0 ):
            divisors.append(num)
    return divisors




def isAmicableNumber(a, b):
    for i in range(a, b+1):
        divisorSum = sum(divisor((i)))
        if(sum(divisor(divisorSum)) == i):
            print(i, " is amicable number and it's divisor sum is ", divisorSum)

            
isAmicableNumber(1, 1000)