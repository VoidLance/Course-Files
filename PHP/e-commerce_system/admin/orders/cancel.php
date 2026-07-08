<?php

declare(strict_types=1);
// Admin cancel page. Same app, more buttons, slightly more danger.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
	http_response_code(422);
	exit('Invalid request.');
}

$orderId = (int) ($_POST['order_id'] ?? 0);
$ok = $orderController->updateStatus($orderId, 'cancelled', 'Cancelled by admin');
flash($ok ? 'success' : 'error', $ok ? 'Order cancelled.' : 'Unable to cancel order.');
redirect('show.php?id=' . $orderId);
