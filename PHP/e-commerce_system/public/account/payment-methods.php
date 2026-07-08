<?php

declare(strict_types=1);
// Payment methods page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$userId = (int) $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	if (($_POST['action'] ?? '') === 'add') {
		$ok = $accountController->addPaymentMethod($userId, [
			'provider' => trim((string) ($_POST['provider'] ?? 'paypal')),
			'provider_reference' => trim((string) ($_POST['provider_reference'] ?? '')),
			'brand' => trim((string) ($_POST['brand'] ?? '')),
			'last_four' => trim((string) ($_POST['last_four'] ?? '')),
			'expires_month' => (int) ($_POST['expires_month'] ?? 0),
			'expires_year' => (int) ($_POST['expires_year'] ?? 0),
			'is_default' => 0,
		]);
		flash($ok ? 'success' : 'error', $ok ? 'Payment method added.' : 'Unable to add payment method.');
	} elseif (($_POST['action'] ?? '') === 'delete') {
		$ok = $accountController->deletePaymentMethod((int) ($_POST['payment_method_id'] ?? 0), $userId);
		flash($ok ? 'success' : 'error', $ok ? 'Payment method removed.' : 'Unable to remove payment method.');
	}

	redirect(base_url('account/payment-methods.php'));
}

$paymentMethods = $accountController->paymentMethods($userId);

$pageTitle = 'Payment Methods';
require $rootPath . '/templates/account/payment-methods.php';
