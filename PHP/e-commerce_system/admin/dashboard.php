<?php

declare(strict_types=1);
// Admin dashboard page. Same app, more buttons, slightly more danger.

require dirname(__DIR__) . '/includes/bootstrap.php';
require_admin();

$dashboard = $adminController->dashboard();

$pageTitle = 'Admin Dashboard';
require $rootPath . '/templates/admin/dashboard.php';
