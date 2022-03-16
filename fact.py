def getFact(n):
    if(n == 0):
        return 1
    elif (n < 0):
        return "Negative value"
    fact = 1
    while n > 0:
        fact = fact * n
        n-=1
    return fact

num = int(input('> Enter number: '))
print(getFact(num))