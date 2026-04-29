<?php

declare(strict_types=1);

$GLOBALS['student_names'] = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown'
];

$GLOBALS['student_ages'] = [
    20,
    22,
    19,
    21
];

$GLOBALS['student_grades'] = [
    'A',
    'B',
    'A-',
    'B+'
];

// It's easier to do this using a simple count and sum, but loops are required for this assignment, so we'll use them to calculate the average age.
function calculate_Average_Age(array $student_ages): float {
    $total_age = 0;
    $number_of_students = count($student_ages);

    foreach ($student_ages as $age) {
        $total_age += $age;
    }

    if ($number_of_students === 0) {
        return 0.0;
    }

    $average_age = $total_age / $number_of_students;
    return $average_age;
}

function display_Student_Information(array $student_names, array $student_ages, array $student_grades): void {
    // This variable is only accessible within this function
    $localVariable = "This is a local variable inside the function.";

    // Display student information
    $number_of_students = count($student_names);

    for ($i = 0; $i < $number_of_students; $i++) {
        echo "Name: {$student_names[$i]}<br>";
        echo "Age: {$student_ages[$i]}<br>";
        echo "Grade: {$student_grades[$i]}<br><br>";
    }
}

// Display student information
display_Student_Information($GLOBALS['student_names'], $GLOBALS['student_ages'], $GLOBALS['student_grades']);

// Calculate and display average age
$average_age = calculate_Average_Age($GLOBALS['student_ages']);
echo "Average Age: {$average_age}<br><br><br>";

// Accessing the local variable outside the function will result in an error
// echo $localVariable; // This will cause an error because $localVariable is not defined outside the function

function increment_Counter(): void {
    // This variable is only accessible within this function
    static $counter = 0;

    // Increment the counter
    $counter++;

    echo "\n<br>Counter: {$counter}<br>";
}

// Increment the counter multiple times
increment_Counter(); // Counter: 1
increment_Counter(); // Counter: 2
increment_Counter(); // Counter: 3
increment_Counter(); // Counter: 4

// Accessing the static variable outside the function will result in an error
// echo "Final Counter Value: {$counter}"; // This will cause an error because $counter is not defined outside the function