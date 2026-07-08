<?php

declare(strict_types=1);
// Starter note: This file handles ries  > delete - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
	http_response_code(422);
	exit('Invalid request.');
}

$ok = $categoryModel->delete((int) ($_POST['category_id'] ?? 0));
flash($ok ? 'success' : 'error', $ok ? 'Category deleted.' : 'Unable to delete category.');
redirect('index.php');
