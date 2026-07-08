<?php

declare(strict_types=1);
// Starter note: This file handles   > index - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$orders = $orderController->adminOrders();

$pageTitle = 'Manage Orders';
require $rootPath . '/templates/admin/orders/index.php';
