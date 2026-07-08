<?php

declare(strict_types=1);
// Starter note: This file handles register - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$old = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$old = $_POST;
	$result = $authController->register($_POST);
	if ($result['ok'] ?? false) {
		flash('success', 'Registration successful. Check your email to verify your account.');
		redirect(base_url('auth/login.php'));
	}

	flash('error', implode(' ', array_values($result['errors'] ?? ['Unable to register.'])));
}

$pageTitle = 'Register';
require $rootPath . '/templates/auth/register.php';
