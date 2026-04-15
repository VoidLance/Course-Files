<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Calculator</title>
</head>
<body>
    <?php
    // A simple PHP calculator that uses a function to add two variables with numerical values, and then output the sum of these two variables in an HTML format
    function addNumbers() {
        $num1 = 10;
        $num2 = 25;
        $sum = $num1 + $num2;
        echo "<H2>The sum of ".$num1." and ".$num2." is ".$sum.".</H2>";
    }
    addNumbers();
    ?>
</body>
</html>