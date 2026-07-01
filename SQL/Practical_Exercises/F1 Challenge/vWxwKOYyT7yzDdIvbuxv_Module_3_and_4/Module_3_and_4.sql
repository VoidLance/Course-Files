
-- 1. List all Constructors:
--    - Retrieve the names of all constructors.
SELECT DISTINCT Name
FROM constructors;


-- 2. Find All Drivers:
--    - List the names of all drivers in the dataset.
SELECT DISTINCT GivenName, FamilyName
FROM drivers;


-- 3. Count the Number of Constructors:
--    - How many constructors are there in the dataset?
SELECT COUNT(DISTINCT ConstructorID) AS NumberOfConstructors
FROM constructors;


-- 4. Count the Number of Drivers:
--    - How many drivers are there in the dataset?
SELECT COUNT(DISTINCT DriverID) AS NumberOfDrivers
FROM drivers;


-- 5. List All Races for a Specific Season:
--    - Retrieve all races that took place in the 2020 season.
SELECT Season, Round, CircuitID
FROM qualifying_results
WHERE Season = 2020;


-- 6. Basic SELECT:
--    - Retrieve the `Name` and `Nationality` of all constructors.
SELECT Name, Nationality
FROM constructors;


-- 7. SELECT with Aliases:
--    - Retrieve driver `GivenName` and `FamilyName` and alias them as `FirstName` and `LastName`.
SELECT GivenName AS FirstName, FamilyName AS LastName
FROM drivers;


-- 8. SELECT Distinct Values:
--    - Retrieve distinct nationalities of drivers from the `drivers` table.
SELECT DISTINCT Nationality
FROM drivers;


-- 9. SELECT with Calculated Columns:
--    - Retrieve the `Position` and `Points` of drivers, and calculate their `PointsPerPosition` (Points divided by Position).
SELECT Position, Points, 
       (Points * 1.0 / Position) AS PointsPerPosition
FROM driver_standings;


-- 10. SELECT with Concatenation:
--     - Retrieve driver `GivenName` and `FamilyName` concatenated into a single column named `FullName`.
SELECT CONCAT(GivenName, ' ', FamilyName) AS FullName
FROM drivers;


-- 11. Basic Filtering:
--     - Retrieve all races where the `Season` is 2022.
SELECT *
FROM results
WHERE Season = 2022;


-- 12. Filtering with Multiple Conditions:
--     - Retrieve drivers who are either `German` or `British`.
SELECT *
FROM drivers
WHERE Nationality IN ('German', 'British');


-- 13. Filtering with LIKE:
--     - Retrieve all constructors whose name contains 'Ferrari'.
SELECT *
FROM constructors
WHERE Name LIKE '%Ferrari%';


-- 14. Filtering with IN:
--     - Retrieve all results where the `ConstructorID` is either 'ferrari' or 'williams'.
SELECT *
FROM results
WHERE ConstructorName IN ('ferrari', 'williams');


-- 15. Filtering with Date:
--     - Retrieve all drivers who were born before 2000.
SELECT *
FROM drivers
WHERE DateOfBirth < '2000-01-01';


-- 16. Basic Sorting:
--     - Retrieve all races sorted by `Season` in ascending order.
SELECT *
FROM results
ORDER BY Season ASC;


-- 17. Sorting with Multiple Columns:
--     - Retrieve all drivers sorted first by `Nationality` and then by `GivenName`.
SELECT *
FROM drivers
ORDER BY Nationality ASC, GivenName ASC;


-- 18. Descending Order:
--     - Retrieve all results sorted by `Points` in descending order.
SELECT *
FROM results
ORDER BY Points DESC;


-- 19. Sorting with NULLs:
--     - Retrieve all drivers and sort by `DateOfBirth`, placing NULL values last.
SELECT *
FROM drivers
ORDER BY 
  DateOfBirth IS NULL ASC, 
  DateOfBirth ASC;


-- 20. Top N Results:
--     - Retrieve the top 5 drivers with the highest `Points` in the 2020 season.
SELECT *
FROM driver_standings
WHERE Season = 2020
ORDER BY Points DESC
LIMIT 5;


-- 21. Basic LIMIT:
--     - Retrieve the first 10 constructors from the `constructors` table.
SELECT *
FROM constructors
LIMIT 10;


-- 22. LIMIT with OFFSET:
--     - Retrieve 10 drivers starting from the 11th driver in the list.
SELECT *
FROM drivers
ORDER BY driverId
LIMIT 10 OFFSET 10;


