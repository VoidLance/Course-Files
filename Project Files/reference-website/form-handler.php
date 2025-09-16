<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Collect and sanitize input
        $name = htmlspecialchars(trim($_POST["name"] ?? ''));
        $email = htmlspecialchars(trim($_POST["email"] ?? ''));
        $message = htmlspecialchars(trim($_POST["message"] ?? ''));
        $check = htmlspecialchars(trim($_POST["check"] ?? 'No response'));

        // Basic validation
        $errors = [];
        if (empty($name)) $errors[] = "Name is required.";
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required.";
        if (empty($message)) $errors[] = "Message is required.";

        if (empty($errors)) {
                // Debug output for $check value
                echo "<p>Debug: Mailing list value is '$check'</p>";

                // Email settings
                $to = "alistair.m.sweeting@gmail.com"; // Change to your email
                $subject = "Contact Form Submission";
                $body = "Name: $name\nEmail: $email\nMessage:\n$message\nMailing list: $check";
                $headers = "From: $email\r\nReply-To: $email\r\n";

                // Send email
                if (mail($to, $subject, $body, $headers)) {
                        echo "Thank you for contacting us!";
                } else {
                        echo "Sorry, there was a problem sending your message.";
                }
        } else {
                // Display errors
                foreach ($errors as $error) {
                        echo "<p>$error</p>";
                }
        }
} else {
        echo "Invalid request.";
}
