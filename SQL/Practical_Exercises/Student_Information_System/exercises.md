# Practical Exercise - Managing a Student Information System Database
This practical was both easy to understand and challenging. The actual tasks I was completing were a breeze, but fighting the quirks of MySQL and DBeaver proved rather difficult. I believe doing things like this will be quite important in the career path I have planned, so I intend to do some research and practice in my own time to understand the reasons for the errors and their solutions better.

## Other Files
I have placed the solution folder again into the root directory of this project, as well as the database files, so that you can look at them while reading this document.

### GRANT Statement

I used the following script to satisfy the requirements for this first part of the exercise:

USE student_management;

CREATE TABLE Students(
	studentID INT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	age INT NOT NULL,
	grade CHAR(1)
);

CREATE TABLE Teachers(
	teacherID INT PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
	subject VARCHAR(50)
);

CREATE USER teacher_user;

GRANT SELECT, INSERT ON Students TO teacher_user;


I then created a new connection in DBeaver, logging in to the new user, and ran the following query:

INSERT INTO Students
VALUES
	(1, 'John Doe', 32, 'B'),
	(2, 'Jessica Albert', 22, 'A');

SELECT * FROM Students;

I found from doing this that DBeaver actually only runs the lines in the console that you have selected, and weirdly when I tried to run them all together it errored on the SELECT statement, but when I ran them individually it all worked fine.

I then ran this query to check that the user cannot update or delete records:

UPDATE Students SET grade = 'A' WHERE name = 'John Doe';

DELETE FROM Students;

Both lines returned the error "[STATEMENT] command denied to user 'teacher_user'@'localhost' for table 'student_management'.'Students'"

### REVOKE Statement

I tried to run this script:


USE student_management;

CREATE USER admin_user;

GRANT SELECT, INSERT, UPDATE, DELETE ON Students, Teachers TO admin_user;

To set up the admin_user for this task, but discovered that MySQL doesn't allow granting access on multiple tables at once. Thus, I instead ran this:

USE student_management;

CREATE USER admin_user;

GRANT SELECT, INSERT, UPDATE, DELETE ON Students TO admin_user;

GRANT SELECT, INSERT, UPDATE, DELETE ON Teachers TO admin_user;

I then ran the following queries to check that the new user had the necessary permissions:

INSERT INTO Students
VALUES
	(3, 'John Baker', 42, 'C'),
	(4, 'Melissa Christian', 24, 'A');

INSERT INTO Teachers
VALUES
	(1, 'Liam Black', 'History'),
	(2, 'William Elwood', 'English');

UPDATE Students SET grade = 'B' WHERE grade = 'C';
UPDATE Teachers SET subject = 'Science' WHERE teacherID = 2;

SELECT * FROM Students;
SELECT * FROM Teachers;

DELETE FROM Students;
DELETE FROM Teachers;

All of these queries worked, but also the user was not able to access the user list which I've realised is a good test of whether I am logged in as my own user or one of the created users.
To satisfy the revoking requirements of this task, I ran:

REVOKE DELETE ON Students FROM admin_user;

As my own user.

I then attempted to run:
DELETE FROM Students;
and
SELECT * FROM Students;

as the admin_user - and the delete failed due to not having permission, while the select succeeded. Thus this task is completed.

### Roles and Priveleges

I began creating a script to create the student role and assign it SELECT priveleges. The task seemed as though it wanted us to grant the priveleges within the same command as creating the role, but I had not come across anything in the course so far that would tell me how to do that, or even that it's possible, so I stuck with creating the role first and then granting permissions:

CREATE ROLE student_role;
GRANT SELECT ON Students TO student_role;

I then modified the script to create a new student_user and assign it the student_role:

CREATE ROLE student_role;
GRANT SELECT ON Students TO student_role;

CREATE USER student_user;
GRANT student_role TO student_user;

I then spent a long time struggling with DBeaver not registering the student_role as a role, but instead a user. This meant that not only could I not read the role's grants or delete the role using DBeaver's ui, but also in the dropdown list the student_management database did not appear, meaning I was unable to run commands as the student_user on the Students table. I was unable to fully fix this issue, but what I did end up with was just not selecting a database to run the commands in and instead running the following commands to ensure that the user had the role and was able to use the select statement but unable to use anything else:

SELECT * FROM student_management.Students;

INSERT INTO student_management.Students
VALUES
	(1, 'Test Student', 24, 'F');

The select statement worked, and the insert statement errored out due to being denied permission, indicating that not only had the role and permission assignment worked, my workaround for DBeaver's ui failing also worked.
Along the way, I also discovered that MySQL requires users to run the line:
SET ROLE role_name;
In order to activate the role for the session. I wonder if this might have anything to do with DBeaver's struggle to recognise the role - it strikes me as similar to temporary tables.
