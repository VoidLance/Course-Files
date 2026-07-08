<?php

declare(strict_types=1);
// Starter note: This file handles s  > top products - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$topProducts = $orderService->topProducts();

$pageTitle = 'Top Products';
require $rootPath . '/templates/admin/reports/top-products.php';
