<?php

declare(strict_types=1);
// Admin show page. Same app, more buttons, slightly more danger.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$orderId = (int) ($_GET['id'] ?? 0);
$detail = $orderController->adminOrderDetail($orderId);
if ($detail === null) {
	flash('error', 'Order not found.');
	redirect('index.php');
}

$order = $detail['order'];
$items = $detail['items'];
$history = $detail['history'];

$pageTitle = 'Order Details';
require $rootPath . '/templates/admin/orders/show.php';
