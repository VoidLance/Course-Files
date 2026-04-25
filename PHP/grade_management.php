<?php

// Multidimensional array with student grades
$studentGrades = [
    "Alice" => [
        "Math" => 85,
        "English" => 90,
        "Science" => 88
    ],
    "Bob" => [
        "Math" => 78,
        "English" => 82,
        "Science" => 80
    ],
    "Charlie" => [
        "Math" => 92,
        "English" => 88,
        "Science" => 95
    ],
    "Diana" => [
        "Math" => 88,
        "English" => 91,
        "Science" => 89
    ],
    "Eve" => [
        "Math" => 81,
        "English" => 85,
        "Science" => 83
    ]
];

// Function 1: Calculate average grade for a specific student
function calculateAverage($studentGrades, $student) {
    if (!isset($studentGrades[$student])) {
        return "Student not found";
    }
    
    $grades = $studentGrades[$student];
    $sum = array_sum($grades);
    $count = count($grades);
    $average = $sum / $count;
    
    return $average;
}

// Function 2: Find top student in a specific subject
function findTopStudent($studentGrades, $subject) {
    $topStudent = null;
    $topGrade = -1;
    
    foreach ($studentGrades as $student => $grades) {
        if (isset($grades[$subject]) && $grades[$subject] > $topGrade) {
            $topGrade = $grades[$subject];
            $topStudent = $student;
        }
    }
    
    return $topStudent;
}

// Function 3: Calculate class average for a specific subject
function classAverage($studentGrades, $subject) {
    $total = 0;
    $count = 0;
    
    foreach ($studentGrades as $student => $grades) {
        if (isset($grades[$subject])) {
            $total += $grades[$subject];
            $count++;
        }
    }
    
    if ($count == 0) {
        return "No grades found for subject";
    }
    
    return $total / $count;
}

// Function 4: Sort students by overall average
function sortStudentsByOverallAverage($studentGrades) {
    $averages = [];
    
    foreach ($studentGrades as $student => $grades) {
        $sum = array_sum($grades);
        $count = count($grades);
        $averages[$student] = $sum / $count;
    }
    
    // Sort in descending order using arsort()
    arsort($averages);
    
    return $averages;
}

// Display results
echo "=== Grade Management System ===\n\n";

// Test Function 1: Calculate average for each student
echo "--- Individual Student Averages ---\n";
foreach ($studentGrades as $student => $grades) {
    $average = calculateAverage($studentGrades, $student);
    echo "$student's Average Grade: " . number_format($average, 2) . "\n";
}

echo "\n--- Top Students by Subject ---\n";
// Test Function 2: Find top student in each subject
$subjects = ["Math", "English", "Science"];
foreach ($subjects as $subject) {
    $topStudent = findTopStudent($studentGrades, $subject);
    $topGrade = $studentGrades[$topStudent][$subject];
    echo "Top student in $subject: $topStudent (Grade: $topGrade)\n";
}

echo "\n--- Class Averages by Subject ---\n";
// Test Function 3: Class average for each subject
foreach ($subjects as $subject) {
    $classAvg = classAverage($studentGrades, $subject);
    echo "Class Average for $subject: " . number_format($classAvg, 2) . "\n";
}

echo "\n--- Students Ranked by Overall Average ---\n";
// Test Function 4: Sort students by overall average
$sortedStudents = sortStudentsByOverallAverage($studentGrades);
$rank = 1;
foreach ($sortedStudents as $student => $average) {
    echo "$rank. $student: " . number_format($average, 2) . "\n";
    $rank++;
}

// Additional test cases
echo "\n--- Additional Tests ---\n";
echo "Testing specific student: Alice's average = " . number_format(calculateAverage($studentGrades, "Alice"), 2) . "\n";
echo "Testing specific student: Charlie's average = " . number_format(calculateAverage($studentGrades, "Charlie"), 2) . "\n";
echo "Top performer in Science: " . findTopStudent($studentGrades, "Science") . "\n";
echo "Top performer in Math: " . findTopStudent($studentGrades, "Math") . "\n";

?>
