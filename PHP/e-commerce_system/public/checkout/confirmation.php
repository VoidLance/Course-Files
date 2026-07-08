<?php

declare(strict_types=1);
// Confirmation page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$order = null;
$lastOrderId = (int) ($_SESSION['last_order_id'] ?? 0);
if ($lastOrderId > 0) {
	$order = $orderModel->findById($lastOrderId);
}

$pageTitle = 'Order Confirmation';
require $rootPath . '/templates/checkout/confirmation.php';
