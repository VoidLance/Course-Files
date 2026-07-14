PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE Genres(
	genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
	genre_name TEXT
);
INSERT INTO Genres VALUES(1,'Action');
INSERT INTO Genres VALUES(2,'Comedy');
INSERT INTO Genres VALUES(3,'Drama');
INSERT INTO Genres VALUES(4,'Horror');
INSERT INTO Genres VALUES(5,'Sci-Fi');
CREATE TABLE Directors(
	director_id INTEGER PRIMARY KEY AUTOINCREMENT,
	director_name TEXT
);
INSERT INTO Directors VALUES(1,'Steven Spielberg');
INSERT INTO Directors VALUES(2,'Martin Scorsese');
INSERT INTO Directors VALUES(3,'Christopher Nolan');
INSERT INTO Directors VALUES(4,'Quentin Tarantino');
INSERT INTO Directors VALUES(5,'James Cameron');
CREATE TABLE Movies(
	movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT,
	release_year INTEGER,
	genre_id INTEGER,
	director_id INTEGER,
	rating REAL CHECK(rating >=0 AND rating <=10)
);
INSERT INTO Movies VALUES(1,'Inception',2010,5,3,8.8);
INSERT INTO Movies VALUES(2,'The Dark Knight',2008,1,3,9.0);
INSERT INTO Movies VALUES(3,'Pulp Fiction',1994,2,4,8.9);
INSERT INTO Movies VALUES(4,'Jurassic Park',1993,5,1,8.1);
INSERT INTO Movies VALUES(5,'Avatar',2009,5,5,7.8);
PRAGMA writable_schema=ON;
CREATE TABLE IF NOT EXISTS sqlite_sequence(name,seq);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Genres',5);
INSERT INTO sqlite_sequence VALUES('Directors',5);
INSERT INTO sqlite_sequence VALUES('Movies',5);
PRAGMA writable_schema=OFF;
COMMIT;
