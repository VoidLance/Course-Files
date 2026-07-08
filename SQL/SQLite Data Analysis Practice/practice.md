I ran sqlite3 from my terminal and entered the following:

CREATE TABLE Genres(
	genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
	genre_name TEXT
);

CREATE TABLE Directors(
	director_id INTEGER PRIMARY KEY AUTOINCREMENT,
	director_name TEXT
);

CREATE TABLE Movies(
	movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT,
	release_year INTEGER,
	genre_id INTEGER,
	director_id INTEGER,
	rating REAL CHECK(rating >=0 AND rating <=10)
);

INSERT INTO Genres(genre_name)
VALUES
('Action'),
('Comedy'),
('Drama'),
('Horror'),
('Sci-Fi');

INSERT INTO Directors(director_name)
VALUES
('Steven Spielberg'),
('Martin Scorsese'),
('Christopher Nolan'),
('Quentin Tarantino'),
('James Cameron');

INSERT INTO Movies(title, release_year, genre_id, director_id, rating)
VALUES
('Inception', 2010, 5, 3, 8.8),
('The Dark Knight', 2008, 1, 3, 9),
('Pulp Fiction', 1994, 2, 4, 8.9),
('Jurassic Park', 1993, 5, 1, 8.1),
('Avatar', 2009, 5, 5, 7.8);

SELECT title, rating
FROM Movies
ORDER BY rating DESC
LIMIT 3;

SELECT g.genre_name, m.rating
FROM Movies m
JOIN Genres g ON m.genre_id = g.genre_id
ORDER BY m.rating DESC
LIMIT 3;

SELECT d.director_name, m.rating
FROM Movies m
JOIN Directors d ON m.director_id = d.director_id
ORDER BY m.rating DESC
LIMIT 3;
