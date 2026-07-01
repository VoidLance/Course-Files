# Practical Exercise - Design a Relational Database

## Database Location
I have copied the database folder from the mysql directory as it is at the end of the changes made in this document, into the root CreateTable directory of this project.
This should mean you can see the database folder while you are reading this document, and I hope you should be able to download the database folder and open it in your own ide to read it.
I have also copied the 'solution' database as downloaded from the course page.

### Create Tables

CREATE TABLE employees(
	employeeID INT NOT NULL,
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL,
	email VARCHAR (100) UNIQUE,
	hire_date DATE DEFAULT CURRENT_DATE(),
	department VARCHAR(50),
	PRIMARY KEY(employeeID)
);

CREATE INDEX idx_name ON employees(FirstName, LastName);

CREATE TABLE departments(
	departmentID VARCHAR(50) NOT NULL,
	departmentName VARCHAR(50) NOT NULL,
	managerID INT,
	PRIMARY KEY(departmentID),
	FOREIGN KEY (managerID) REFERENCES employees(employeeID)
);

CREATE TABLE projects(
	projectID INT NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE,
	employeeID INT NOT NULL,
	PRIMARY KEY(projectID),
	FOREIGN KEY (employeeID) REFERENCES employees(employeeID)
);

^This is the script I used to create the tables requested. I had wanted to add a foreign key to the department column in employees, but it threw an error because the tables hadn't been created yet.
I understand that it could create undesirable circular references, and realised if I needed to I could add the foreign key using alter table so I decided to leave out the foreign key for now.

### Modify Tables

ALTER TABLE employees
ADD COLUMN phone_number INT;

ALTER TABLE departments
MODIFY departmentName VARCHAR(50) NOT NULL;

ALTER TABLE employees
RENAME COLUMN hire_date TO StartDate;

ALTER TABLE employees
DROP COLUMN department;

^This is the script I used to modify the tables as requested. I had a small amount of difficulty remembering the syntax for renaming a column, as well as for adding the NOT NULL constraint - I had written it as:
DROP CONSTRAINT IF EXISTS NOT NULL (departmentName)
ADD CONSTRAINT NOT NULL (departmentName);
Which I believe would have worked, if NOT NULL was a named constraint - Mention of named vs not named constraints was not made in the course, but was required in this instance, as because NOT NULL is not a named constraint, I was not able to use the same syntax to remove it to make room for adding it back. I ended up looking online for a solution and found that I can simply modify the column and add the NOT NULL constraint as if I was setting it out in the creation of the column, which means that it will add the constraint if it didn't already exist, and do nothing if it was already added.

### Drop Tables

I ran the following line in the SQL console:

DROP TABLE departments;

This deleted the columns and constraints, but kept the table and the foreign key from the managerID column (in DBeaver)
This is odd, because from what I know it should have deleted everything.
I tried disconnecting and reconnecting instead of just refreshing, and the departments table didn't show up on reconnect, so while it is odd that refreshing showed that the table data had been deleted and not the table itself or the foreign key, I am happy that the command did what I wanted it to.

I then also ran the next command:
CREATE TEMPORARY TABLE TempProjects(
	projectID INT NOT NULL,
	projectName VARCHAR(50),
	PRIMARY KEY (projectID)
);

SELECT * FROM TempProjects;

This allowed me to see that the temporary table was being created - as DBeaver does not show temporary tables in the ui.

I then added:
DROP TEMPORARY TABLE TempProjects;

SELECT * FROM TempProjects;

Which showed me that the table had been successfully deleted.

I then created the following script to satisfy the next part of the exercise:

DROP TABLE IF EXISTS employees;

However, when I ran this script to test it, it threw an error because it would break foreign key constraints.
To fix this I would add CASCADE to the end - however I don't want to run this because it would delete the entire database and it seems the database is required for the rest of the exercise.
Another option would be to adjust the foreign keys so that they don't link to the employees table.

### Constraints

CREATE TABLE TaskAssignments(
	taskID INT NOT NULL,
	task VARCHAR(50),
	ProjectID INT,
	assignedEmployee INT,
	PRIMARY KEY (taskID),
	FOREIGN KEY (ProjectID) REFERENCES projects(projectID)
);

ALTER TABLE employees
ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE projects
ADD CONSTRAINT forced_end_date NOT NULL (end_date);

This was the first script I wrote for the next task. I didn't think the ADD CONSTRAINT line would work, again because it is not a named constraint, but I wanted to see if it would work, and thought it was probably what the task was wanting me to do. I tried running the script and it didn't work, as expected. So I changed the line instead to:

MODIFY COLUMN end_date DATE NOT NULL;

Making the full script:

CREATE TABLE TaskAssignments(
	taskID INT NOT NULL,
	task VARCHAR(50),
	ProjectID INT,
	assignedEmployee INT,
	PRIMARY KEY (taskID),
	FOREIGN KEY (ProjectID) REFERENCES projects(projectID)
);

ALTER TABLE employees
ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE projects
MODIFY COLUMN end_date DATE NOT NULL;

This worked perfectly.

### Indexes

I had already made an index in the first task, but I was excited to see what kind of things this one would have me doing with indexes.

CREATE INDEX idx_email ON employees(email);

CREATE INDEX idx_name ON employees(FirstName, LastName);

DROP INDEX idx_email ON employees;

This is the script I ran to accomplish the task. I had already included the second line in the first script to create the table, so it threw an error that the index already existed, but I knew it would and also that DBeaver would allow me to skip this part of the script and move onto the next line anyway. All worked great.
