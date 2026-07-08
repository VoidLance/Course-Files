<?php

declare(strict_types=1);
// Starter note: This file handles nt  > profile - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$userId = (int) $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	if ($accountController->updateProfile($userId, $_POST)) {
		flash('success', 'Profile updated.');
	} else {
		flash('error', 'Unable to update profile.');
	}

	redirect(base_url('account/profile.php'));
}

$user = $accountController->profile($userId);

$pageTitle = 'Profile';
require $rootPath . '/templates/account/profile.php';
