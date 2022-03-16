
disc = [
    {
        "id": 1,
        "name": "Satyam Kumar",
        "age": "21",
    },
    {
        "id": 2,
        "name": "Gaurav Singh",
        "age": "20",
    },
    {
        "id": 3,
        "name": "Pankaj Kumar",
        "age": "20",
    },
]


def fetchUser():
    id = int(input("> please enter your id: "))
    flag = False
    user = {}
    for e in disc:
        if(e["id"] == id):
            flag = True
            user = e
            break

    if(flag):
        print("> User found. User details")
        print(user)
    else:
        print("> user not found with id ", id)


def insertUser():
    id = int(input("> Please enter id"))
    name = input("> Please enter name")
    age = input("> please enter age")

    disc.append({
        "id": id,
        "name": name,
        "age": age
    })

    print("User create with details: ")
    print({
        "id": id,
        "name": name,
        "age": age
    })


def insertAsObj():
    obj = input("> enter obj of student")
    disc.append(obj)
    print("User create ")
    print(obj)


def options():
    print("> 1 for search user")
    print("> 2 for insert user")
    print("> 3 for insert obj of user")
    print("> Any key for exit")


def main():
    flag = True
    while flag:
        options()
        opt = int(input("> Please enter your choice: "))
        if opt == 1:
            fetchUser()
        elif opt == 2:
            insertUser()
        elif opt == 3:
            insertAsObj()
        else:
            flag = False

        

main()