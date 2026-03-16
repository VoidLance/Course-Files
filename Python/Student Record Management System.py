#Create tuples for student records
john = ("John Doe", 17, "Grade 12")
jane = ("Jane Doe", 21, "Grade 15")
rose = ("Rose Mikaelson", 29, "Grade 16")

students = (john, jane, rose)

#Use tuple methods
print(f"Number of students: {len(students)}")
print(f"index of Jane Doe: {students.index(jane)}")

#Create sets for student ids
student_ids = {1001, 1002, 1003}
courses = {"Maths", "Science", "English", "History"}

#Use Set operations (These purposes don't really require set operations, but I am using them to show that I can use them
print(f"Number of courses available: {len(courses)}")
print(f"Courses: {courses}")
print(f"Student IDs: {student_ids}")

new_student_ids = {1004, 1005, 1006}
student_ids.update(new_student_ids)
print(f"Updated Student IDs: {student_ids}")

completed_courses = {"Maths", "English"}
remaining_courses = courses.symmetric_difference(completed_courses)
print("Completed Courses:", courses.intersection(completed_courses))
print(f"Remaining Courses: {remaining_courses}")

#Use frozen sets
frozen_courses = frozenset(["Maths", "Science" "English", "History"])
print(f"Frozen Courses: {frozen_courses}")

#frozen_courses.add("Maths") # uncommenting this line will raise an attribute error

#Create a frozen set of student data
frozen_student_data = frozenset(students)
print(f"Frozen Student Data: {frozen_student_data}")