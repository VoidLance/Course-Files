<?php

declare(strict_types=1);
// Admin sales page. Same app, more buttons, slightly more danger.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$sales = $orderService->salesSummary();

$pageTitle = 'Sales Report';
require $rootPath . '/templates/admin/reports/sales.php';
