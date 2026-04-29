<?php

#
# Array Utility Functions
# This file contains various utility functions for array manipulation
#

#
# Function 1: Find Common Elements
#
# Finds and returns all common elements between two input arrays.
# Uses array_intersect() to get the intersection of both arrays.
#
# @param array $array1 - First input array
# @param array $array2 - Second input array
# @return array - Array containing common elements
#
function findCommonElements($array1, $array2) {
    # array_intersect finds values both arrays agree on.
    return array_intersect($array1, $array2);
}

#
# Function 2: Remove Duplicates
#
# Removes duplicate values from an array while preserving keys.
# Uses array_unique() to eliminate duplicate values.
#
# @param array $array - Input array
# @return array - Array with duplicates removed
#
function removeDuplicates($array) {
    # array_unique removes duplicate values.
    # SORT_REGULAR keeps type differences meaningful.
    return array_unique($array, SORT_REGULAR);
}

#
# Function 3: Filter by Type
#
# Filters an array to return only elements of a specified type.
# Uses array_filter() with a callback function to check types using gettype().
#
# @param array $array - Input array
# @param string $type - Type to filter for ('string', 'integer', 'array', 'boolean', etc.)
# @return array - Filtered array containing only elements of specified type
#
function filterByType($array, $type) {
	# Filter with a callback and compare each element type.
    return array_filter($array, function($element) use ($type) {
        return gettype($element) === $type;
    });
}

#
# Function 4: Custom Sort
#
# Sorts an array in ascending or descending order based on the $order parameter.
# Uses usort() for custom sorting logic.
#
# @param array $array - Input array
# @param string $order - Sort order ('asc' for ascending, 'desc' for descending)
# @return array - Sorted array
#
function customSort($array, $order = 'asc') {
	# Work on a copy so callers keep their original data.
    $sortedArray = $array;
    
	# usort gives us custom ordering rules.
    usort($sortedArray, function($a, $b) use ($order) {
        if ($a == $b) {
            return 0;
        }
        
        if ($order === 'asc') {
			# Ascending: lower values come first.
            return ($a < $b) ? -1 : 1;
        } else {
			# Descending: higher values get the spotlight.
            return ($a > $b) ? -1 : 1;
        }
    });
    
    return $sortedArray;
}

#
# Function 5: Array to String
#
# Converts an array to a string with elements separated by a specified separator.
# Uses implode() to join array elements into a single string.
#
# @param array $array - Input array
# @param string $separator - Separator to use between elements
# @return string - String representation of the array
#
function arrayToString($array, $separator = ', ') {
    # implode joins everything into one neat string line.
    return implode($separator, array_map('strval', $array));
}

# ===== TEST CASES =====
echo "========================================\n";
echo "     ARRAY UTILITY FUNCTIONS TEST     \n";
echo "========================================\n\n";

# Test Arrays
$array1 = [1, 2, 3, 4, 5, 6];
$array2 = [4, 5, 6, 7, 8, 9];
$arrayWithDuplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
$mixedArray = [1, "hello", 2.5, true, [1, 2, 3], "world", 42, false, 3.14];
$numbersArray = [45, 12, 89, 23, 67, 34, 56];

# ===== TEST 1: Find Common Elements =====
echo "TEST 1: Find Common Elements\n";
echo "--------------------------------------\n";
echo "Array 1: ";
print_r($array1);
echo "Array 2: ";
print_r($array2);
echo "Common Elements: ";
$commonElements = findCommonElements($array1, $array2);
print_r($commonElements);
echo "\n";

# ===== TEST 2: Remove Duplicates =====
echo "TEST 2: Remove Duplicates\n";
echo "--------------------------------------\n";
echo "Original Array with Duplicates: ";
print_r($arrayWithDuplicates);
echo "After Removing Duplicates: ";
$noDuplicates = removeDuplicates($arrayWithDuplicates);
print_r($noDuplicates);
echo "\n";

# ===== TEST 3: Filter by Type =====
echo "TEST 3: Filter by Type\n";
echo "--------------------------------------\n";
echo "Mixed Array: ";
print_r($mixedArray);

