<?php

declare(strict_types=1);
// Starter note: This file handles   > update status - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
	http_response_code(422);
	exit('Invalid request.');
}

$orderId = (int) ($_POST['order_id'] ?? 0);
$status = trim((string) ($_POST['status'] ?? 'pending'));
$comment = trim((string) ($_POST['comment'] ?? 'Status updated by admin'));

$ok = $orderController->updateStatus($orderId, $status, $comment);
flash($ok ? 'success' : 'error', $ok ? 'Order status updated.' : 'Unable to update order status.');
redirect('show.php?id=' . $orderId);
