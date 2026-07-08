<?php

declare(strict_types=1);
// Starter note: This file handles s  > show - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$orderId = (int) ($_GET['id'] ?? 0);
$detail = $orderController->userOrderDetail($orderId);

if ($detail === null) {
	http_response_code(404);
	exit('Order not found.');
}

$order = $detail['order'];
$items = $detail['items'];
$history = $detail['history'];

$pageTitle = 'Order Details';
require $rootPath . '/templates/orders/show.php';