-- 23. Top N Results with OFFSET:
--     - Retrieve the next 10 drivers after the top 5 drivers with the most `Points` in the 2021 season.
SELECT *
FROM results
WHERE Season = 2021
ORDER BY Points DESC
LIMIT 10 OFFSET 5;


-- 24. LIMIT without ORDER BY:
--     - Retrieve the first 5 results of the 2020 season without specifying the order.
SELECT *
FROM results
WHERE Season = 2020
LIMIT 5;


-- 25. Pagination:
--     - Retrieve drivers for the 2020 season, showing results 11 through 20.
SELECT *
FROM results
WHERE Season = 2020
ORDER BY Points DESC
LIMIT 10 OFFSET 10;


-- 26. SUM Function:
--     - Calculate the total `Points` scored in the 2024 season.
SELECT SUM(Points) AS TotalPoints
FROM results
WHERE Season = 2024;


-- 27. AVG Function:
--     - Calculate the average `Points` scored by drivers in the 2000 season.
SELECT AVG(Points) AS AveragePoints
FROM results
WHERE Season = 2000;


-- 28. MAX and MIN Functions:
--     - Find the maximum and minimum `Points` scored by a driver in the 2021 season.
SELECT MAX(Points) AS MaxPoints, MIN(Points) AS MinPoints
FROM results
WHERE Season = 2021;


-- 29. COUNT Function:
--     - Count the number of races in the 2000 season.
SELECT COUNT(DISTINCT CircuitID) as Race_Count
FROM results
WHERE Season = 2000;


-- 30. GROUP_CONCAT Function:
--     - List all drivers in each constructor, concatenated into a single column.
SELECT r.ConstructorName, 
       GROUP_CONCAT(
       DISTINCT CONCAT(d.GivenName, ' ', d.FamilyName) ORDER BY d.FamilyName ASC
       ) 
       AS Drivers
FROM results r
JOIN drivers d ON r.driverId = d.driverId
GROUP BY r.ConstructorName;


-- 31. Basic GROUP BY:
--     - Retrieve the total `Points` scored by each constructor in the 2000 season.
SELECT ConstructorName, SUM(Points) AS TotalPoints
FROM results 
WHERE Season = 2000
GROUP BY ConstructorName;


-- 32. GROUP BY with HAVING:
--     - Retrieve constructors that have more than 20 `Points` in the 2002 season.
SELECT ConstructorName, SUM(Points) AS TotalPoints
FROM results
WHERE Season = 2002
GROUP BY ConstructorName
HAVING SUM(Points) > 20;


-- 33. COUNT with GROUP BY:
--     - Count the number of races each constructor participated in during 2020.
SELECT ConstructorName, COUNT(*) AS NumberOfRaces
FROM results
WHERE Season = 2020
GROUP BY ConstructorName;


-- 34. SUM with GROUP BY:
--     - Calculate the total `Points` for each driver, grouped by `Nationality`.
SELECT d.Nationality, d.GivenName, d.FamilyName, SUM(r.Points) AS TotalPoints
FROM results r
JOIN drivers d ON r.DriverID = d.DriverID
GROUP BY d.Nationality, d.GivenName, d.FamilyName;


-- 35. GROUP BY with Multiple Columns:
--     - Retrieve the average `Points` for each constructor and season combination.
SELECT ConstructorName, Season, AVG(Points) AS AveragePoints
FROM results
GROUP BY ConstructorName, Season;


-- 36. Inner Join:
--     - Retrieve driver names and their corresponding constructor names for races in the 2000 season.
SELECT DISTINCT d.GivenName, d.FamilyName, r.ConstructorName
FROM results r
INNER JOIN drivers d ON r.DriverID = d.DriverID
WHERE r.Season = 2024;


-- 37. Left Join:
--     - Retrieve all constructors and any drivers who raced for theM(include constructors with no drivers).
SELECT c.constructorId, d.GivenName, d.FamilyName
FROM constructors c
LEFT JOIN results r ON c.constructorId = r.ConstructorName 
LEFT JOIN drivers d ON r.DriverID = d.DriverID
GROUP BY c.constructorId, d.GivenName, d.FamilyName;


-- 38. Right Join:
--     - Retrieve all results and the corresponding drivers for each result, including results with no drivers.
SELECT r.Season, r.Round, r.CircuitID, d.GivenName, d.FamilyName
FROM results r
RIGHT JOIN drivers d ON r.DriverID = d.DriverID;


