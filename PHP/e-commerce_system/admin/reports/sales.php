<?php

declare(strict_types=1);

require dirname(__DIR__, 3) . '/includes/bootstrap.php';
require_admin();

$pageTitle = 'Sales Report';
require $rootPath . '/templates/admin/reports/sales.php';
