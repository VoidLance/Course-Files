<?php

declare(strict_types=1);
// Process page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
	http_response_code(422);
	exit('Invalid request.');
}

$orderId = $checkoutService->placeOrder();
if ($orderId === null) {
	flash('error', 'Unable to place order. Please complete checkout details.');
	redirect(base_url('checkout/review.php'));
}

$order = $orderModel->findById($orderId);
if ($order !== null) {
	$emailBody = '<p>Thank you for your order.</p><p>Order Number: <strong>' . e($order['order_number']) . '</strong></p><p>Total: <strong>' . e(money((float) $order['total_amount'])) . '</strong></p>';
	$emailService->send((string) $order['customer_email'], 'Order Confirmation', $emailBody);
}

flash('success', 'Order placed successfully.');
redirect(base_url('checkout/confirmation.php'));
