# input() shows the prompt, waits for the user, and returns what they typed.
name = input("What is your name? ")

# input() always returns a str, even when the user types digits.
raw_age = input("How old are you? ")
print()
print("You typed:", raw_age, type(raw_age))

# Convert the text to an int before you do math with it.
age = int(raw_age)
print("Hello,", name + "!")
print("Next year you will be", age + 1)
