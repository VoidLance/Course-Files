<?php

declare(strict_types=1);
// Shipping page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

if ($cartService->getDetailedCart()['items'] === []) {
	flash('error', 'Your cart is empty.');
	redirect(base_url('cart/index.php'));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$result = $checkoutController->saveShipping($_POST);
	if ($result['ok'] ?? false) {
		redirect(base_url('checkout/payment.php'));
	}

	flash('error', implode(' ', array_values($result['errors'] ?? ['Unable to save shipping information.'])));
}

$shippingMethods = $checkoutController->shippingMethods();
$shippingState = $checkoutService->shippingState();

$pageTitle = 'Checkout: Shipping';
require $rootPath . '/templates/checkout/shipping.php';
