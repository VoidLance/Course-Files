first_name = input('Enter your first name: ')
last_name = input('Enter your last name: ')
full_name = first_name + ' ' + last_name
age = int(input('Enter your age: '))
city = input('Enter your city: ').strip().title()
occupation = input('Enter your occupation: ').strip().title()
modified_name = full_name.strip().title()
string = f"\n\"My name is {modified_name}. I am {age} years old, and live in {city} as a {occupation}\""
description = string.replace("a ", "an ") if occupation.startswith(("A", "I", "E", "O", "U")) else string

print("=======================================================================================================")
print("=======================================================================================================")
print("======================                                                              ===================")
print("======================                      User Profile Card                       ===================")
print("======================                                                              ===================")
print("=======================================================================================================")
print("=======================================================================================================")
print("Name:", first_name, last_name)
print("Age:", age)
print("City:", city)
print("Occupation:", occupation)
print("Description:", description)
print("=======================================================================================================")
print("=======================================================================================================")