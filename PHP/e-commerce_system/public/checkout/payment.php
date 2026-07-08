<?php

declare(strict_types=1);
// Starter note: This file handles out  > payment - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

if ($checkoutService->shippingState() === []) {
	flash('error', 'Complete the shipping step first.');
	redirect(base_url('checkout/shipping.php'));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$result = $checkoutController->savePayment($_POST);
	if ($result['ok'] ?? false) {
		redirect(base_url('checkout/review.php'));
	}

	flash('error', implode(' ', array_values($result['errors'] ?? ['Unable to save payment method.'])));
}

$paymentState = $checkoutService->paymentState();

$pageTitle = 'Checkout: Payment';
require $rootPath . '/templates/checkout/payment.php';
