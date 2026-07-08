<?php

declare(strict_types=1);
// Profile page entry. Small file, clear job, no need for more comments.

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
