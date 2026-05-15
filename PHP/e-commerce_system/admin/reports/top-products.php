<?php

declare(strict_types=1);

require dirname(__DIR__, 3) . '/includes/bootstrap.php';
require_admin();

$pageTitle = 'Top Products';
require $rootPath . '/templates/admin/reports/top-products.php';
