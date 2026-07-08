<?php

declare(strict_types=1);
// Address delete page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
	http_response_code(422);
	exit('Invalid request.');
}

$addressId = (int) ($_POST['address_id'] ?? 0);
$ok = $accountController->deleteAddress($addressId, (int) $_SESSION['user_id']);

flash($ok ? 'success' : 'error', $ok ? 'Address deleted.' : 'Unable to delete address.');
redirect(base_url('account/addresses.php'));
