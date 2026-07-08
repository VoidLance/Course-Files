<?php

declare(strict_types=1);
// Review update page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
	http_response_code(422);
	exit('Invalid request.');
}

$productId = (int) ($_POST['product_id'] ?? 0);
$ok = $reviewController->save($productId, (int) $_SESSION['user_id'], $_POST);
flash($ok ? 'success' : 'error', $ok ? 'Review updated.' : 'Unable to update review.');
redirect(base_url('products/show.php?id=' . $productId));
