<?php

declare(strict_types=1);
// Admin show page. Same app, more buttons, slightly more danger.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$userId = (int) ($_GET['id'] ?? 0);
$user = $userModel->findById($userId);
if ($user === null) {
	flash('error', 'User not found.');
	redirect('index.php');
}

$pageTitle = 'User Details';
require $rootPath . '/templates/admin/users/show.php';
