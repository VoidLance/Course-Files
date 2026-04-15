<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Calculator</title>
</head>
<body>
    <?php
    /*
     * This script demonstrates a very basic PHP calculator flow:
     * 1. Define a function that contains two numbers.
     * 2. Add those numbers to compute a total.
     * 3. Print the result into the HTML page.
     *
     * The comments below explain each section so the script is easier to follow.
     */

    // Define a reusable function for adding two hard-coded numbers.
    function addNumbers() {
        // Store the first number used in the calculation.
        $num1 = 10;

        // Store the second number used in the calculation.
        $num2 = 25;

        // Perform the addition and save the result.
        $sum = $num1 + $num2;

        // Output the formatted result message into the browser.
        echo "<H2>The sum of ".$num1." and ".$num2." is ".$sum.".</H2>";
    }

    // This commented-out call would run the function an extra time:
    // addNumbers();

    /*
    When the line above stays commented, no duplicate result is printed.
    Only the single active call below runs, so the sum appears once.

    Execute the function once so the result is displayed on the page. */
    addNumbers();
    ?>
</body>
</html>