-- 39. Left Join:
--     - Retrieve a list of all drivers and their corresponding results, including drivers who have not participated in any races.
SELECT d.GivenName, d.FamilyName, r.Position, r.Points
FROM drivers d
LEFT JOIN results r ON d.DriverID = r.DriverID
ORDER BY d.GivenName, d.FamilyName;


-- 40. Join with Multiple Tables:
--     - Retrieve the GivenName, FamilyName, and ConstructorName for each driver, along with their total Points earned in the 2000 season.
SELECT d.GivenName, d.FamilyName, c.constructorId, SUM(r.Points) AS TotalPoints
FROM drivers d
JOIN results r ON d.DriverID = r.DriverID
JOIN constructors c ON r.ConstructorName = c.ConstructorID
WHERE r.Season = 2000
GROUP BY d.GivenName, d.FamilyName, c.constructorId;


-- 41. Simple Subquery:
--     - Retrieve drivers who have more points than the driver with the least points in the 2000 season.
SELECT d.GivenName, d.FamilyName, SUM(r.Points) AS TotalPoints
FROM drivers d
JOIN results r ON d.DriverID = r.DriverID
WHERE r.Season = 2000
GROUP BY d.DriverID, d.GivenName, d.FamilyName
HAVING SUM(r.Points) > (
  SELECT MIN(TotalPoints)
  FROM (
    SELECT SUM(r.Points) AS TotalPoints
    FROM results r
    WHERE r.Season = 2000
    GROUP BY r.DriverID
  ) AS DriverTotals
);


-- 42. Subquery in SELECT:
--     - Retrieve the `GivenName` and `FamilyName` of drivers along with their highest `Points` in any race.
SELECT d.GivenName, d.FamilyName,
       (SELECT MAX(r.Points)
        FROM results r
        WHERE r.DriverID = d.DriverID) AS HighestPoints
FROM drivers d;


-- 43. Correlated Subquery:
--     - Retrieve constructors and their drivers where the driver’s `Points` is greater than the average `Points` for that constructor.
SELECT 
    c.constructorId, 
    r.CircuitID,
    d.GivenName,          
    d.FamilyName,         
    r.Points,            
    r.Season            
FROM 
    constructors c
JOIN 
    results r ON c.constructorId = r.ConstructorName
JOIN 
    drivers d ON r.DriverID = d.DriverID
WHERE 
    r.Points > (
        SELECT AVG(r2.Points)
        FROM results r2
        WHERE r2.ConstructorName = c.constructorId
        GROUP BY r2.ConstructorName
    );


-- 44. Simple CTE 
--     - Retrieve the average points scored per driver in the 2000 season. Use a CTE to first calculate the total points scored by each driver, and then calculate the average from this aggregated data.
WITH DriverTotalPoints AS (
    SELECT 
        d.DriverID, 
        d.GivenName, 
        d.FamilyName, 
        SUM(r.Points) AS TotalPoints
    FROM 
        drivers d
    JOIN 
        results r ON d.DriverID = r.DriverID
    WHERE 
        r.Season = 2000
    GROUP BY 
        d.DriverID, d.GivenName, d.FamilyName
)
SELECT GivenName, 
    FamilyName, 
    TotalPoints,
    (SELECT AVG(TotalPoints) FROM DriverTotalPoints) AS AveragePoints
FROM 
    DriverTotalPoints;


-- 45. Complex CTE 
--     - Retrieve drivers who have finished in the top 3 positions in more than 5 races in the 2000 season, along with their average points per race.
WITH Top3Races AS (
    SELECT 
        r.DriverID, 
        COUNT(*) AS Top3Count
    FROM 
        results r
    WHERE 
        r.Season = 2000 AND r.Position <= 3
    GROUP BY 
        r.DriverID
    HAVING 
        COUNT(*) > 5
),
DriverPoints AS (
    SELECT 
        d.DriverID, 
        d.GivenName, 
        d.FamilyName, 
        AVG(r.Points) AS AvgPointsPerRace
    FROM 
        drivers d
    JOIN 
        results r ON d.DriverID = r.DriverID
    WHERE 
        r.Season = 2000
    GROUP BY 
        d.DriverID, d.GivenName, d.FamilyName
)
SELECT 
    t.GivenName, 
    t.FamilyName, 
    t.AvgPointsPerRace
FROM 
    Top3Races tr
JOIN 
    DriverPoints t ON tr.DriverID = t.DriverID;

