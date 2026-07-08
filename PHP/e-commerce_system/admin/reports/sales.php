<?php

declare(strict_types=1);
// Starter note: This file handles s  > sales - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$sales = $orderService->salesSummary();

$pageTitle = 'Sales Report';
require $rootPath . '/templates/admin/reports/sales.php';
