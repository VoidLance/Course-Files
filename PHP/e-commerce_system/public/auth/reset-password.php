<?php

declare(strict_types=1);
// Starter note: This file handles reset password - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$token = trim((string) ($_GET['token'] ?? $_POST['token'] ?? ''));

if ($token === '') {
	flash('error', 'Reset token is missing.');
	redirect(base_url('auth/forgot-password.php'));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$ok = $authController->resetPassword($token, (string) ($_POST['password'] ?? ''));
	if ($ok) {
		flash('success', 'Password updated successfully.');
		redirect(base_url('auth/login.php'));
	}

	flash('error', 'Unable to reset password. The link may be invalid or expired.');
}

$pageTitle = 'Reset Password';
require $rootPath . '/templates/auth/reset-password.php';
