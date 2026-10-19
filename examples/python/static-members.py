class Student:
    # Class variables sit in the class body. All students share one copy.
    school = "Vista Ridge High School"
    count = 0

    def __init__(self, name):
        # Instance variables are set on self. Each student has its own.
        self.name = name
        # Change the shared counter through the class name.
        Student.count += 1
        self.student_id = 1000 + Student.count

    # A static method does not take self, so it cannot see one student's data.
    @staticmethod
    def is_valid_id(student_id):
        return 1001 <= student_id <= 9999


maya = Student("Maya")
leo = Student("Leo")

print(f"{maya.name}: id {maya.student_id}")
print(f"{leo.name}: id {leo.student_id}")
print(f"Students created: {Student.count}")
print(f"Is 1500 a valid id? {Student.is_valid_id(1500)}")

# You can read a class variable through the class or through an object.
print(f"From the class: {Student.school}")
print(f"From maya: {maya.school}")

# Changing it through the class changes it for every student.
Student.school = "Vista Ridge HS"
print(f"Maya: {maya.school}, Leo: {leo.school}")

# Edge case: assigning through an object makes a new instance variable
# that hides the class variable for that one object only.
leo.school = "Online campus"
print(f"Maya: {maya.school}, Leo: {leo.school}, class: {Student.school}")
