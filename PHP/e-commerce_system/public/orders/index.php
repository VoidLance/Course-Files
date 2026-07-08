<?php

declare(strict_types=1);
// Index page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$orders = $orderController->userOrders();

$pageTitle = 'Order History';
require $rootPath . '/templates/orders/index.php';
