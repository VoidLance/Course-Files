<?php

declare(strict_types=1);
// Address edit page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$addressId = (int) ($_GET['id'] ?? 0);
if ($addressId <= 0) {
	flash('error', 'Invalid address selected.');
	redirect(base_url('account/addresses.php'));
}

$address = $addressModel->findByIdForUser($addressId, (int) $_SESSION['user_id']);
if ($address === null) {
	flash('error', 'Address not found.');
	redirect(base_url('account/addresses.php'));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$ok = $accountController->saveAddress($addressId, (int) $_SESSION['user_id'], $_POST);
	if ($ok) {
		flash('success', 'Address updated.');
		redirect(base_url('account/addresses.php'));
	}

	flash('error', 'Unable to update address.');
	$address = array_merge($address, $_POST);
}

$pageTitle = 'Edit Address';
require $rootPath . '/templates/account/address-form.php';