echo "\nFiltered - Integers Only: ";
$integers = filterByType($mixedArray, 'integer');
print_r($integers);

echo "Filtered - Strings Only: ";
$strings = filterByType($mixedArray, 'string');
print_r($strings);

echo "Filtered - Arrays Only: ";
$arrays = filterByType($mixedArray, 'array');
print_r($arrays);

echo "Filtered - Booleans Only: ";
$booleans = filterByType($mixedArray, 'boolean');
print_r($booleans);
echo "\n";

# ===== TEST 4: Custom Sort =====
echo "TEST 4: Custom Sort\n";
echo "--------------------------------------\n";
echo "Original Numbers Array: ";
print_r($numbersArray);

echo "Sorted Ascending: ";
$ascendingSort = customSort($numbersArray, 'asc');
print_r($ascendingSort);

echo "Sorted Descending: ";
$descendingSort = customSort($numbersArray, 'desc');
print_r($descendingSort);
echo "\n";

# ===== TEST 5: Array to String =====
echo "TEST 5: Array to String\n";
echo "--------------------------------------\n";
$fruitArray = ["apple", "banana", "cherry", "date", "elderberry"];
echo "Fruit Array: ";
print_r($fruitArray);

echo "With comma separator: " . arrayToString($fruitArray, ", ") . "\n";
echo "With pipe separator: " . arrayToString($fruitArray, " | ") . "\n";
echo "With arrow separator: " . arrayToString($fruitArray, " -> ") . "\n";
echo "With space separator: " . arrayToString($fruitArray, " ") . "\n";
echo "\n";

# ===== ADVANCED TEST CASES =====
echo "========================================\n";
echo "      ADVANCED TEST CASES             \n";
echo "========================================\n\n";

# Advanced Test 1: Numbers with common elements
echo "Advanced Test 1: Common Elements with Different Arrays\n";
echo "--------------------------------------\n";
$fruits1 = ["apple", "banana", "cherry", "date"];
$fruits2 = ["banana", "date", "fig", "grape"];
echo "Fruits Array 1: ";
print_r($fruits1);
echo "Fruits Array 2: ";
print_r($fruits2);
echo "Common Fruits: ";
$commonFruits = findCommonElements($fruits1, $fruits2);
print_r($commonFruits);
echo "\n";

# Advanced Test 2: Complex duplicate removal
echo "Advanced Test 2: Remove Duplicates from Mixed Types\n";
echo "--------------------------------------\n";
$complexArray = ["apple", "apple", 1, 1, true, true, "banana", "apple"];
echo "Original: ";
print_r($complexArray);
echo "Deduplicated: ";
$dedup = removeDuplicates($complexArray);
print_r($dedup);
echo "\n";

# Advanced Test 3: Filter with calculation
echo "Advanced Test 3: Filter Only Numbers for Calculation\n";
echo "--------------------------------------\n";
$mixedNumbers = [10, "twenty", 30, "forty", 50, 60.5, true, 70];
echo "Original: ";
print_r($mixedNumbers);
$onlyIntegers = filterByType($mixedNumbers, 'integer');
echo "Only Integers: ";
print_r($onlyIntegers);
echo "Sum of Integers: " . array_sum($onlyIntegers) . "\n";
echo "\n";

# Advanced Test 4: Sorting strings
echo "Advanced Test 4: Sort Strings Alphabetically\n";
echo "--------------------------------------\n";
$cities = ["Zebra", "Apple", "Mango", "Banana", "Cherry"];
echo "Original: ";
print_r($cities);
echo "Sorted Ascending: ";
$sortedCities = customSort($cities, 'asc');
print_r($sortedCities);
echo "\n";

# Advanced Test 5: Array to CSV-like format
echo "Advanced Test 5: Convert Array to CSV Format\n";
echo "--------------------------------------\n";
$data = ["John", "Doe", 30, "Engineer"];
echo "Data Array: ";
print_r($data);
echo "CSV Format: " . arrayToString($data, ",") . "\n";
echo "Tab-separated: " . arrayToString($data, "\t") . "\n";
echo "\n";

?>
