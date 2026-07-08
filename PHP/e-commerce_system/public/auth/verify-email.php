<?php

declare(strict_types=1);
// Starter note: This file handles verify email - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$token = trim((string) ($_GET['token'] ?? ''));
if ($token === '') {
	flash('error', 'Verification token is missing.');
	redirect(base_url('auth/login.php'));
}

if ($authController->verifyEmail($token)) {
	flash('success', 'Email verified successfully. You can now log in.');
} else {
	flash('error', 'Verification link is invalid or expired.');
}

redirect(base_url('auth/login.php'));
