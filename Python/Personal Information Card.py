# Define class to use for multiple instances as a more scalable solution
class Person:
    def __init__(self,name,age,city,hobby):
        self.name = name
        self.age = age
        self.city = city
        self.hobby = hobby

# Define new Person with the attributes used in the previous solution
alistair = Person(input("Enter your name: "), int(input("Enter your Age: ")), input("Enter your city: "), input("Enter your Hobby: "))

# Declare all variables
# name=str("Alistair")
# age=int(29)
# city=str("Bristol")
# hobby=str("Coding")

# Print card information with decorative bars inspired by example
print("====================================================================")
print("===========Information Card=========================================")
print("====================================================================")
print("             Name:    ",alistair.name)
print("             Age:     ",alistair.age)
print("             City:    ",alistair.city)
print("             Hobby:   ",alistair.hobby)
print("====================================================================")
print("====================================================================")