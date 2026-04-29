<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Numeric Operations Calculator</title>
</head>
<body>
    <form method="post" action="">
        <label for="num1">Number 1:</label>
        <input type="text" id="num1" name="num1" required><br><br>
        <label for="num2">Number 2:</label>
        <input type="text" id="num2" name="num2" required><br><br>
        <input type="submit" value="Calculate">
    </form>
    <?php
    # Demo: arithmetic operations, type conversions, and infinite/large number checks.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $num1 = $_POST["num1"];
        $num2 = $_POST["num2"];

                    # Validate input.
        if (!is_numeric($num1) && !is_numeric($num2)) {
            echo "<p>Please enter valid numbers for both inputs.</p>";
        } elseif (!is_numeric($num1)) {
            echo "<p>Please enter a valid number for Number 1.</p>";
        } elseif (!is_numeric($num2)) {
            echo "<p>Please enter a valid number for Number 2.</p>";
        } else {
            # Perform arithmetic operations.
            $addition = $num1 + $num2;
            $subtraction = $num1 - $num2;
            $multiplication = $num1 * $num2;
            $division = $num1 / $num2;
            $modulus = $num1 % $num2;

            # Output results.
            echo "<h2>Results:</h2>";
            echo "<p>Sum: $num1 + $num2 = $addition</p>";
            echo "<p>Difference: $num1 - $num2 = $subtraction</p>";
            echo "<p>Product: $num1 * $num2 = $multiplication</p>";
            echo "<p>Quotient: $num1 / $num2 = $division</p>";
            echo "<p>Modulus: $num1 % $num2 = $modulus</p>";

            # Handle large numbers and infinity.
            if (is_infinite($addition)) {
                echo "<p>The sum is infinite.</p>";
            }
            if (is_infinite($subtraction)) {
                echo "<p>The difference is infinite.</p>";
            }
            if (is_infinite($multiplication)) {
                echo "<p>The product is infinite.</p>";
            }
            if (is_infinite($division)) {
                echo "<p>The quotient is infinite.</p>";
            }
            if (is_infinite($modulus)) {
                echo "<p>The modulus is infinite.</p>";
            }

            # Data type conversions.
        $intNum1 = (int)$num1;
        $intNum2 = (int)$num2;
        $floatNum1 = (float)$num1;
        $floatNum2 = (float)$num2;

                        # Check data types.
        $isInt1 = is_int($intNum1);
        $isInt2 = is_int($intNum2);
        $isFloat1 = is_float($floatNum1);
        $isFloat2 = is_float($floatNum2);

                        # Display data type conversions and checks.
        echo "Integer conversion of num1: $intNum1, is integer: " . ($isInt1 ? 'true' : 'false') . "<br>";
        echo "Integer conversion of num2: $intNum2, is integer: " . ($isInt2 ? 'true' : 'false') . "<br>";
        echo "Float conversion of num1: $floatNum1, is float: " . ($isFloat1 ? 'true' : 'false') . "<br>";
        echo "Float conversion of num2: $floatNum2, is float: " . ($isFloat2 ? 'true' : 'false') . "<br>";

                        # Handling large and infinite numbers.
        $large_number = 1e+300;
        $infinite_number = 1e+309;

        $isLargeFinite = is_finite($large_number);
        $isInfinite = is_infinite($infinite_number);

                    # Display large and infinite number check results.
        echo "Large number: $large_number, is finite: " . ($isLargeFinite ? 'true' : 'false') . "<br>";
        echo "Infinite number: $infinite_number, is infinite: " . ($isInfinite ? 'true' : 'false') . "<br>";
        }
    }
    ?>
</body>
</html>