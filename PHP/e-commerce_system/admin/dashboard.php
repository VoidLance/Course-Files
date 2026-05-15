<?php

declare(strict_types=1);

require dirname(__DIR__) . '/includes/bootstrap.php';
require_admin();

$pageTitle = 'Admin Dashboard';
require $rootPath . '/templates/admin/dashboard.php';
