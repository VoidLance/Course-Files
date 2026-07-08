<?php

declare(strict_types=1);
// Forgot password page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$old = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$old['email'] = trim((string) ($_POST['email'] ?? ''));
	$authController->forgotPassword($old['email']);
	flash('success', 'If that email is registered, a reset link has been sent.');
	redirect(base_url('auth/login.php'));
}

$pageTitle = 'Forgot Password';
require $rootPath . '/templates/auth/forgot-password.php';
