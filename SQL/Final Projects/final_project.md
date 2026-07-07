# Final Project - CRM System
Project Brief: Design and implement a Customer Realationship Management (CRM) System

## Requirements
- Create tables for Customers, Orders, Products and Feedback
- Design the database schema with appropriate relationships and constraints
- Implement CRUD operations for each table
- Write queries to generate reports on customer orders, product sales and customer feedback analytics

### Initial Thoughts
Looking at these requirements, I make the assumption that the project involves implementing the database in a Python app. I would create the database and tables in DBeaver, and create a script and ERD for the database schema with relationships and constraints. I would then create the python file - probably called main.py - and set up the connection with sqlite3 (I enjoy using MySQL and hope to also try PostgreSQL at some point, but sqlite3 is nice and easy to implement in Python projects.) After this, I would add to the python file to create some functions for basic CRUD operations using a cursor. I think for the final requirement, I will again use python functions to make those queries, but also write them in DBeaver scripts.
I imagine the final database may look fairly similar to the customer feedback database I did the previous tasks in, but I intend to make a new database for this project from the ground up anyway, to ensure that it is tailor made to this project.
The project looks a little simpler than I expected when I break it down like this, I might start using this method to approach daunting projects more in the future.

### Entities
#### Customers
##### Properties
- customerID [PRIMARY KEY]
- firstName
- lastName
- email
#### Orders
##### Properties
- orderID [PRIMARY KEY]
- customerID [FOREIGN KEY] (one-to-many)
- productID [FOREIGN KEY] (many-to-many)
- quantity
- value
#### Products
##### Properties
- productID [PRIMARY KEY]
- productName
- price
- stock
#### Feedback
##### Properties
- feedbackID [PRIMARY KEY]
- customerID [FOREIGN KEY] (one-to-one)
- orderID [FOREIGN KEY] (one-to-one)
- feedbackText
- rating

### Creating the database
I ran the following script to create the database:
CREATE TABLE Customers(
	customerID INTEGER PRIMARY KEY AUTOINCREMENT,
	firstName TEXT NOT NULL,
	lastName TEXT NOT NULL,
	email TEXT UNIQUE
);

CREATE TABLE Products(
	productID INTEGER PRIMARY KEY AUTOINCREMENT,
	productName TEXT NOT NULL,
	price REAL NOT NULL,
	stock INTEGER
);

CREATE TABLE Orders(
	orderID INTEGER PRIMARY KEY AUTOINCREMENT,
	customerID INTEGER NOT NULL,
	productID INTEGER,
	quantity INTEGER NOT NULL,
	value REAL NOT NULL,
	FOREIGN KEY (customerID) REFERENCES Customers(customerID),
	FOREIGN KEY (productID) REFERENCES Products(productID)
);

CREATE TABLE Feedback(
	feedbackID INTEGER PRIMARY KEY AUTOINCREMENT,
	customerID INTEGER NOT NULL UNIQUE,
	orderID INTEGER NOT NULL UNIQUE,
	feedbackText TEXT,
	rating REAL CHECK(rating >=1 AND rating <=5),
	FOREIGN KEY (customerID) REFERENCES Customers(customerID),
	FOREIGN KEY (orderID) REFERENCES Orders(orderID)
);

and made the ERD located in this project's directory: ![image](final_project_erd.png)


