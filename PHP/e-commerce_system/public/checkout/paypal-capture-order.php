<?php

declare(strict_types=1);
// Starter note: This file handles out  > paypal capture order - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

header('Content-Type: application/json');

$paypalOrderId = trim((string) ($_POST['paypal_order_id'] ?? $_GET['paypal_order_id'] ?? ''));
if ($paypalOrderId === '') {
	http_response_code(422);
	echo json_encode(['ok' => false, 'error' => 'Missing PayPal order id.'], JSON_THROW_ON_ERROR);
	exit;
}

try {
	$capture = $paypalService->captureOrder($paypalOrderId);
	$captureId = (string) ($capture['purchase_units'][0]['payments']['captures'][0]['id'] ?? '');
	$orderId = $checkoutService->placeOrder($paypalOrderId, $captureId !== '' ? $captureId : null);

	if ($orderId === null) {
		throw new RuntimeException('Could not finalize order after payment capture.');
	}

	echo json_encode(['ok' => true, 'order_id' => $orderId, 'capture' => $capture], JSON_THROW_ON_ERROR);
} catch (Throwable $exception) {
	http_response_code(400);
	echo json_encode(['ok' => false, 'error' => $exception->getMessage()], JSON_THROW_ON_ERROR);
}
