-- Lesson 1: Creating Views

-- 1. Use the student_management database from the previous module.
USE student_management;


-- 2. Create a view named student_overview that shows the id, name, and grade columns from the students table.
CREATE VIEW student_overview AS
SELECT id, name, grade
FROM students;


-- 3. Query the student_overview view to verify it displays the correct data.
SELECT * FROM student_overview;


-- 4. Modify the view to include a calculated field that shows age categorized as 'Minor' if the age is less than 18, and 'Adult' otherwise.
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
FROM students;
SELECT * FROM student_overview;



-- *******************************************************


-- Lesson 3: Stored Procedures

-- 1. Create a stored procedure named add_student that takes the name, age, and grade as parameters and inserts a new record into the students table.
DELIMITER $$

CREATE PROCEDURE add_student(IN student_name VARCHAR(50), IN student_age INT, IN student_grade VARCHAR(10))
BEGIN
    INSERT INTO students (name, age, grade) 
    VALUES (student_name, student_age, student_grade);
END $$

DELIMITER ;


-- 2. Run the stored procedure to add a new student.
CALL add_student('Alice Johnson', 17, '12th Grade');


-- 3. Modify the stored procedure to return the id of the newly added student after insertion.
DROP PROCEDURE IF EXISTS add_student;
DELIMITER $$

CREATE PROCEDURE add_student(IN student_name VARCHAR(50), IN student_age INT, IN student_grade VARCHAR(10), OUT new_student_id INT)
BEGIN
    INSERT INTO students (name, age, grade) 
    VALUES (student_name, student_age, student_grade);
    
    SET new_student_id = LAST_INSERT_ID();
END $$

DELIMITER ;


-- 4. Verify that the stored procedure works as expected.
SET @student_id = 0;
CALL add_student('Bob Smith', 16, '11th Grade', @student_id);
SELECT @student_id;


-- *******************************************************


-- Lesson 4: User-Defined Functions

-- 1. Create a user-defined function named calculate_discount that takes a price and a discount percentage as input and returns the discounted price.
DELIMITER $$

CREATE FUNCTION calculate_discount(price DECIMAL(10,2), discount_percent DECIMAL(5,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN price - (price * discount_percent / 100);
END $$

DELIMITER ;

-- 2. Write a query to test the function by calculating the discounted price for an item with a price of 100 and a discount of 15%.
SELECT calculate_discount(100, 15) AS discounted_price;


