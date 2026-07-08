<?php

declare(strict_types=1);
// Starter note: This file handles out  > review - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

if ($checkoutService->shippingState() === [] || $checkoutService->paymentState() === []) {
	flash('error', 'Complete shipping and payment steps first.');
	redirect(base_url('checkout/shipping.php'));
}

$reviewData = $checkoutController->review();

$pageTitle = 'Checkout: Review';
require $rootPath . '/templates/checkout/review.php';
