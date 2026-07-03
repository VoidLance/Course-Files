# Practical Exercise - Manipulate a Student Information Database

The first task in this exercise uses the database from the last exercise - the other document in this directory.
Since I had already deleted that database locally to save space in the MySQL server directory, I first ran the solution .sql file from the previous exercise, which seems to have set everything back up to how it was, but if it's any different this is why.

## Other Files
As always, the other files are in the root project directory, but this time I haven't added the local database files, only the solution .sql file for this exercise.

### Creating Views

After adding a record to the students table, I ran the following:

CREATE VIEW student_overview AS
SELECT id, name, grade FROM students;

SELECT * FROM student_overview;

This created the view and verified that it displayed the correct data.

The next part of the task specifically mentioned modifying the view. I had to make sure, as no mention of modifying a view had been made in the course so far, but neither had many things that have come up. I discovered that in PostgreSQL and SQL Server, ALTER VIEW exists but is generally used for specific modifications like security or options rather than changing the SELECT statement directly.

So I then modified the script to 'modify' the view by recreating it:


DROP VIEW IF EXISTS student_overview;


CREATE VIEW student_overview AS
SELECT
    id,
    name,
    grade,
    CASE
        WHEN age < 18 THEN 'Minor'
        ELSE 'Adult'
    END AS age_category
FROM
    students;


SELECT * FROM student_overview;

### Stored Procedures

I for a brief time considered using a COUNT(*)+1 on this next part in order to increment the id column in the procedure for each entry inserted, but on realising this was an improvised method, I searched for better ones and found out that an AUTO_INCREMENT property exists in SQL, and on checking, found that it was already enabled on the id column in the .sql file I built this version of the database from. I wish that this was covered in the course materials, it seems extremely useful. So What I ended up with as the procedure is:

CREATE PROCEDURE add_student (IN name VARCHAR(50), IN age INT, IN grade VARCHAR(10))
BEGIN
	INSERT INTO students (name, age, grade)
	VALUES (name, age, grade);
END;

Including modifying the procedure to return the id of the newly added student, the new script looks like this:


DROP VIEW IF EXISTS student_overview;

CREATE VIEW student_overview AS
SELECT
    id,
    name,
    grade,
    CASE
        WHEN age < 18 THEN 'Minor'
        ELSE 'Adult'
    END AS age_category
FROM
    students;

SELECT * FROM student_overview;

DROP PROCEDURE IF EXISTS add_student;

DELIMITER $$

CREATE PROCEDURE add_student (
    IN in_name VARCHAR(50),
    IN in_age INT,
    IN in_grade VARCHAR(10),
    OUT student_id INT
)
BEGIN
    INSERT INTO students (name, age, grade)
    VALUES (in_name, in_age, in_grade);

    SET student_id = LAST_INSERT_ID();
END $$

DELIMITER ;

SET @new_student_id = 0;

CALL add_student('Jane Smith', 20, 'B', @new_student_id);

SELECT @new_student_id AS NewStudentID;

SELECT * FROM students;


I had a lot of issues with the BEGIN PROCEDURE block, because I didn't realise that MySQL requires changing the delimiter for creating procedures that include the ; inside the block, presumably because the software interprets the ; as the end of the procedure rather than the end of that query.

### User-defined Functions

Now knowing about the DELIMITER keyword, I found it much easier to create the function next:

DELIMITER $$
CREATE FUNCTION calculate_discount (IN price DECIMAL, IN discountPercent DECIMAL)
RETURNS DECIMAL
DETERMINISTIC
BEGIN
	DECLARE discounted_price DECIMAL(10,2);
    SET discounted_price = price - (price * (discountPercent / 100));
    RETURN discounted_price;
END$$

DELIMITER ;

SELECT calculate_discount(100, 15) AS final_price;

This brings the final script to:


DROP VIEW IF EXISTS student_overview;

CREATE VIEW student_overview AS
SELECT
    id,
    name,
    grade,
    CASE
        WHEN age < 18 THEN 'Minor'
        ELSE 'Adult'
    END AS age_category
FROM
    students;

SELECT * FROM student_overview;

DROP PROCEDURE IF EXISTS add_student;

DELIMITER $$

CREATE PROCEDURE add_student (
    IN in_name VARCHAR(50),
    IN in_age INT,
    IN in_grade VARCHAR(10),
    OUT student_id INT
)
BEGIN
    INSERT INTO students (name, age, grade)
    VALUES (in_name, in_age, in_grade);

    SET student_id = LAST_INSERT_ID();
END $$

DELIMITER ;

SET @new_student_id = 0;

CALL add_student('Jane Smith', 20, 'B', @new_student_id);

SELECT @new_student_id AS NewStudentID;

SELECT * FROM students;

DELIMITER $$
CREATE FUNCTION calculate_discount (IN price DECIMAL, IN discountPercent DECIMAL)
RETURNS DECIMAL
DETERMINISTIC
BEGIN
	DECLARE discounted_price DECIMAL(10,2);
    SET discounted_price = price - (price * (discountPercent / 100));
    RETURN discounted_price;
END$$

DELIMITER ;

SELECT calculate_discount(100, 15) AS final_price;

