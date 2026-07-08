<?php

declare(strict_types=1);
// Admin index page. Same app, more buttons, slightly more danger.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$orders = $orderController->adminOrders();

$pageTitle = 'Manage Orders';
require $rootPath . '/templates/admin/orders/index.php';
