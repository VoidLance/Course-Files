<?php

declare(strict_types=1);
// Starter note: This file handles ts  > index - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$products = $productModel->allForAdmin();

$pageTitle = 'Manage Products';
require $rootPath . '/templates/admin/products/index.php';
