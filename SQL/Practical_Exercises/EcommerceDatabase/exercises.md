# Practical Exercise - Manage an eCommerce Database
This document explains my work and thought process for completing the above practical activity as part of my software developer course with ITOL.

## Database files
I have copied the database files from my MySQL directory into the root project directory of this document so that you can hopefully look at the final database while looking through this document. I have also included the solution files from the course page.

### Insert Statement

CREATE TABLE customers (
    customerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    joinDate DATE DEFAULT CURRENT_DATE()
);


INSERT INTO customers (customerID, FirstName, LastName, email)
VALUES
    (1, 'John', 'Doe', NULL),
    (2, 'Jack', 'Frost', NULL),
    (3, 'Jessica', 'Albert', 'jessica.albert@example.com');


^This is the script I used for the first part of this task, creating the customers table and inserting three rows. I initially had this as a transaction with three separate insert statements, and this required learning new syntax for transactions, because I use MySQL (specifically MariaDB because that's the only way to use MySQL on Arch), which requires START TRANSACTION; rather than BEGIN TRANSACTION; - However I then remembered that insert statements can insert multiple rows at once and so decided I didn't need to use a transaction for this.

I then adapted the script to add the next table, including a DROP TABLE IF EXISTS clause for each table as I went so that the create table statement following would not cause any errors when I re-ran the script, and then again for the third table in this part of the task. This resulted in the following script:


-- Drop tables in the correct order
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

-- Create customers table
CREATE TABLE customers (
    customerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    joinDate DATE DEFAULT CURRENT_DATE()
);

-- Insert data into customers table
INSERT INTO customers (customerID, FirstName, LastName, email)
VALUES
    (1, 'John', 'Doe', NULL),
    (2, 'Jack', 'Frost', NULL),
    (3, 'Jessica', 'Albert', 'jessica.albert@example.com');

-- Create products table
CREATE TABLE products (
    productID INT PRIMARY KEY,
    productName VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL,
    stockQuantity INT DEFAULT 0
);

-- Insert data into products table
INSERT INTO products
VALUES
    (1, 'Beyblade', 26.23, 3),
    (2, 'Drawing Tablet', 138.86, 1),
    (3, 'Board Game', 96.52, 5);

-- Create orders table
CREATE TABLE orders (
    orderID INT PRIMARY KEY,
    customerID INT,
    productID INT,
    orderDate DATE DEFAULT CURRENT_DATE(),
    orderQuantity INT NOT NULL,
    FOREIGN KEY (customerID) REFERENCES customers(customerID) ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES products(productID) ON DELETE CASCADE
);

-- Insert data into orders table
INSERT INTO orders (orderID, customerID, productID, orderQuantity)
VALUES
    (1, 3, 2, 3),
    (2, 3, 1, 2),
    (3, 1, 2, 1);


### Update Statements

START TRANSACTION;
	UPDATE customers SET email = 'john.doe@example.com' WHERE customerID = 1;
	UPDATE products SET price = 1099.99 WHERE productID = 2;
	UPDATE orders SET orderQuantity = 1 WHERE orderID = 2;
COMMIT;

I added the above transaction to the script I have been using throughout this project, in order to satisfy the requirements of the second task of the exercise, using update statements. As mentioned above, I used START TRANSACTION instead of BEGIN TRANSACTION because of my setup for dealing with SQL right now.

### Delete Statement

I decided to use another transaction for the requested deletes because it seemed like a good idea to run them in a batch like that. This brings the full script to:

-- Drop tables in the correct order
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

-- Create customers table
CREATE TABLE customers (
    customerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    joinDate DATE DEFAULT CURRENT_DATE()
);

-- Insert data into customers table
INSERT INTO customers (customerID, FirstName, LastName, email)
VALUES
    (1, 'John', 'Doe', NULL),
    (2, 'Jack', 'Frost', NULL),
    (3, 'Jessica', 'Albert', 'jessica.albert@example.com');

-- Create products table
CREATE TABLE products (
    productID INT PRIMARY KEY,
    productName VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL,
    stockQuantity INT DEFAULT 0
);

-- Insert data into products table
INSERT INTO products
VALUES
    (1, 'Beyblade', 26.23, 3),
    (2, 'Drawing Tablet', 138.86, 1),
    (3, 'Board Game', 96.52, 5);

-- Create orders table
CREATE TABLE orders (
    orderID INT PRIMARY KEY,
    customerID INT,
    productID INT,
    orderDate DATE DEFAULT CURRENT_DATE(),
    orderQuantity INT NOT NULL DEFAULT 0,
    FOREIGN KEY (customerID) REFERENCES customers(customerID) ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES products(productID) ON DELETE CASCADE
);

-- Insert data into orders table
INSERT INTO orders (orderID, customerID, productID, orderQuantity)
VALUES
    (1, 3, 2, 3),
    (2, 3, 1, 2),
    (3, 1, 2, 1);

-- Update requested fields

START TRANSACTION;
	UPDATE customers SET email = 'john.doe@example.com' WHERE customerID = 1;
	UPDATE products SET price = 1099.99 WHERE productID = 2;
	UPDATE orders SET orderQuantity = 1 WHERE orderID = 2;
COMMIT;

-- Delete requested fields

START TRANSACTION;
	DELETE FROM customers WHERE customerID = 2;
	DELETE FROM products WHERE productID = 1;
	DELETE FROM orders WHERE orderID = 3;
COMMIT;
