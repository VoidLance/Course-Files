x=float(input("Input X: "))
y=float(input("Input Y: "))
z = 0

def add(x,y):
  z=x+y
  print(z)

def subtract(x,y):
  z=x-y
  print(z)

def multiply(x,y):
  z=x*y
  print(z)

operation = input("Add, Subtract, Multiply: ")

if operation == "add":
    add(x,y)
elif operation == "subtract":
    subtract(x,y)
elif operation == "multiply":
    multiply(x,y)
