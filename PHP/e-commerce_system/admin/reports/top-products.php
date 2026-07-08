<?php

declare(strict_types=1);
// Admin top products page. Same app, more buttons, slightly more danger.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$topProducts = $orderService->topProducts();

$pageTitle = 'Top Products';
require $rootPath . '/templates/admin/reports/top-products.php';
