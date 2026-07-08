<?php

declare(strict_types=1);
// Admin edit page. Same app, more buttons, slightly more danger.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$userId = (int) ($_GET['id'] ?? 0);

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
	http_response_code(422);
	exit('Invalid request.');
}

$role = trim((string) ($_POST['role'] ?? 'customer'));
$status = trim((string) ($_POST['status'] ?? 'active'));

$ok = $userModel->updateAdminFields($userId, $role, $status);
flash($ok ? 'success' : 'error', $ok ? 'User updated.' : 'Unable to update user.');
redirect('show.php?id=' . $userId);

