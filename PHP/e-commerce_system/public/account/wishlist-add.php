<?php

declare(strict_types=1);
// Starter note: This file handles nt  > wishlist add - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
	http_response_code(422);
	exit('Invalid request.');
}

$ok = $wishlistController->add((int) $_SESSION['user_id'], (int) ($_POST['product_id'] ?? 0));
flash($ok ? 'success' : 'error', $ok ? 'Added to wishlist.' : 'Unable to add to wishlist.');
redirect((string) ($_SERVER['HTTP_REFERER'] ?? base_url('account/wishlist.php')));
