<?php

declare(strict_types=1);
// Invoice page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$orderId = (int) ($_GET['id'] ?? 0);
$detail = $orderController->userOrderDetail($orderId);

if ($detail === null) {
	http_response_code(404);
	exit('Order not found.');
}

$pdf = $orderController->invoicePdf($detail['order'], $detail['items']);

header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="invoice-' . rawurlencode((string) $detail['order']['order_number']) . '.pdf"');
echo $pdf;
