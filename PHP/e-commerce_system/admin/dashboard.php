<?php

declare(strict_types=1);
// Starter note: This file handles ard - straightforward on purpose.

require dirname(__DIR__) . '/includes/bootstrap.php';
require_admin();

$dashboard = $adminController->dashboard();

$pageTitle = 'Admin Dashboard';
require $rootPath . '/templates/admin/dashboard.php';
