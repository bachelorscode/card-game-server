
def checkPrime(n):
    for i in range(2, n):
        if n % i == 0:
            return False
    return True


def create_twins(lower, upper):
    for i in range(lower, upper):
        j = i+2
        if(checkPrime(i) and checkPrime(j)):
            print(f"twin: {i}, {j}")


lower = int(input('> Please lower limit: '))

upper = int(input('> please enter upper limit: '))

create_twins(lower, upper)