-- Design a relational database for a company ( you can come up with a name ) that manages employees, departments, and projects. The goal is to create, modify, and optimize the database structure while ensuring data integrity.


-- Lesson 1 
-- Creating Tables:

-- Employees Table:
-- - Create a table to store employee details, ensuring each employee has a unique identifier, first and last name, email address, hire date, and optional department information.
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    HireDate DATE NOT NULL,
    Department VARCHAR(50)
);


-- Departments Table:
-- - Design a table to store department details, including a unique identifier and department name. Each department should have a manager, who is one of the employees.
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY AUTO_INCREMENT,
    DepartmentName VARCHAR(100) NOT NULL,
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Employees(EmployeeID)
);

-- Projects Table:
-- - Develop a table to manage projects, where each project has a unique identifier, name, start date, and optional end date. Each project should be managed by an employee.
CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY AUTO_INCREMENT,
    ProjectName VARCHAR(100) NOT NULL UNIQUE,
    StartDate DATE NOT NULL,
    EndDate DATE,
    ManagerID INT,
    FOREIGN KEY (ManagerID) REFERENCES Employees(EmployeeID)
);

-- *******************************************************

-- Lesson 2 
-- Altering Tables:

-- - Add a column to the Employees table to store phone numbers.
-- - Make sure that every department has a name by including a NOT NULL constraint on the DepartmentName column.
-- - Rename the HireDate column in the Employees table to StartDate.
-- - Remove the Department column from the Employees table, as it is redundant.
ALTER TABLE Employees
ADD COLUMN PhoneNumber VARCHAR(15);
ALTER TABLE Departments
MODIFY COLUMN DepartmentName VARCHAR(100) NOT NULL;
ALTER TABLE Employees
CHANGE COLUMN HireDate StartDate DATE NOT NULL;
ALTER TABLE Employees
DROP COLUMN Department;

-- *******************************************************

-- Lesson 3 
-- Dropping Tables:

-- - Drop the Departments table entirely from the database.
-- - Create a temporary table named TempProjects for testing purposes and then drop it.
-- - Write a script to drop the Employees table only if it exists.
DROP TABLE IF EXISTS Departments;
CREATE TEMPORARY TABLE TempProjects (
    TempID INT PRIMARY KEY,
    TempName VARCHAR(50)
);
DROP TEMPORARY TABLE TempProjects;
DROP TABLE IF EXISTS Employees;

-- *******************************************************


-- Lesson 4 
-- Constraints:

-- - Make sure each task assignment is linked to a specific employee and project by creating a TaskAssignments table with appropriate primary and foreign keys.
-- - Add a unique constraint to the Email column in the Employees table to prevent duplicate email addresses.
-- - Make sure that every project must have an end-date by setting a NOT NULL constraint on the EndDate column in the Projects table.
CREATE TABLE TaskAssignments (
    TaskID INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeID INT,
    ProjectID INT,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);
ALTER TABLE Employees
ADD CONSTRAINT unique_email UNIQUE (Email);
ALTER TABLE Projects
MODIFY COLUMN EndDate DATE NOT NULL;

-- *******************************************************


-- Lesson 5 
-- Indexes:

-- - Create an index on the Email column in the Employees table to speed up email searches.
-- - Create a composite index on the LastName and FirstName columns in the Employees table to improve full name searches.
-- - Drop the index on the Email column if it is no longer needed.
CREATE INDEX idx_email ON Employees(Email);
CREATE INDEX idx_fullname ON Employees(LastName, FirstName);
DROP INDEX idx_email ON Employees;
