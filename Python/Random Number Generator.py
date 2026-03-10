import random

random_number = random.randint(1, 100)

print('Random Number:', random_number, "\nType:", type(random_number))

print('Random Float:', float(random_number), "\nType:", type(random_number))

print("Random Complex:", complex(random_number, random.randint(1,100)), "\nType:", type(random_number))