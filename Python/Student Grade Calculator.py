#Create a list of test scores
scores = [34, 60, 56, 95, 82]

#Calculate average score using floor division
total_score = sum(scores)
num_tests = len(scores)
average_score = total_score // num_tests

#Use comparison operators to set the grade
if average_score >= 50:
    if average_score >= 60:
        grade = "E"
    elif average_score >= 70:
        grade = "D"
    elif average_score >= 80:
        grade = "C"
    elif average_score >= 90:
        grade = "B"
    elif average_score >= 95:
        grade = "A"
    elif average_score >= 99:
        grade = "A+"
    else:
        grade = "F"
else:
    grade ="Fail"

#Update grade using assignment operators
if average_score % 10 >= 5:
    grade += "+"

#Check if a specific score is present using membership operators
check_score = int(input("Enter the score to search for: "))
if check_score in scores:
    print("The score {check_score} is in the list".format(check_score=check_score))
else:
    print("The score {check_score} is not in the list".format(check_score=check_score))

#Compare scores using identity operators
scores_copy = scores
if scores is scores_copy:
    print("scores and scores_copy are the same object")
else:
    print("scores and scores_copy are not the same object")

#Perform bitwise operators on the scores
bitwise_result = scores[0] & scores[1]

print("bitwise AND of the first two scores: ", bitwise_result)

bitwise_result = scores_copy[0] | scores_copy[1]
print("bitwise OR of the first two scores: ", bitwise_result)

#Display the student's grade
print("The student's average score is: {average_score} and their grade is: {grade}".format(average_score=average_score, grade=grade))