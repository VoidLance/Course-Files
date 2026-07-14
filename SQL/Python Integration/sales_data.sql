PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE sales(
	sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
	product_name TEXT NOT NULL,
	quantity INTEGER NOT NULL,
	sale_date TEXT NOT NULL,
	amount REAL NOT NULL
);
INSERT INTO sales VALUES(1,'Product1_updated',150,'2023-01-02',1200.99);
INSERT INTO sales VALUES(2,'Product1',100,'2023-01-01',999.99);
PRAGMA writable_schema=ON;
CREATE TABLE IF NOT EXISTS sqlite_sequence(name,seq);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('sales',2);
PRAGMA writable_schema=OFF;
COMMIT;
