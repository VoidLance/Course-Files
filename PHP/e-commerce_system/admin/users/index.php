<?php

declare(strict_types=1);
// Starter note: This file handles index - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$users = $userModel->listAll();

$pageTitle = 'Manage Users';
require $rootPath . '/templates/admin/users/index.php';
