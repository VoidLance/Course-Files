<?php

declare(strict_types=1);
// Login page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

if (is_logged_in()) {
	redirect(base_url('products/catalog.php'));
}

$old = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$old = ['email' => trim((string) ($_POST['email'] ?? ''))];
	$result = $authController->login((string) ($_POST['email'] ?? ''), (string) ($_POST['password'] ?? ''));

	if ($result['ok'] ?? false) {
		if (($_SESSION['role'] ?? '') === 'admin') {
			redirect(base_url('../admin/dashboard.php'));
		}

		redirect(base_url('products/catalog.php'));
	}

	flash('error', (string) ($result['error'] ?? 'Login failed.'));
}

$pageTitle = 'Login';
require $rootPath . '/templates/auth/login.php';
