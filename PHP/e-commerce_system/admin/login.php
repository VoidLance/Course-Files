<?php

declare(strict_types=1);
// Starter note: This file handles php - straightforward on purpose.

require dirname(__DIR__) . '/includes/bootstrap.php';

if (is_logged_in() && ($_SESSION['role'] ?? '') === 'admin') {
	redirect('dashboard.php');
}

$old = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$old['email'] = trim((string) ($_POST['email'] ?? ''));
	$result = $authController->login($old['email'], (string) ($_POST['password'] ?? ''));

	if (($result['ok'] ?? false) && (($_SESSION['role'] ?? '') === 'admin')) {
		redirect('dashboard.php');
	}

	$authController->logout();
	flash('error', 'Admin access required.');
}

$pageTitle = 'Admin Login';
require $rootPath . '/templates/auth/login.php';
