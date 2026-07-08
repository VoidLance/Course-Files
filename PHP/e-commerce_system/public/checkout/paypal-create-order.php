<?php

declare(strict_types=1);
// Starter note: This file handles out  > paypal create order - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

header('Content-Type: application/json');

try {
	$review = $checkoutService->review();
	$response = $paypalService->createOrder((float) $review['total_amount']);
	echo json_encode(['ok' => true, 'order' => $response], JSON_THROW_ON_ERROR);
} catch (Throwable $exception) {
	http_response_code(400);
	echo json_encode(['ok' => false, 'error' => $exception->getMessage()], JSON_THROW_ON_ERROR);
}
