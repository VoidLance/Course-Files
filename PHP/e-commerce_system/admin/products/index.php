<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$pageTitle = 'Manage Products';
require $rootPath . '/templates/admin/products/index.php';
