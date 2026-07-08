<?php

declare(strict_types=1);
// Admin index page. Same app, more buttons, slightly more danger.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$products = $productModel->allForAdmin();

$pageTitle = 'Manage Products';
require $rootPath . '/templates/admin/products/index.php';
