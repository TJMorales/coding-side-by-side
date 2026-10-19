# A variable is a name that stores a value. = assigns the value on the right.
student_name = "Maya"
test_score = 88

print("Student:", student_name)
print("Score:", test_score)

# Assigning again replaces the old value.
test_score = test_score + 5
print("Score after curve:", test_score)

# You never write a type. Python reads it from the value.
print("Type of test_score:", type(test_score))

# The same name can later hold a different type of value.
test_score = "absent"
print("Score now:", test_score)
print("Type of test_score now:", type(test_score))
