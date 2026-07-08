<?php

declare(strict_types=1);
// Starter note: This file handles ts  > delete - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
	http_response_code(422);
	exit('Invalid request.');
}

$ok = $productModel->delete((int) ($_POST['product_id'] ?? 0));
flash($ok ? 'success' : 'error', $ok ? 'Product deleted.' : 'Unable to delete product.');
redirect('index.php');
