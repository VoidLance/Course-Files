string = str(input("Enter your String: "))

print("\nString Manipulation Menu:")
print("Convert the string to upper case                     -   1")
print("Convert the string to lower case                     -   2")
print("Slice the string from a start index to end index     -   3")
print("Calculate the length of the string                   -   4")
print("Display each letter on a new line                    -   5")

choice = int(input("Please enter your choice (1-5): "))

if choice == 1:
    print(string.upper())
elif choice == 2:
    print(string.lower())
elif choice == 3:
    start_index = int(input("Enter the start index: "))
    end_index = int(input("Enter the end index: "))
    print(string[start_index:end_index])
elif choice == 4:
    print("String Length:", len(string))
elif choice == 5:
    for char in string:
        print(char)
else:
    print("Please enter a valid choice")
