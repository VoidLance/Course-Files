<?php

declare(strict_types=1);
// Address create page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$address = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$ok = $accountController->saveAddress(null, (int) $_SESSION['user_id'], $_POST);
	if ($ok) {
		flash('success', 'Address added.');
		redirect(base_url('account/addresses.php'));
	}

	flash('error', 'Unable to add address.');
	$address = $_POST;
}

$pageTitle = 'Add Address';
require $rootPath . '/templates/account/address-form.php';
